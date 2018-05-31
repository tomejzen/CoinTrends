(function () {

    // Create objects of used classes
    let historicalDataProvider = new HistoricalDataProvider();
    let chartController = new ChartController();
    let trends = new Trends();

    // Initalize chart
    AmCharts.ready(function () {
        chartController.RenderChart('chart');
    });

    let loadedValues = [];
    historicalDataProvider.LoadCryptocurrenciesHistoricalData(function (coinName, fetchedData) {

        // Merge received data with already loaded data
        fetchedData.forEach(v => v[coinName] = v.average);
        let mergedData = chartController.MergeData(chartController.chart.dataProvider, loadedValues, fetchedData, [coinName]);

        // Update chart sources
        loadedValues.push(coinName);
        chartController.chart.dataProvider = mergedData;

        // Create graph of currenlty loaded coin
        let graph = chartController.CreateGraph(coinName, coinName, chartController.valueAxis);
        chartController.chart.addGraph(graph);

        //for (let k = 0; k < chartController.chart.dataProvider.length / 7; k++) {

        //    let dataPart = chartController.chart.dataProvider.slice(k * 7, (k + 1) * 7);
            
        //    let trend = trends.CalculateTrend(dataPart, coinName);
        //    let trendLine = chartController.CreateTrendLine(dataPart[0]['time'], trend.startValue, dataPart[dataPart.length - 1]['time'], trend.endValue, "#ff0000");
        //    chartController.chart.addTrendLine(trendLine);
        //}
    });

})();
