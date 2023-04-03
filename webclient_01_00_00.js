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
  autoScale: true,
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
chart.timeScale().fitContent();
chart.applyOptions({
  width: window.innerWidth * 0.98,
  height: window.innerHeight * 0.95,
  fullscreen: true,
  priceScale: "shared",
  timeScale: {
    ticksVisible: true,
    timeVisible: true,
    secondsVisible: true,
  },
});
// create a timer function to update the countdown
function updateCountdown(series) {
  const currentBar = series.bars().last();
  const timeToClose = currentBar
    ? currentBar.time + series.options().interval * 1000 - Date.now()
    : 0;
  const secondsToClose = Math.round(timeToClose / 1000);

  // update the countdown text
  series.setLeftPriceFormatter(() => secondsToClose.toString());
}

chart.applyOptions(darkTheme.chart);

const slopeSeries = chart.addLineSeries({
  color: "red",
  lineWidth: 2,
});

slopeSeries.applyOptions(darkTheme.series);

let prices = [];
let slopes = [];
let lastThreeHighs = [0, 0, 0];

function addHighLabelsToChart(highs, label = "") {
  let markerData = highs.map((high, index) => ({
    time: high.time,
    position: "aboveBar",
    color: "white",
    text: label + " - " + high.value,
  }));
  console.log("addHighLabelsToChart", markerData);
  return markerData;
}

const candlesSeries = chart.addCandlestickSeries({
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderVisible: false,
  wickVisible: true,
  borderColor: "#26a69a",
  wickColor: "#26a69a",
});

const fibonacciLevels = [
  { value: 0, color: "gray" },
  { value: 0.236, color: "red" },
  { value: 0.5, color: "purple" },
  { value: 0.618, color: "white" },
  { value: 0.65, color: "gold" },
  { value: 0.786, color: "#64b5f6" }, // light blue
  { value: 1, color: "gray" },
  { value: 1.618, color: "#2962ff" }, // darkk blue
];

const fibonacciSeries = fibonacciLevels.map((level) => {
  return chart.addLineSeries({
    color: level.color,
    lineWidth: 2,
    priceScaleId: "right",
  });
});

const fibonacciSeriesReversed = fibonacciLevels.map((level) => {
  return chart.addLineSeries({
    color: level.color,
    lineWidth: 2,
    priceScaleId: "right",
  });
});

