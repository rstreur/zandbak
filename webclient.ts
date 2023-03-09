import { createChart, CrosshairMode, IChartApi, ISeriesApi, UTCTimestamp } from 'lightweight-charts';

function createSimpleSwitcher(
    items: string[],
    activeItem: string,
    activeItemChangedCallback: (item: string) => void
) {
    let switcherElement = document.createElement("div");
    switcherElement.classList.add("switcher");

    let intervalElements = items.map(function (item) {
        let itemEl = document.createElement("button");
        itemEl.innerText = item;
        itemEl.classList.add("switcher-item");
        itemEl.classList.toggle("switcher-active-item", item === activeItem);
        itemEl.addEventListener("click", function () {
            onItemClicked(item);
        });
        switcherElement.appendChild(itemEl);
        return itemEl;
    });

    function onItemClicked(item: string) {
        if (item === activeItem) {
            return;
        }

        intervalElements.forEach(function (element, index) {
            element.classList.toggle("switcher-active-item", items[index] === item);
        });

        activeItem = item;

        activeItemChangedCallback(item);
    }

    return switcherElement;
}

let switcherElement = createSimpleSwitcher(
    ["Dark", "Light"],
    "Dark",
    syncToTheme
);

let chartElement = document.createElement("div");

let chart: IChartApi = createChart(chartElement, {
    width: 800,
    height: 600,
    rightPriceScale: {
        borderVisible: false,
    },
    timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: true,
        // ticksVisible: true,
    },
});

document.body.appendChild(chartElement);
document.body.appendChild(switcherElement);

let areaSeries: ISeriesApi<'Area'> = chart.addAreaSeries({
    topColor: "rgba(33, 150, 243, 0.56)",
    bottomColor: "rgba(33, 150, 243, 0.04)",
    lineColor: "rgba(33, 150, 243, 1)",
    lineWidth: 2,
});

let candlestickSeries: ISeriesApi<'Candlestick'> = chart.addCandlestickSeries({
    upColor: "#26a69a",
    downColor: "#ef5350",
    borderVisible: false,
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350",
});

// create a line series
const lineSeries: ISeriesApi<'Line'> = chart.addLineSeries();

// apply some styling to the series
lineSeries.applyOptions({
    lineWidth: 2,
    color: 'yellow',
});

let darkTheme = {
    chart: {
        layout: {
            background: {
                color: "#000000",
            },
            textColor: "#ffffff",
        },
        grid: {
            vertLines: {
                color: "rgba(197, 203, 206, 0.5)",
            },
            horzLines: {
                color: "rgba(197, 203, 206, 0.5)",
            },
        },
        crosshair: {
            mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
            borderColor: "rgba(197, 203, 206, 0.8)",
            borderVisible: false,
        },
        timeScale: {
            borderColor: "rgba(197, 203, 206, 0.8)",
            borderVisible: false,
        },
    },
};

let lightTheme = {
    chart: {
        layout: {
            background: {
                color: "#FFFFFF",
            },
            textColor: "#191919",
            lineColor: "#2B2B43",
        },
        watermark: {
            color: "rgba(0, 0, 0, 0)",
        },
        grid: {
            vertLines: {
                visible: false,
            },
            horzLines: {
                color: "#f0f3fa",
            },
        },
    },
};

let themesData = {
    Dark: darkTheme,
    Light: lightTheme,
};

function syncToTheme(theme) {
    console.log(themesData[theme].chart);
    chart.applyOptions(themesData[theme].chart);
    // candlestickSeries.applyOptions(themesData[theme].series);
}

// window.addEventListener("resize", () => {
//   chart.resize(window.innerWidth, window.innerHeight);
// });
syncToTheme("Dark");


const websocket = new WebSocket("ws://localhost:8765");

websocket.onopen = () => {
    console.log("Connected to server");
};

websocket.onmessage = (event) => {
    let init = true;
    let klines: number[][][] = [];
    let candlestickData: any[] = [];
    let ticks: [] = [];
    const message = JSON.parse(event.data);

    ticks = message.ticks.map((value, index, d) => {
        return {
            time: Number(value.timestamp / 1000000000),
            value: Number(value.last * 0.0001),
        };
    });

    klines = message.klines[0];
    for (const time in klines) {
        const candlestickDataByTime = klines[time].reduce((acc, cur) => {
            // let time = cur[0];
            const candlestick = {
                time: cur[0] as UTCTimestamp,
                open: Math.round(cur[2] * 0.0001),
                high: Math.round(cur[3] * 0.0001),
                low: Math.round(cur[4] * 0.0001),
                close: Math.round(cur[5] * 0.0001),
            };

            if (!acc[time]) {
                acc[time] = [candlestick];
            } else {
                acc[time].push(candlestick);
            }

            return acc;
        }, {});

        const sortedKeys = Object.keys(candlestickDataByTime).sort((a, b) => parseInt(a) - parseInt(b));

        candlestickData = sortedKeys.reduce((acc, cur) => {
            return acc.concat(candlestickDataByTime[cur]);
        }, []);
    }

    if (init) {
        console.log(`Init -- Add all ohlcv data: ${JSON.stringify(candlestickData)}`);
        candlestickSeries.setData(candlestickData);
        init = false;
    } else {
        if (candlestickData.length > 0) {
            let lastKline = candlestickData[candlestickData.length - 1];
            candlestickSeries.update(lastKline);
        }

        if (ticks.length > 0) {
            lineSeries.setData(ticks);
        }
    }
};

