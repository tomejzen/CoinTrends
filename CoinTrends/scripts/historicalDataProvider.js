
class HistoricalDataProvider {

    constructor() {

        this.API_ADDRESS = "https://apiv2.bitcoinaverage.com/indices/global/history/{symbol}?period=alltime&?format=json";

        this.CRYPTOCURRENCIES = ["BTCUSD", "LTCUSD", "ETHUSD"];
    }

    LoadCryptocurrencyHistoricalData(coinName, callback) {

        const url = this.API_ADDRESS.replace("{symbol}", coinName);
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (xhttp.readyState == 4 && xhttp.status == 200) {
                callback(xhttp);
            }
        };

        xhttp.open("GET", url, true);
        xhttp.send();
    }

    LoadCryptocurrenciesHistoricalData(callback) {

        let cryptocurrenciesData = new Array(this.CRYPTOCURRENCIES.length);

        for (let i = 0; i < cryptocurrenciesData.length; i++) {

            const coinName = this.CRYPTOCURRENCIES[i];
            this.LoadCryptocurrencyHistoricalData(coinName, function (xhttp) {

                callback(coinName, JSON.parse(xhttp.responseText));
            });
        }
    }
}