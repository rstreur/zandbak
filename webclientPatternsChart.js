const exampleData = [
  {
    time: "2022-03-25T05:00:00.000Z",
    open: 60000,
    high: 61000,
    low: 58000,
    close: 59000,
  },
  {
    time: "2022-03-25T06:00:00.000Z",
    open: 59000,
    high: 61000,
    low: 58500,
    close: 60500,
  },
  {
    time: "2022-03-25T07:00:00.000Z",
    open: 60500,
    high: 63000,
    low: 59500,
    close: 62000,
  },
  {
    time: "2022-03-25T08:00:00.000Z",
    open: 62000,
    high: 62500,
    low: 61000,
    close: 61500,
  },
  {
    time: "2022-03-25T09:00:00.000Z",
    open: 61500,
    high: 62500,
    low: 60500,
    close: 62000,
  },
  {
    time: "2022-03-25T10:00:00.000Z",
    open: 62000,
    high: 64000,
    low: 61000,
    close: 63000,
  },
  {
    time: "2022-03-25T11:00:00.000Z",
    open: 63000,
    high: 64500,
    low: 62500,
    close: 64000,
  },
  {
    time: "2022-03-25T12:00:00.000Z",
    open: 64000,
    high: 65000,
    low: 63500,
    close: 64500,
  },
  {
    time: "2022-03-25T13:00:00.000Z",
    open: 64500,
    high: 65500,
    low: 64000,
    close: 65000,
  },
  {
    time: "2022-03-25T14:00:00.000Z",
    open: 65000,
    high: 65500,
    low: 64500,
    close: 65000,
  },
];

