(function () {

    let historicalDataProvider = new HistoricalDataProvider();
    let chartController = new ChartController();

    let myChart = chartController.InitializeChart('myChart');

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

        var graph1 = new AmCharts.AmGraph();
        graph1.valueAxis = chartController.valueAxis; // we have to indicate which value axis should be used
        graph1.title = coinName;
        graph1.valueField = coinName;
        graph1.bullet = "round";
        graph1.hideBulletsCount = 30;
        graph1.bulletBorderThickness = 1;
        graph1.lineColor = chartController.GetColor();
        chartController.chart.addGraph(graph1);

        console.log(coinName);
        
    });

})();
