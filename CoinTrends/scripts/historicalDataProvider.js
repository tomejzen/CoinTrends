
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

    MergeData(dataA, valueFieldsA, dataB, valueFieldsB) {

        // Data set A is supposed to be longer if not reverse arguments order
        if (dataB.length > dataA.length)
            return this.MergeData(dataB, valueFieldsB, dataA, valueFieldsA);

        // Creete array which will be returned
        let mergedData = new Array(dataA.length);
        let dataBIndex = 0;

        for (let i = 0; i < dataA.length; i++) {

            mergedData[i] = {};
            mergedData[i]['time'] = dataA[i]['time'];

            // Copy values from dataA set
            for (let j = 0; j < valueFieldsA.length; j++)
                mergedData[i][valueFieldsA[j]] = dataA[i][valueFieldsA[j]];

            // If dataB is covering the same time as current iteration
            if (dataB.length > dataBIndex && dataB[dataBIndex]['time'] == dataA[i]['time']) {

                // Copy values from dataB set
                for (let j = 0; j < valueFieldsB.length; j++)
                    mergedData[i][valueFieldsB[j]] = dataB[dataBIndex][valueFieldsB[j]];

                // Go to next value 
                dataBIndex++;
            }
        }

        // Return merged data array
        return mergedData;
    }
}