function updateFibLevels(maxHigh, minLow, lastTime, direction = 1) {
  const range = {
    low: minLow.value,
    high: maxHigh.value,
  };
  // console.log('range',range,Date.now() / 1000);
  fibonacciLevels.forEach((level, index) => {
    const value =
      range.low + (range.high - range.low) * level.value * direction;
    if (direction == 1) {
      fibonacciSeries[index].setData([
        { time: lastTime, value },
        { time: lastTime, value },
      ]);
    } else {
      fibonacciSeriesReversed[index].setData([
        { time: lastTime, value },
        { time: lastTime, value },
      ]);
    }
  });
}
const websocket = new WebSocket("ws://localhost:8764");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getHighsFromKlines(priceData, numHighs = 4) {
  // console.log("getHighsFromKlines priceData", priceData);
  const highs = [];
  for (let i = priceData.length - 1; i >= 0; i--) {
    if (highs.length >= numHighs) {
      break;
    }
    // if (candle.high > (highs.length > 0 ? highs[highs.length - 1].price : 0)) {
    if (
      priceData[i].value >
      (highs.length > 0 ? highs[highs.length - 1].value : 0)
    ) {
      highs.push({ time: priceData[i].time, value: priceData[i].value });
    }
  }
  return highs; //.reverse();
}
function updateExtendedLine(lastThreeHighs, extendedLineSeries, label = "") {
  // lastThreeHighs = getHighsFromKlines(priceData);
  if (lastThreeHighs.length > 0) {
    const points = lastThreeHighs.map((point) => point[0]);
    let markers = addHighLabelsToChart(points, label);
    const lastThreeHighsPrices = lastThreeHighs.map((high) => high.value);
    const lastThreeHighsTimes = lastThreeHighs.map((high) => high.time);
    const latestTime = Date.now() / 1000;
    // latestTime = latestTime + 2 * 60;

    // console.log(
    //   "lasthigh",
    //   lastThreeHighsPrices[lastThreeHighsPrices.length - 1]
    // );

    const options = {
      priceRange: {
        from: Math.min(...lastThreeHighsPrices) - 10,
        to: Math.max(...lastThreeHighsPrices) + 10,
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
      lineStyle: LightweightCharts.LineStyle.Dotted,
    };
    // let points = [
    //   lastThreeHighs[0],
    //   lastThreeHighs[1],
    //   lastThreeHighs[2],
    //   lastThreeHighs[3],
    // ];
    console.log("points", points);
    console.log("lastThreeHighs", lastThreeHighs);
    extendedLineSeries.setData(points);
    extendedLineSeries.applyOptions(options);
    extendedLineSeries.setMarkers(markers);
    return extendedLineSeries;
  }
}

function createExtendedLine(lastThreeHighs, label = "", color = "yellow") {
  const points = lastThreeHighs.map((point) => point[0]);
  console.log("lastThreeHighs", lastThreeHighs);
  let markers = addHighLabelsToChart(points, label);
  extendedLineSeries = chart.addLineSeries({
    color: color,
    lineWidth: 3,
  });
  extendedLineSeries.applyOptions(darkTheme.series);

  // const newFourthHigh = lastThreeHighs.pop();
  // const lastThreeHighsPrices = lastThreeHighs.map((high) => high.value);
  // const lastThreeHighsTimes = lastThreeHighs.map((high) => high.time);
  // const latestTime = Date.now() / 1000;

  console.log("points", points);

  // const x1 = points[0].time - 2 * 60,
  //   x2 = points[points.length - 1].time + 2 * 60;
  // const y1 = Math.min(...points.map((p) => p.value)) - 10,
  //   y2 = Math.max(...points.map((p) => p.value)) + 10;
  // const slope = (y2 - y1) / (x2 - x1);
  // const intercept = y1 - slope * x1;

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
    color: color,
    lineWidth: 1,
    lineStyle: LightweightCharts.LineStyle.Dotted,
  };

  extendedLineSeries.setData(points);
  extendedLineSeries.applyOptions(options);
  extendedLineSeries.setMarkers(markers);
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
let hlData = null;
let lhData = null;
let llData = null;
let hhLineSeries = null;
let hlLineSeries = null;
let lhLineSeries = null;
let llLineSeries = null;
let priceLineSeries = null;
websocket.onmessage = (event) => {
  let data = JSON.parse(event.data);
  if (data.klines) {
    // console.log(data.klines);
    // const klinesGrouped = groupKlinesByInterval(data.klines, interval1sec);
    // let klines = Object.values(klinesGrouped);
    let klines = data.klines;
    // console.log('klines',klines);
    // console.log("klines grouped", klines);
    if (klines.length > 0) {
      let candles = klines
        .map((value) => ({
          time: value.time,
          open: value.open / 10000,
          high: value.high / 10000,
          low: value.low / 10000,
          close: value.close / 10000,
        }))
        .sort((a, b) => a.time - b.time)
        .filter(
          (candle, index, array) =>
            index === 0 || candle.time !== array[index - 1].time
        );

      const lastCandles = candles.slice(-380);
      const lastTime = lastCandles[lastCandles.length - 1].time;
      console.log("lastCandles", lastCandles);
      console.log("lastTime", lastTime);

      const maxHigh = lastCandles.reduce(
        (acc, candle) => {
          if (candle.high > acc.value) {
            acc.value = candle.high;
            acc.time = candle.time;
          }
          return acc;
        },
        { value: -Infinity, time: null }
      );

      const minLow = lastCandles.reduce(
        (acc, candle) => {
          if (candle.low < acc.value) {
            acc.value = candle.low;
            acc.time = candle.time;
          }
          return acc;
        },
        { value: Infinity, time: null }
      );

      console.log("Max high: ", maxHigh);
      console.log("Min low: ", minLow);

      updateFibLevels(maxHigh, minLow, lastTime);
      updateFibLevels(maxHigh, minLow, lastTime, -1);

      // console.log('candles',candles);
      // sleep(200000);
      let priceData = candles.map((candle) => ({
        time: candle.time,
        value: candle.close,
      }));

      if (data.positions) {
        const latestTime = Math.floor(Date.now() / 1000);
        data.positions.map((position) => {
          console.log("position", position, latestTime);
          const positionSeries = chart.addLineSeries({
            color: position.type === "long" ? "#00ff00" : "#ff0000",
            lineWidth: 2,
            lineType: LightweightCharts.LineType.Horizontal,
            title: position.type === "long" ? "Long" : "Short",
            data: [
              { time: latestTime, value: position.entryPrice },
              { time: latestTime, value: position.stopLoss },
              { time: latestTime, value: position.takeProfit },
            ],
          });
          if (position.type === "long") {
            console.log('position.type',position.type);
            positionSeries.applyOptions({
              color: "#00ff00",
              fillStyle: {
                color: "rgba(0, 255, 0, 0.2)",
              },
            });
          } else if (position.type === "short") {
            positionSeries.applyOptions({
              color: "#ff0000",
              fillStyle: {
                color: "rgba(255, 0, 0, 0.2)",
              },
            });
          }
        });
      }

      if (data.ll != null) {
        // console.log('Highs', data.hh);
        // hhData = data.hh.slice(-1);
        llData = data.ll;
        llData = llData.map((ll) => ll);
        console.log("Lower Lows", llData);
      }
      if (data.lh != null) {
        // console.log('Highs', data.hh);
        // hhData = data.hh.slice(-1);
        lhData = data.lh;
        lhData = lhData.map((lh) => lh);
        console.log("Lower Highs", lhData);
      }
      if (data.hh != null) {
        // console.log('Highs', data.hh);
        // hhData = data.hh.slice(-1);
        hhData = data.hh;
        hhData = hhData.map((high) => high);
        console.log("Higher Highs", hhData);
      }
      if (data.hl != null) {
        // console.log('Highs', data.hh);
        // hhData = data.hh.slice(-1);
        hlData = data.hl;
        hlData = hlData.map((high) => high);
        console.log("Higher Lows", hlData);
      }
      if (data.status == "new") {
        priceLineSeries = chart.addLineSeries({
          color: "cyan",
          lineWidth: 2,
        });
        console.log("priceData", priceData);
        priceLineSeries.applyOptions(darkTheme.series);
        priceLineSeries.setData(priceData);
        // updateCountdown(priceLineSeries);

        if (llData.length > 0) {
          label = "ll";
          color = "yellow";
          llLineSeries = createExtendedLine(llData, label, color);
        }
        if (lhData.length > 0) {
          label = "lh";
          color = "#ff0000"; // red
          lhLineSeries = createExtendedLine(lhData, label, color);
        }
        if (hhData.length > 0) {
          label = "hh";
          color = "#AAFF00"; // green
          hhLineSeries = createExtendedLine(hhData, label, color);
        }
        if (hlData.length > 0) {
          label = "hl";
          color = "white";
          hlLineSeries = createExtendedLine(hlData, label, color);
        }
        websocket.send(JSON.stringify({ status: "active" }));
      } else {
        // let prices = priceData.map((price) => price.value);
        console.log(`priceData ${priceData.length}`);
        if (priceData.length > 0) {
          let lastCandle = priceData.pop();
          console.log("Last candle", lastCandle);
          if (lastCandle.time != null) {
            priceLineSeries.update(lastCandle);
          }
        }
        printPatterns(candles);
        if (hhData.length > 0) {
          label = "hh";
          if (hhLineSeries == null) {
            hhLineSeries = createExtendedLine(hhData, label);
          } else {
            console.log(hhLineSeries);
            hhLineSeries = updateExtendedLine(hhData, hhLineSeries, label);
          }
        }

        if (hlData.length > 0) {
          label = "hl";
          if (hlLineSeries == null) {
            hlLineSeries = createExtendedLine(hlData, label);
          } else {
            console.log(hlLineSeries);
            hlLineSeries = updateExtendedLine(hlData, hlLineSeries, label);
          }
        }

        if (lhData.length > 0) {
          label = "lh";
          if (lhLineSeries == null) {
            lhLineSeries = createExtendedLine(lhData, label);
          } else {
            console.log(lhLineSeries);
            lhLineSeries = updateExtendedLine(lhData, lhLineSeries, label);
          }
        }

        if (llData.length > 0) {
          label = "ll";
          if (llLineSeries == null) {
            llLineSeries = createExtendedLine(llData, label);
          } else {
            console.log(llLineSeries);
            llLineSeries = updateExtendedLine(llData, llLineSeries, label);
          }
        }
      }
    }
  }
};

websocket.onclose = (event) => {
  console.log(`Connection closed with code ${event.code}`);
  websocket.send({ status: "closed" });
};
