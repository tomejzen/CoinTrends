
class HistoricalDataProvider {

    constructor() {

        this.API_ADDRESS = "https://apiv2.bitcoinaverage.com/indices/global/history/{symbol}?period=alltime&?format=json";
    }

    Load(coinName, callback) {

        const url = this.API_ADDRESS.replace("{symbol}", coinName);
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            callback(xhttp);
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}