const patternsWithTrends = [
  {
    type: "Double Bottom",
    condition: (data) => {
      const trough1 = data[data.length - 6];
      const trough2 = data[data.length - 3];
      if (trough1 && trough2 && trough1.low === trough2.low) {
        const high = data[data.length - 4];
        if (high && high.high > trough1.low) {
          const resistance = (trough1.low + trough2.low) / 2;
          const breakout = data[data.length - 1];
          if (breakout && breakout.close > resistance) {
            return true;
          }
        }
      }
      return false;
    },
    trend: "Bullish",
  },
  {
    type: "Inverted Head and Shoulders",
    condition: (data) => {
      const trough1 = data[data.length - 9];
      const trough2 = data[data.length - 6];
      const trough3 = data[data.length - 3];
      if (
        trough1 &&
        trough2 &&
        trough3 &&
        trough1.low === trough2.low &&
        trough1.low === trough3.low
      ) {
        if (trough2.low < trough1.low && trough2.low < trough3.low) {
          const high = data[data.length - 7];
          if (high && high.high > trough1.low && high.high > trough3.low) {
            const resistance = (trough1.low + trough2.low + trough3.low) / 3;
            const breakout = data[data.length - 1];
            if (breakout && breakout.close > resistance) {
              return true;
            }
          }
        }
      }
      return false;
    },
    trend: "Bullish",
  },
  {
    type: "Triple Bottom",
    condition: (data) => {
      const trough1 = data[data.length - 9];
      const trough2 = data[data.length - 6];
      const trough3 = data[data.length - 3];
      if (
        trough1 &&
        trough2 &&
        trough3 &&
        trough1.low === trough2.low &&
        trough1.low === trough3.low
      ) {
        const high1 = data[data.length - 8];
        const high2 = data[data.length - 5];
        if (
          high1 &&
          high2 &&
          high1.high > trough1.low &&
          high1.high > trough3.low &&
          high2.high > trough1.low &&
          high2.high > trough3.low
        ) {
          const resistance = (trough1.low + trough2.low + trough3.low) / 3;
          const breakout = data[data.length - 1];
          if (breakout && breakout.close > resistance) {
            return true;
          }
        }
      }
      return false;
    },
    trend: "Bullish",
  },
  {
    type: "Bullish Flag",
    condition: (data) => {
      const flagpole = data.slice(-6).reduce((acc, cur) => {
        if (!acc) {
          acc = { high: cur.high, low: cur.low };
        } else {
          acc.high = Math.max(acc.high, cur.high);
          acc.low = Math.min(acc.low, cur.low);
        }
        return acc;
      }, null);
      if (flagpole) {
        const flag = data.slice(-5).reduce((acc, cur) => {
          if (!acc) {
            acc = { trend: null, trendPoints: [cur] };
          } else if (acc.trend === "Down") {
            if (
              cur.high <= acc.trendPoints[acc.trendPoints.length - 1].high &&
              cur.low <= acc.trendPoints[acc.trendPoints.length - 1].low
            ) {
              acc.trendPoints.push(cur);
            } else {
              acc = null;
            }
          } else if (acc.trend === "Up") {
            if (
              cur.high >= acc.trendPoints[acc.trendPoints.length - 1].high &&
              cur.low >= acc.trendPoints[acc.trendPoints.length - 1].low
            ) {
              acc.trendPoints.push(cur);
            } else {
              acc = null;
            }
          } else {
            if (
              cur.high < acc.trendPoints[acc.trendPoints.length - 1].high &&
              cur.low < acc.trendPoints[acc.trendPoints.length - 1].low
            ) {
              acc.trend = "Down";
              acc.trendPoints.push(cur);
            } else if (
              cur.high > acc.trendPoints[acc.trendPoints.length - 1].high &&
              cur.low > acc.trendPoints[acc.trendPoints.length - 1].low
            ) {
              acc.trend = "Up";
              acc.trendPoints.push(cur);
            } else {
              acc = null;
            }
          }
          return acc;
        }, null);
        if (flag) {
          const breakout = data[data.length - 1];
          if (breakout && breakout.high > flag.trendPoints[0].high) {
            return true;
          }
        }
      }
      return false;
    },
    trend: "Bullish",
  },
  {
    type: "Bullish Pennant",
    condition: (data) => {
      const flagpole = data.slice(-6).reduce((acc, cur) => {
        if (!acc) {
          acc = { high: cur.high, low: cur.low };
        } else {
          acc.high = Math.max(acc.high, cur.high);
          acc.low = Math.min(acc.low, cur.low);
        }
        return acc;
      }, null);
      if (flagpole) {
        const pennant = data.slice(-5).reduce((acc, cur) => {
          if (!acc) {
            acc = { trend: null, trendPoints: [cur] };
          } else if (acc.trend === "Down") {
            if (
              cur.high <= acc.trendPoints[acc.trendPoints.length - 1].high &&
              cur.low >= acc.trendPoints[acc.trendPoints.length - 1].low
            ) {
              acc.trendPoints.push(cur);
            } else {
              acc = null;
            }
          } else if (acc.trend === "Up") {
            if (
              cur.high >= acc.trendPoints[acc.trendPoints.length - 1].high &&
              cur.low <= acc.trendPoints[acc.trendPoints.length - 1].low
            ) {
              acc.trendPoints.push(cur);
            } else {
              acc = null;
            }
          } else {
            if (
              cur.high < acc.trendPoints[acc.trendPoints.length - 1].high &&
              cur.low >= acc.trendPoints[acc.trendPoints.length - 1].low
            ) {
              acc.trend = "Down";
              acc.trendPoints.push(cur);
            } else if (
              cur.high > acc.trendPoints[acc.trendPoints.length - 1].high &&
              cur.low <= acc.trendPoints[acc.trendPoints.length - 1].low
            ) {
              acc.trend = "Up";
              acc.trendPoints.push(cur);
            } else {
              acc = null;
            }
          }
          return acc;
        }, null);
        if (pennant) {
          const breakout = data[data.length - 1];
          if (breakout && breakout.high > pennant.trendPoints[0].high) {
            return true;
          }
        }
      }
      return false;
    },
    trend: "Bullish",
  },
  {
    type: "Bullish Triangle",
    condition: (data) => {
      const triangle = data.slice(-6).reduce((acc, cur) => {
        if (!acc) {
          acc = { trend: null, trendPoints: [cur] };
        } else if (acc.trend === "Down") {
          if (
            cur.high < acc.trendPoints[acc.trendPoints.length - 1].high &&
            cur.low < acc.trendPoints[acc.trendPoints.length - 1].low
          ) {
            acc.trendPoints.push(cur);
          } else {
            acc = null;
          }
        } else if (acc.trend === "Up") {
          if (
            cur.high > acc.trendPoints[acc.trendPoints.length - 1].high &&
            cur.low > acc.trendPoints[acc.trendPoints.length - 1].low
          ) {
            acc.trendPoints.push(cur);
          } else {
            acc = null;
          }
        } else {
          if (
            cur.high < acc.trendPoints[acc.trendPoints.length - 1].high &&
            cur.low > acc.trendPoints[acc.trendPoints.length - 1].low
          ) {
            acc.trend = "Down";
            acc.trendPoints.push(cur);
          } else if (
            cur.high > acc.trendPoints[acc.trendPoints.length - 1].high &&
            cur.low < acc.trendPoints[acc.trendPoints.length - 1].low
          ) {
            acc.trend = "Up";
            acc.trendPoints.push(cur);
          } else {
            acc = null;
          }
        }
        return acc;
      }, null);
      if (triangle) {
        const breakout = data[data.length - 1];
        if (
          breakout &&
          triangle.trend === "Down" &&
          breakout.high > triangle.trendPoints[0].high
        ) {
          return true;
        } else if (
          breakout &&
          triangle.trend === "Up" &&
          breakout.low < triangle.trendPoints[0].low
        ) {
          return true;
        }
      }
      return false;
    },
    trend: "Bullish",
  },
];

