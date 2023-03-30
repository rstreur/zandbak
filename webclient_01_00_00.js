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
    ticksVisible:true,
    timeVisible: true,
    secondsVisible: true,
  },
});

chart.applyOptions(darkTheme.chart);

const slopeSeries = chart.addLineSeries({
  color: "red",
  lineWidth: 2,
});

slopeSeries.applyOptions(darkTheme.series);


let prices = [];
let slopes = [];
let lastThreeHighs = [0, 0, 0];

function addHighLabelsToChart(highs) {

  let markerData = highs.map((high, index) => ({
    time: high.time,
    position: "aboveBar",
    color: "white",
    text: index + 1 + " - " + high.value,
  }));
  console.log('addHighLabelsToChart', markerData);
  return markerData;
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
    if (priceData[i].value > (highs.length > 0 ? highs[highs.length - 1].value : 0)) {
      highs.push({ time: priceData[i].time, value: priceData[i].value });
    }
  }
  return highs; //.reverse();
}
function updateExtendedLine(lastThreeHighs, extendedLineSeries) {
  // lastThreeHighs = getHighsFromKlines(priceData);
  if (lastThreeHighs.length > 0) {
    let markers = addHighLabelsToChart(lastThreeHighs);
    // console.log("lastThreeHighs", lastThreeHighs);
    // console.log("priceData", priceData);

    // const prices = priceData.map((price) => price.value);
    // console.log("prices", prices);

    // const priceData = prices.map((price, index) => ({
    //   time: priceData[index].time,
    //   value: price * 0.0001,
    // }));

    // const latestPrice = prices[prices.length - 1].value;
    // const latestTime = priceData[priceData.length - 1].time;

    // const slopes = [0, 0, (prices[2] - Math.max(...prices.slice(0, 3))) / 3];
    // const newFourthHigh = lastThreeHighs.pop();
    const lastThreeHighsPrices = lastThreeHighs.map((high) => high.value);
    const lastThreeHighsTimes = lastThreeHighs.map((high) => high.time);
    const latestTime = Date.now() / 1000;

    // const newFourthHigh =
    //   lastThreeHighsPrices[2] +
    //   slopes.reduce((total, slope, index) => {
    //     const n = index + 4;
    //     return total + slope * (n - 1);
    //   }, 0);
    console.log(
      "lasthigh",
      lastThreeHighsPrices[lastThreeHighsPrices.length - 1]
    );
    // console.log("newFourthHigh", newFourthHigh);
    // console.log("lastThreeHighs", lastThreeHighs);

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
      color: "red",
      lineWidth: 2,
      lineStyle: LightweightCharts.LineStyle.Dotted,
    };
    let points = [
      lastThreeHighs[0],
      lastThreeHighs[1],
      lastThreeHighs[2],
      lastThreeHighs[3],
    ];
    // const newPoints = [
    //   { time: latestTime - 2 * 60, value: lastThreeHighsPrices[0] },
    //   { time: latestTime - 1 * 60, value: lastThreeHighsPrices[1] },
    //   { time: latestTime, value: lastThreeHighsPrices[2] },
    //   { time: latestTime, value: newFourthHigh.value },
    // ];
    console.log("points", points);
    console.log("lastThreeHighs", lastThreeHighs);
    extendedLineSeries.setData(points);
    extendedLineSeries.applyOptions(options);
    extendedLineSeries.setMarkers(markers)
    return extendedLineSeries;
  }
}
// function updateExtendedLine(priceData, extendedLineSeries) {
//   lastThreeHighs = getHighsFromKlines(priceData);
//   if (lastThreeHighs.length > 0) {
//     // console.log("lastThreeHighs", lastThreeHighs);
//     // console.log("priceData", priceData);

//     const prices = priceData.map((price) => price.value);
//     // console.log("prices", prices);

//     // const priceData = prices.map((price, index) => ({
//     //   time: priceData[index].time,
//     //   value: price * 0.0001,
//     // }));

//     const latestPrice = prices[prices.length - 1].value;
//     const latestTime = priceData[priceData.length - 1].time;

//     const slopes = [0, 0, (prices[2] - Math.max(...prices.slice(0, 3))) / 3];
//     const newFourthHigh = lastThreeHighs.pop();
//     const lastThreeHighsPrices = lastThreeHighs.map((high) => high.value);
//     const lastThreeHighsTimes = lastThreeHighs.map((high) => high.time);

