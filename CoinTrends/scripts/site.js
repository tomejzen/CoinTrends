(function () {

    let historicalDataProvider = new HistoricalDataProvider();
    let chartController = new ChartController();
    let trends = new Trends();

    // Initalize chart
    AmCharts.ready(function () {
        chartController.RenderChart('chart');
    });

    historicalDataProvider.LoadCryptocurrenciesHistoricalData(function (coinName, fetchedData) {
        
        let labels = fetchedData.map(o => o.time.substring(0, o.time.length - 9));
        let data = fetchedData.map(o => o.average);

        chartController.chart.dataProvider = chartController.MergeData(chartController.chart.dataProvider, fetchedData);

        if (labels[0] < chartController.chart.dataProvider[0]) {

            for (let x = 0; x < labels.length; x++) {

                if (chartController.chart.dataProvider[0] == labels[x])
                    break;

                let values = {};
                values['date'] = labels[x];
                values[coinName] = data[x];

                chartController.chart.dataProvider.unshift(values);
            }
        }

        let i = 0;
        while (i < chartController.chart.dataProvider.length && chartController.chart.dataProvider[i].date < labels[0]) {
            i++;
        }

        for (let j = 0; j < data.length; j++, i++) {

            if (i >= chartController.chart.dataProvider.length)
                chartController.chart.dataProvider[i] = {};

            chartController.chart.dataProvider[i][coinName] = data[j];
            chartController.chart.dataProvider[i]['date'] = labels[j];
        }

        let graph = chartController.CreateGraph(coinName, coinName, chartController.valueAxis);
        chartController.chart.addGraph(graph);

        for (let k = 0; k < chartController.chart.dataProvider.length / 7; k++) {

            let dataPart = chartController.chart.dataProvider.slice(k * 7, (k + 1) * 7);

            let trend = trends.CalculateTrend(dataPart, coinName);
            let trendLine = chartController.CreateTrendLine(dataPart[0]['date'], trend.startValue, dataPart[dataPart.length - 1]['date'], trend.endValue, "#ff0000");
            chartController.chart.addTrendLine(trendLine);
        }
    });

})();