const checkPatterns = (data) => {
  return patternsWithTrends
    .filter((pattern) => pattern.condition(data))
    .map((pattern) => pattern.type + " - " + pattern.trend);
};

const printPatterns = (data) => {
  const matchedPatterns = checkPatterns(data);
  if (matchedPatterns.length > 0) {
    console.log(`Matched patterns: ${matchedPatterns.join(", ")}`);
  }
};

const fibonacciLevels = [
  { value: 0, color: "gray" },
  { value: 0.238, color: "red" },
  { value: 0.5, color: "purple" },
  { value: 0.618, color: "white" },
  { value: 0.65, color: "gold" },
  { value: 0.708, color: "blue" },
  { value: 1, color: "gray" },
  { value: 1.618, color: "blue" },
];

const darkTheme = {
  chart: {
    layout: {
      background: {
        type: "solid",
        color: "#2B2B43",
      },
      lineColor: "#2B2B43",
      textColor: "#D9D9D9",
    },
    watermark: {
      color: "rgba(0, 0, 0, 0)",
    },
    crosshair: {
      color: "#758696",
    },
    grid: {
      vertLines: {
        color: "#2B2B43",
      },
      horzLines: {
        color: "#363C4E",
      },
    },
  },
  series: {
    topColor: "rgba(32, 226, 47, 0.56)",
    bottomColor: "rgba(32, 226, 47, 0.04)",
    lineColor: "rgba(32, 226, 47, 1)",
  },
};

const chart = LightweightCharts.createChart(document.getElementById("chart"), {
  width: window.innerWidth,
  height: window.innerHeight,
  layout: {
    backgroundColor: "#1d1d1d",
    textColor: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    fontFamily: "Arial",
    padding: {
      left: 50,
      right: 50,
      top: 10,
      bottom: 10,
    },
  },
  grid: {
    vertLines: {
      color: "#3a3a3a",
      visible: false,
    },
    horzLines: {
      color: "#3a3a3a",
      visible: false,
    },
  },
  crosshair: {
    mode: LightweightCharts.CrosshairMode.Normal,
  },
  priceScale: {
    position: "right",
    mode: LightweightCharts.PriceScaleMode.Normal,
    borderColor: "#3a3a3a",
  },
  timeScale: {
    borderColor: "#3a3a3a",
  },
});

chart.applyOptions({
  width: window.innerWidth * 0.98,
  height: window.innerHeight * 0.95,
  fullscreen: true,
  priceScale: "shared",
  timeScale: {
    timeVisible: true,
    secondsVisible: true,
  },
});

chart.applyOptions(darkTheme.chart);

const priceSeries = chart.addLineSeries({
  color: "green",
  lineWidth: 2,
});

priceSeries.applyOptions(darkTheme.series);

const slopeSeries = chart.addLineSeries({
  color: "red",
  lineWidth: 2,
});

slopeSeries.applyOptions(darkTheme.series);


let prices = [];
let slopes = [];
let lastThreeHighs = [0, 0, 0];

const addHighLabelsToChart = (highs) => {
  const markerData = highs.map((high, index) => ({
    time: high.time,
    position: "aboveBar",
    color: "white",
    text: index + 1 + " - " + high.value,
  }));

  priceSeries.setMarkers(markerData);
};

const candlesSeries = chart.addCandlestickSeries({
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderVisible: false,
  wickVisible: true,
  borderColor: "#26a69a",
  wickColor: "#26a69a",
});

const fibonacciSeries = fibonacciLevels.map((level) => {
  return chart.addLineSeries({
    color: level.color,
    lineWidth: 1,
    priceScaleId: "left",
  });
});

