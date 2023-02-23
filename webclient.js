const websocket = new WebSocket("ws://localhost:8765");

websocket.onopen = () => {
    console.log("Connected to server");

    websocket.send("Hello, server!");
    websocket.send("Another message");
};

websocket.onmessage = event => {
    // console.log(`Received message: ${event.data}`);
    console.log(`Received message ohlcv: ${event.data['ohlcv']}`);
    // // Format the data for use with the chart
    // const formattedData = data.map(d => ({
    //     time: d.timestamp,
    //     open: d.open,
    //     high: d.high,
    //     low: d.low,
    //     close: d.close,
    // }));
    // console.log(`Received message formattedData: ${formattedData}`);

    // // Add the OHLC data to the Heikin Ashi series
    // haSeries.setData(formattedData);

    // // Add some technical indicators to the chart
    // const sma20 = chart.addLineSeries({
    //     priceScaleId: 'price',
    //     color: 'orange',
    //     lineWidth: 2,
    // });
    // sma20.setData(formattedData.map(d => ({ time: d.time, value: d.close })));
    // sma20.createPriceLine({
    //     price: 130,
    //     color: 'red',
    //     lineWidth: 2,
    //     axisLabelVisible: false,
    //     title: 'Resistance',
    // });

    // const sma50 = chart.addLineSeries({
    //     priceScaleId: 'price',
    //     color: 'blue',
    //     lineWidth: 2,
    // });
    // sma50.setData(formattedData.map(d => ({ time: d.time, value: d.close })));

    // const macd = chart.addHistogramSeries({
    //     priceScaleId: 'volume',
    //     color: 'purple',
    //     lineWidth: 2,
    //     base: 0,
    //     overlay: true,
    // });
    // macd.setData(formattedData.map(d => ({ time: d.time, value: d.close })));
    // macd.createPriceLine({
    //     price: 0,
    //     color: 'gray',
    //     lineWidth: 2,
    //     axisLabelVisible: false,
    // });    
};

websocket.onclose = event => {
    console.log(`Connection closed with code ${event.code}`);
};

