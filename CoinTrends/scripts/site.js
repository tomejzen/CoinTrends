(function () {

    let historicalDataProvider = new HistoricalDataProvider();
    let chartController = new ChartController();

    // Initalize chart
    AmCharts.ready(function () {
        chartController.RenderChart('chart');
    });

    let ccHistoricalData = historicalDataProvider.LoadCryptocurrenciesHistoricalData(function (coinName, fetchedData) {
        
        let labels = fetchedData.map(o => o.time.substring(0, o.time.length - 9)).reverse();
        let data = fetchedData.map(o => o.average).reverse();

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

        console.log(coinName);
    });

})();