function updateFibLevels(candle) {
  const range = {
    low: candle.low,
    high: candle.high,
  };

  fibonacciLevels.forEach((level, index) => {
    const value = range.low + (range.high - range.low) * level.value;
    fibonacciSeries[index].setData([
      { time: candle.time, value },
      { time: candle.time, value },
    ]);
  });
}
const websocket = new WebSocket("ws://localhost:8765");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getHighsFromKlines(priceData, numHighs = 4) {
  console.log("getHighsFromKlines priceData", priceData);
  const highs = [];
  for (let i = priceData.length - 1; i >= 0; i--) {
    if (highs.length >= numHighs) {
      break;
    }
    // if (candle.high > (highs.length > 0 ? highs[highs.length - 1].price : 0)) {
    if (priceData[i].value > (highs.length > 0 ? highs[highs.length - 1].value : 0)) {
      highs.push({ time: priceData[i].time, value: priceData[i].value });
    }
  }
  return highs.reverse();
}

function updateExtendedLine(priceData, extendedLineSeries) {
  lastThreeHighs = getHighsFromKlines(priceData);
  if (lastThreeHighs.length > 0) {
    console.log("lastThreeHighs", lastThreeHighs);
    console.log("priceData", priceData);

    const prices = priceData.map((price) => price.value);
    console.log("prices", prices);

    // const priceData = prices.map((price, index) => ({
    //   time: priceData[index].time,
    //   value: price * 0.0001,
    // }));

    const latestPrice = prices[prices.length - 1].value;
    const latestTime = priceData[priceData.length - 1].time;

    const slopes = [0, 0, (prices[2] - Math.max(...prices.slice(0, 3))) / 3];

    const lastThreeHighsPrices = lastThreeHighs.map((high) => high.value);
    const lastThreeHighsTimes = lastThreeHighs.map((high) => high.time);

    const newFourthHigh =
      lastThreeHighsPrices[2] +
      slopes.reduce((total, slope, index) => {
        const n = index + 4;
        return total + slope * (n - 1);
      }, 0);
    console.log(
      "lasthigh",
      lastThreeHighsPrices[lastThreeHighsPrices.length - 1]
    );
    console.log("newFourthHigh", newFourthHigh);
    console.log("lastThreeHighs", lastThreeHighs);

    addHighLabelsToChart(lastThreeHighs);

    const options = {
      priceRange: {
        from: Math.min(...lastThreeHighsPrices) - 10,
        to: Math.max(...lastThreeHighsPrices, newFourthHigh) + 10,
      },
      timeRange: {
        from: lastThreeHighsTimes[0] - 2 * 60,
        to: latestTime + 2 * 60,
      },
      visibleRange: {
        from: lastThreeHighsTimes[0] - 2 * 60,
        to: latestTime + 2 * 60,
      },
      priceScale: {
        mode: LightweightCharts.PriceScaleMode.Normal,
      },
      color: "red",
      lineWidth: 2,
      lineStyle: LightweightCharts.LineStyle.Dotted,
    };

    const newPoints = [
      { time: latestTime - 2 * 60, value: lastThreeHighsPrices[0] },
      { time: latestTime - 1 * 60, value: lastThreeHighsPrices[1] },
      { time: latestTime, value: lastThreeHighsPrices[2] },
      { time: latestTime, value: newFourthHigh },
    ];
    console.log("newPoints", newPoints);
    extendedLineSeries.setData(newPoints);
    extendedLineSeries.applyOptions(options);
    return extendedLineSeries;
  }
}

function createExtendedLine(priceData) {
  const extendedLineSeries = chart.addLineSeries({
    color: "red",
    lineWidth: 3,
  });
  extendedLineSeries.applyOptions(darkTheme.series);

  let prices = priceData.map(price => price.value);

  priceSeries.setData(priceData);

  const slopes = [0, 0, (prices[2] - Math.max(...prices.slice(0, 3))) / 3];

  lastThreeHighs = prices.slice(-3);
  const fourthHigh =
    lastThreeHighs[2] +
    slopes.reduce((total, slope, index) => {
      const n = index + 4;
      return total + slope * (n - 1);
    }, 0);

  const points = [
    { time: priceData[priceData.length - 3].time, value: lastThreeHighs[0] },
    { time: priceData[priceData.length - 2].time, value: lastThreeHighs[1] },
    { time: priceData[priceData.length - 1].time, value: lastThreeHighs[2] },
    { time: priceData[priceData.length - 1].time, value: fourthHigh },
  ];

  const x1 = points[0].time - 2 * 60,
    x2 = points[points.length - 1].time + 2 * 60;
  const y1 = Math.min(...points.map((p) => p.value)) - 10,
    y2 = Math.max(...points.map((p) => p.value)) + 10;
  const slope = (y2 - y1) / (x2 - x1);
  const intercept = y1 - slope * x1;

  const options = {
    priceRange: {
      from: Math.min(...points.map((p) => p.value)) - 10,
      to: Math.max(...points.map((p) => p.value)) + 10,
    },
    timeRange: {
      from: points[0].time - 2 * 60,
      to: points[points.length - 1].time + 2 * 60,
    },
    visibleRange: {
      from: points[0].time - 2 * 60,
      to: points[points.length - 1].time + 2 * 60,
    },
    priceScale: {
      mode: LightweightCharts.PriceScaleMode.Normal,
    },
    color: "red",
    lineWidth: 1,
    lineStyle: LightweightCharts.LineStyle.Dotted,
  };

  console.log("points", points);

  extendedLineSeries.setData(points);
  extendedLineSeries.applyOptions(options);
  return extendedLineSeries;
}

