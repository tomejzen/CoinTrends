(function () {

    const ctx = document.getElementById("myChart").getContext('2d');

    let historicalDataProvider = new HistoricalDataProvider();
    let myChart = InitializeChart();


    document.getElementsByClassName('crypto-button').forEach((button) => {

        button.onclick = function () {
            cryptoButtonClicked(this);
            return false;
        };
    });

    function cryptoButtonClicked(button) {

        const coinName = button.dataset.coin;
        LoadCryptocurrencyOnChart(coinName);
    }

    LoadCryptocurrencyOnChart("BTCUSD");

    function LoadCryptocurrencyOnChart(coinName) {

        historicalDataProvider.Load(coinName, (xhttp) => {

            if (xhttp.readyState == 4 && xhttp.status == 200) {

                let fetchedData = JSON.parse(xhttp.responseText);

                let labels = fetchedData.map(o => o.time);
                let data = fetchedData.map(o => [o.average]);

                myChart.data.labels = labels;
                myChart.data.datasets.forEach((dataset) => {
                    dataset.data = data;
                });

                myChart.update();
            }
        });
    }

    // Function creating chart object
    function InitializeChart() {

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
