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

// Set the chart to fullscreen
chart.applyOptions({
  width: window.innerWidth * 0.98,
  height: window.innerHeight * 0.95,
  fullscreen: true,
});


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
  // console.log('fibb candle time',candle);
  fibonacciLevels.forEach((level, index) => {
    const value = range.low + (range.high - range.low) * level.value;
    fibonacciSeries[index].setData([
      { time: candle.time, value },
      { time: candle.time, value },
    ]);
  });
}
const websocket = new WebSocket("ws://localhost:8765");

websocket.onopen = () => {
  console.log("Connected to server");
  // websocket.send("Hello, server!");
  // websocket.send("Another message");
};

let lastCandle = null;

websocket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.klines) {
    // console.log(data.klines);
    const klines = Object.values(data.klines);
    if (klines.length > 0){
      // console.log('data.status',data.status);
      let candles = klines.map(value =>{
        const candle = {
          time:  value[0],
          open:  value[3] / 10000,
          high:  value[4] / 10000,
          low:   value[5] / 10000,
          close: value[6] / 10000,
        };
        return candle;
      });
      
      if(data.status == "new"){
        candlesSeries.setData(candles);
        console.log(candlesSeries.data);
        candles.map(value=>{
          // candlesSeries.update(value);
          updateFibLevels(value);
        });
        
        websocket.send(JSON.stringify({"status":"active"}));
      }else{
        console.log(candlesSeries.data);
        if (candlesSeries.data) {
          console.log("The candlesSeries has more than one candle.");
          candlesSeries.update(candles[candles.length-1]);
          updateFibLevels(candles[candles.length-1]);
          lastCandle = candles[candles.length-1];
        } else {
          console.log("The candlesSeries has one or fewer candles.");
          candles.map(value=>{
            candlesSeries.update(value);
            updateFibLevels(value);
          });
        }
        
        // console.log(candles[candles.length-1],lastCandle);
        // if (!lastCandle || candles[candles.length-1].time > lastCandle.time) {
          // console.log('-= last candle close',candles[candles.length-1].time);
          // 

        // }
        // candlesSeries.update(candles);
        // updateFibLevels(candles);
      }
      
    }
    


    // console.log('last candle',candles)
    
    // updateFibLevels(candles);

    // const candle = {
    //   time:  kline[0],
    //   open:  kline[3] / 10000,
    //   high:  kline[4] / 10000,
    //   low:   kline[5] / 10000,
    //   close: kline[6] / 10000,
    // };
    // candlesSeries.update(candle);
    // updateFibLevels(candle);
    // console.log(temp[key]);
    // const klines = Object.values(data.klines)
    //   .reduce((acc, curr) => {
    //     const key = curr[0];
       
    //     // check if the current timestamp is higher than the previous one
    //     // if (previousTimestamp >= key) {
    //     //   return acc;
    //     // }

    //     // previousTimestamp = key;

    //     if (!temp[key]) {
    //       temp[key] = [];
    //       temp[key].push(curr);
    //     }
    //     return temp;
    //   }, {});
    // console.log('first kline: ',klines[0][0])
    // console.log('first kline: ',Object.values(klines)[0])
    // console.log('last kline: ',Object.values(klines)[Object.values(klines).length-1])
    // let lastCandle = Object.values(klines)[Object.values(klines).length-1][0];
    // console.log(Object.values(klines).length-1);


  }
};


websocket.onclose = (event) => {
  console.log(`Connection closed with code ${event.code}`);
  websocket.send({"status":"closed"});
};

// In this updated code, the `updateFibLevels` function takes the last OHLCV candle received and updates
// the Fibonacci level plots for each chart with the corresponding Fibonacci value.
// The function is called whenever new OHLCV data is received from the WebSocket.
// Note that this updated code also includes the creation of the Fibonacci charts when the DOM is ready,
// and stores them in the `fibCharts` array so that the `updateFibLevels` function can update the plots for each chart.