//     // const newFourthHigh =
//     //   lastThreeHighsPrices[2] +
//     //   slopes.reduce((total, slope, index) => {
//     //     const n = index + 4;
//     //     return total + slope * (n - 1);
//     //   }, 0);
//     console.log(
//       "lasthigh",
//       lastThreeHighsPrices[lastThreeHighsPrices.length - 1]
//     );
//     console.log("newFourthHigh", newFourthHigh);
//     console.log("lastThreeHighs", lastThreeHighs);

//     addHighLabelsToChart(lastThreeHighs);

//     const options = {
//       priceRange: {
//         from: Math.min(...lastThreeHighsPrices) - 10,
//         to: Math.max(...lastThreeHighsPrices, newFourthHigh) + 10,
//       },
//       timeRange: {
//         from: lastThreeHighsTimes[0] - 2 * 60,
//         to: latestTime + 2 * 60,
//       },
//       visibleRange: {
//         from: lastThreeHighsTimes[0] - 2 * 60,
//         to: latestTime + 2 * 60,
//       },
//       priceScale: {
//         mode: LightweightCharts.PriceScaleMode.Normal,
//       },
//       color: "red",
//       lineWidth: 2,
//       lineStyle: LightweightCharts.LineStyle.Dotted,
//     };

//     const newPoints = [
//       { time: latestTime - 2 * 60, value: lastThreeHighsPrices[0] },
//       { time: latestTime - 1 * 60, value: lastThreeHighsPrices[1] },
//       { time: latestTime, value: lastThreeHighsPrices[2] },
//       { time: latestTime, value: newFourthHigh },
//     ];
//     // console.log("newPoints", newPoints);
//     extendedLineSeries.setData(newPoints);
//     extendedLineSeries.applyOptions(options);
//     return extendedLineSeries;
//   }
// }
function createExtendedLine(lastThreeHighs) {
  const points = lastThreeHighs.map((point)=> point[0]);
  console.log('lastThreeHighs', lastThreeHighs);
  let markers = addHighLabelsToChart(points);
  extendedLineSeries = chart.addLineSeries({
    color: "red",
    lineWidth: 3,
  });
  extendedLineSeries.applyOptions(darkTheme.series);

  // const newFourthHigh = lastThreeHighs.pop();
  const lastThreeHighsPrices = lastThreeHighs.map((high) => high.value);
  const lastThreeHighsTimes = lastThreeHighs.map((high) => high.time);
  const latestTime = Date.now() / 1000;
  // console.log('lastThreeHighsPrices', lastThreeHighsPrices);
  // const fourthHigh =
  //   lastThreeHighs[2] +
  //   slopes.reduce((total, slope, index) => {
  //     const n = index + 4;
  //     return total + slope * (n - 1);
  //   }, 0);

  // const points = [
  //   lastThreeHighs[0],
  //   lastThreeHighs[1],
  //   lastThreeHighs[2],
  //   lastThreeHighs[3],
  // ];
  
  
  console.log("points", points);

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

  extendedLineSeries.setData(points);
  extendedLineSeries.applyOptions(options);
  extendedLineSeries.setMarkers(markers);
  return extendedLineSeries;
}

// function createExtendedLine(priceData) {
//   const extendedLineSeries = chart.addLineSeries({
//     color: "red",
//     lineWidth: 3,
//   });
//   extendedLineSeries.applyOptions(darkTheme.series);

//   let prices = priceData.map(price => price.value);

//   const slopes = [0, 0, (prices[2] - Math.max(...prices.slice(0, 3))) / 3];

//   lastThreeHighs = prices.slice(-3);
//   const fourthHigh =
//     lastThreeHighs[2] +
//     slopes.reduce((total, slope, index) => {
//       const n = index + 4;
//       return total + slope * (n - 1);
//     }, 0);

//   const points = [
//     { time: priceData[priceData.length - 3].time, value: lastThreeHighs[0] },
//     { time: priceData[priceData.length - 2].time, value: lastThreeHighs[1] },
//     { time: priceData[priceData.length - 1].time, value: lastThreeHighs[2] },
//     { time: priceData[priceData.length - 1].time, value: fourthHigh },
//   ];

//   const x1 = points[0].time - 2 * 60,
//     x2 = points[points.length - 1].time + 2 * 60;
//   const y1 = Math.min(...points.map((p) => p.value)) - 10,
//     y2 = Math.max(...points.map((p) => p.value)) + 10;
//   const slope = (y2 - y1) / (x2 - x1);
//   const intercept = y1 - slope * x1;

