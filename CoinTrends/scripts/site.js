(function () {

    // Create objects of used classes
    let historicalDataProvider = new HistoricalDataProvider();
    let chartController = new ChartController();
    let trends = new Trends();
    let trendBoxes = new TrendBoxes('trend-boxes', 'BTCUSD');
    let trendLines = [];

    // Initalize chart
    AmCharts.ready(function () {
        chartController.RenderChart('chart');
        
        chartController.chart.addListener('zoomed', (event) => {
            
            trendBoxes.updateTrendBoxes(trendLines, event);
        });
    });

    // Load data and create callback to deal with received data
    let loadedValues = [];
    historicalDataProvider.LoadCryptocurrenciesHistoricalData(function (coinName, fetchedData) {

        // Merge received data with already loaded data
        fetchedData.forEach(v => v[coinName] = v.average);
        let mergedData = historicalDataProvider.MergeData(chartController.chart.dataProvider, loadedValues, fetchedData, [coinName]);

        // Update chart sources
        loadedValues.push(coinName);
        chartController.chart.dataProvider = mergedData;

        // Draw graph trend lines
        let coinTrendLines = trends.CalculateTrends(chartController.chart.dataProvider, coinName);
        trendLines[coinName] = coinTrendLines;
        trendBoxes.updateTrendBoxes(trendLines, null);

        coinTrendLines.forEach(trend => {

            let trendLine = chartController.CreateTrendLine(trend.startTime, trend.startValue, trend.endTime, trend.endValue, trend.color);
            chartController.chart.addTrendLine(trendLine);
        });

        // Create graph of currenlty loaded coin
        let graph = chartController.CreateGraph(coinName, coinName, chartController.valueAxis);
        chartController.chart.addGraph(graph);
    });

})();
