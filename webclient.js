var lightweight_charts_1 = LightweightCharts;
function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
  var switcherElement = document.createElement("div");
  switcherElement.classList.add("switcher");
  var intervalElements = items.map(function (item) {
    var itemEl = document.createElement("button");
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
var switcherElement = createSimpleSwitcher(
  ["Dark", "Light"],
  "Dark",
  syncToTheme
);
var chartElement = document.createElement("div");
var chart = (0, lightweight_charts_1.createChart)(chartElement, {
  width: 800,
  height: 600,
  rightPriceScale: {
    borderVisible: false,
  },
  timeScale: {
    borderVisible: false,
    timeVisible: true,
    secondsVisible: true,
  },
});
document.body.appendChild(chartElement);
document.body.appendChild(switcherElement);
var areaSeries = chart.addAreaSeries({
  topColor: "rgba(33, 150, 243, 0.56)",
  bottomColor: "rgba(33, 150, 243, 0.04)",
  lineColor: "rgba(33, 150, 243, 1)",
  lineWidth: 2,
});
var candlestickSeries = chart.addCandlestickSeries({
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderVisible: false,
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350",
});
// create a line series
var lineSeries = chart.addLineSeries();
// apply some styling to the series
lineSeries.applyOptions({
  lineWidth: 2,
  color: "yellow",
});
var darkTheme = {
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
      mode: lightweight_charts_1.CrosshairMode.Normal,
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
var lightTheme = {
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
var themesData = {
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

var websocket = new WebSocket("ws://localhost:8765");
websocket.onopen = function () {
  console.log("Connected to server");
};
websocket.onmessage = function (event) {
  var init = true;
  var klines = [];
  var candlestickData = [];
  var ticks = [];
  var message = JSON.parse(event.data);
  ticks = message.ticks.map(function (value, index, d) {
    return {
      time: Number(value.timestamp / 1000000000),
      value: Number(value.last * 0.0001),
    };
  });
  klines = message.klines[0];
  var _loop_1 = function (time) {
    var candlestickDataByTime = klines[time].reduce(function (acc, cur) {
      // let time = cur[0];
      var candlestick = {
        time: cur[0],
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
    var sortedKeys = Object.keys(candlestickDataByTime).sort(function (a, b) {
      return parseInt(a) - parseInt(b);
    });
    candlestickData = sortedKeys.reduce(function (acc, cur) {
      return acc.concat(candlestickDataByTime[cur]);
    }, []);
  };
  for (var time in klines) {
    _loop_1(time);
  }
  if (init) {
    console.log(
      "Init -- Add all ohlcv data: ".concat(JSON.stringify(candlestickData))
    );
    candlestickSeries.setData(candlestickData);
    init = false;
  } else {
    if (candlestickData.length > 0) {
      var lastKline = candlestickData[candlestickData.length - 1];
      candlestickSeries.update(lastKline);
    }
    if (ticks.length > 0) {
      lineSeries.setData(ticks);
    }
  }
};