//   const options = {
//     priceRange: {
//       from: Math.min(...points.map((p) => p.value)) - 10,
//       to: Math.max(...points.map((p) => p.value)) + 10,
//     },
//     timeRange: {
//       from: points[0].time - 2 * 60,
//       to: points[points.length - 1].time + 2 * 60,
//     },
//     visibleRange: {
//       from: points[0].time - 2 * 60,
//       to: points[points.length - 1].time + 2 * 60,
//     },
//     priceScale: {
//       mode: LightweightCharts.PriceScaleMode.Normal,
//     },
//     color: "red",
//     lineWidth: 1,
//     lineStyle: LightweightCharts.LineStyle.Dotted,
//   };

//   // console.log("points", points);

//   extendedLineSeries.setData(points);
//   extendedLineSeries.applyOptions(options);
//   return extendedLineSeries;
// }

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
let lhData = null;
let llData = null;
let hhLineSeries = null;
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
      .filter((candle, index, array) => index === 0 || candle.time !== array[index - 1].time);
    
      // console.log('candles',candles);
      // sleep(200000);
      let priceData = candles.map((candle) => ({
        time: candle.time,
        value: candle.close,
      }));
      if (data.ll) {
        // console.log('Highs', data.hh);
        // hhData = data.hh.slice(-1);
        llData = data.ll;
        llData = llData.map((ll) =>
          (ll)
        );
        console.log('Lower Lows', llData);
      }
      if (data.lh) {
        // console.log('Highs', data.hh);
        // hhData = data.hh.slice(-1);
        lhData = data.lh;
        lhData = lhData.map((lh) =>
          (lh)
        );
        console.log('Lower Highs', lhData);
      }
      if (data.hh) {
        // console.log('Highs', data.hh);
        // hhData = data.hh.slice(-1);
        hhData = data.hh;
        hhData = hhData.map((high) =>
          (high)
        );
        console.log('Higher Highs', hhData);
      }
      if (data.status == "new") {
        priceLineSeries = chart.addLineSeries({
          color: "green",
          lineWidth: 2,
        });
        console.log('priceData', priceData);
        priceLineSeries.applyOptions(darkTheme.series);
        priceLineSeries.setData(priceData);
        // priceLine = createExtendedLine(priceData, priceLine);
        // console.log('priceData', priceData);
        // console.log('hhData', hhData);
        if (llData) {
          llLineSeries = createExtendedLine(llData);
        }
        if (lhData) {
          lhLineSeries = createExtendedLine(lhData);
        }
        if (hhData) {
          hhLineSeries = createExtendedLine(hhData);
        }
        // sleep(500000);
        candles.map((value) => {
          updateFibLevels(value);
        });
        // createExtendedLine(candles);
        // printPatterns(candles);
        websocket.send(JSON.stringify({ status: "active" }));
      } else {
        // let prices = priceData.map((price) => price.value);
        console.log(`priceData ${priceData.length}`);
        if (priceData.length > 0) {
          let lastCandle = priceData.pop();
          console.log("Last candle", lastCandle);
          if (lastCandle.time != null){
            priceLineSeries.update(lastCandle);
          }
          
          // sleep(1000);
        }

        printPatterns(candles);

        // if (priceLine == null) {
        //   priceLine = createExtendedLine(priceData, priceLine);
        // } else {
        //   priceLine = updateExtendedLine(priceData, priceLine);
        // }

        // if (hhData) {
        //   if (hhLineSeries == null) {
        //     hhLineSeries = createExtendedLine(hhData);
        //   } else {
        //     console.log(hhLineSeries);
        //     hhLineSeries = updateExtendedLine(hhData, hhLineSeries);
        //   }
        // }

        // if (lhData) {
        //   if (lhLineSeries == null) {
        //     lhLineSeries = createExtendedLine(lhData);
        //   } else {
        //     console.log(lhLineSeries);
        //     lhLineSeries = updateExtendedLine(lhData, lhLineSeries);
        //   }
        // }

        // if (llData) {
        //   if (llLineSeries == null) {
        //     llLineSeries = createExtendedLine(llData);
        //   } else {
        //     console.log(llLineSeries);
        //     llLineSeries = updateExtendedLine(llData, llLineSeries);
        //   }
        // }
        // updateFibLevels(candles[candles.length - 1]);
        //
      }
    }
  }
};

websocket.onclose = (event) => {
  console.log(`Connection closed with code ${event.code}`);
  websocket.send({ status: "closed" });
};
