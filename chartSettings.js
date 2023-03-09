function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
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

  function onItemClicked(item) {
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

let chart = LightweightCharts.createChart(chartElement, {
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

let areaSeries = chart.addAreaSeries({
  topColor: "rgba(33, 150, 243, 0.56)",
  bottomColor: "rgba(33, 150, 243, 0.04)",
  lineColor: "rgba(33, 150, 243, 1)",
  lineWidth: 2,
});

let candlestickSeries = chart.addCandlestickSeries({
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderVisible: false,
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350",
});

// create a line series
const lineSeries = chart.addLineSeries();

// apply some styling to the series
lineSeries.applyOptions({
  lineWidth: 2,
  color: 'yellow',
});

// create a parabolic scatter series
const parabolicScatterSeries = chart.addLineSeries({
  seriesType: "ParabolicScatter",
});

// apply some styling to the series
parabolicScatterSeries.applyOptions({
  lineWidth: 2,
  color: 'blue',
  baseLineVisible: false,
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
      mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
      borderColor: "rgba(197, 203, 206, 0.8)",
    },
    timeScale: {
      borderColor: "rgba(197, 203, 206, 0.8)",
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
