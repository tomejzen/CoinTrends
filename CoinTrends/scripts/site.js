(function () {

    let historicalDataProvider = new HistoricalDataProvider();
    let chartController = new ChartController();

    let myChart = chartController.InitializeChart('myChart');

    let ccHistoricalData = historicalDataProvider.LoadCryptocurrenciesHistoricalData(function (coinName, fetchedData) {
        
        let labels = fetchedData.map(o => o.time.substring(0, o.time.length - 9)).reverse();
        let data = fetchedData.map(o => o.average).reverse();
        let color = chartController.GetColor();

        if (labels.length > myChart.data.labels.length) {
            let prependAmount = labels.length - myChart.data.labels.length;
            myChart.data.labels = labels;

            myChart.data.datasets.forEach((dataset) => {
                let emptyArray = new Array(prependAmount).fill(undefined);
                dataset.data = emptyArray.concat(dataset.data);
            });
        }

        myChart.data.datasets.push({
            label: coinName,
            data: data,
            backgroundColor: [
                color.background
            ],
            borderColor: [
                color.border
            ],
            borderWidth: 1
        });

        myChart.update();
    });

})();
