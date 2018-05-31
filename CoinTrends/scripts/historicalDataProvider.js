
class HistoricalDataProvider {

    constructor() {

        this.API_ADDRESS = "https://apiv2.bitcoinaverage.com/indices/global/history/{symbol}?period=alltime&?format=json";

        this.CRYPTOCURRENCIES = ["BTCUSD", "LTCUSD", "ETHUSD"];
    }

    LoadCryptocurrencyHistoricalData(coinName, callback) {

        // Prepere request
        const url = this.API_ADDRESS.replace("{symbol}", coinName);
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            // We are waiting untill request is finished
            if (xhttp.readyState != 4)
                return;

            // Set the response basing on what we got back
            let response = null;
            if (xhttp.status == 200)
                response = xhttp;

            // Callback
            callback(response);
        };

        // Execute request
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    LoadCryptocurrenciesHistoricalData(callback) {

        this.CRYPTOCURRENCIES.forEach((coinName) => {

            this.LoadCryptocurrencyHistoricalData(coinName, function (xhttp) {

                callback(coinName, JSON.parse(xhttp.responseText).reverse());
            });
        });
    }
}