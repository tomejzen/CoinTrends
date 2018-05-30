(function () {

    let historicalDataProvider = new HistoricalDataProvider();
    let myChart = InitializeChart();

    let ccHistoricalData = historicalDataProvider.LoadCryptocurrenciesHistoricalData(function (coinName, data) {

        console.log(coinName);
        console.log(data);
    });

    // Function creating chart object
    function InitializeChart() {

        const ctx = document.getElementById("myChart").getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'CoinTrends',
                    data: [],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.2)'
                    ],
                    borderColor: [
                        'rgba(41, 128, 185, 1.0)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        type: 'logarithmic'
                    }]
                }
            }
        });
    }
})();