websocket.onopen = () => {
  console.log("Connected to server");
};
function groupKlinesByInterval(klines, interval) {
  const intervalMs = interval;
  return klines.reduce((result, kline) => {
    const intervalStart = Math.floor(kline[0] / intervalMs) * intervalMs;
    const intervalEnd = intervalStart + intervalMs;
    const intervalIndex = `${intervalStart}-${intervalEnd}`;
    if (!result[intervalIndex]) {
      result[intervalIndex] = [
        intervalEnd,
        kline[1],
        kline[2],
        kline[3],
        kline[4],
        kline[5],
        kline[6],
        kline[7],
        kline[8],
      ];
    } else {
      const interval = result[intervalIndex];
      interval.time = intervalEnd;
      interval.close = kline[6];
      interval.volume += kline[7];
      if (kline[4] > interval.high) {
        interval.high = kline[4];
      }
      if (kline[5] < interval.low) {
        interval.low = kline[5];
      }
    }
    return result;
  }, {});
}

let lastCandle = null;
let hhData = null;
let hhLine = null;
let priceLine = null;
websocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.klines) {
    console.log(data.klines);
    const interval1sec = 1;
    const interval1min = 1 * 60;
    const interval7min = 7 * 60;
    const interval1hour = interval1min * 60;
    const klinesGrouped = groupKlinesByInterval(data.klines, interval1sec);
    let klines = Object.values(klinesGrouped);
    console.log("klines grouped", klines);
    if (klines.length > 0) {
      let candles = klines.map((value) => {
        const candle = {
          time: value[0],
          open: value[3] / 10000,
          high: value[4] / 10000,
          low: value[5] / 10000,
          close: value[6] / 10000,
        };
        return candle;
      });

      const priceData = candles.map((candle) => ({
        time: candle.time,
        value: candle.close,
      }));

      if (data.hh) {
        console.log('data.hh', data.hh);
        hhData = data.hh.flat(2);
        console.log('hhDatah', hhData);
        // hhData = data.hh.map((array) =>
        //   array.map(hh => (
        //     item = {
        //       time:  hh.time,
        //       value: hh.value,
        //       w_:hh.time,
        //     })));
      }
      if (data.status == "new") {
        priceLine = createExtendedLine(priceData, priceLine);
        // console.log('priceData', priceData);
        // console.log('hhData', hhData);
        if (hhData) {
          hhLine = createExtendedLine(hhData, hhLine);
        }
        sleep(50000);
        candles.map((value) => {
          updateFibLevels(value);
        });
        // createExtendedLine(candles);
        printPatterns(candles);
        websocket.send(JSON.stringify({ status: "active" }));
      } else {
        const prices = priceData.map((price) => price.value);
        console.log("priceData[priceData.length - 1]", priceData[priceData.length - 1]);
        const latestPrice = priceData[priceData.length - 1].value;
        const latestTime = priceData[priceData.length - 1].time;
        console.log("The candlesSeries has one or fewer candles.");
        priceSeries.update({ time: latestTime, value: latestPrice });
        printPatterns(candles);
        console.log("Last candle", priceData[priceData.length - 1]);
        if (priceLine == null) {
          priceLine = createExtendedLine(priceData, priceLine);
        } else {
          priceLine = updateExtendedLine(priceData, priceLine);
        }

        if (hhData) {
          if (hhLine == null) {
            hhLine = createExtendedLine(hhData, hhLine);
          } else {
            hhLine = updateExtendedLine(hhData, hhLine);
          }
        }
        updateFibLevels(candles[candles.length - 1]);

        //
      }
    }
  }
};

websocket.onclose = (event) => {
  console.log(`Connection closed with code ${event.code}`);
  websocket.send({ status: "closed" });
};
