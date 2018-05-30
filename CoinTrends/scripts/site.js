(function () {

    let historicalDataProvider = new HistoricalDataProvider();
    let chartController = new ChartController();

    let myChart = chartController.InitializeChart('myChart');

    let ccHistoricalData = historicalDataProvider.LoadCryptocurrenciesHistoricalData(function (coinName, fetchedData) {

        console.log(coinName);
        console.log(fetchedData);

        let labels = fetchedData.map(o => o.time);
        let data = fetchedData.map(o => [o.average]);
        let color = chartController.GetColor();

        myChart.data.labels = labels;
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
