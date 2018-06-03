class TrendBoxes {

    constructor() {

        this.startDate = null;
        this.endDate = null;
        this.watchedCoin = 'BTCUSD';
    }
    
    updateTrendBoxes(id, trends, event) {

        // Get element where we will put trend boxes and clear it
        let domElement = document.getElementById(id);
        domElement.innerHTML = '';

        // If zoom event fired update border dates
        if (event != null && event.type == 'zoomed') {

            this.startDate = event.startDate.toISOString().substring(0, 10);
            this.endDate = event.endDate.toISOString().substring(0, 10);

        }

        // We are checking for drops and grows based on this coin
        let watchedCoinTrends = trends[this.watchedCoin];
        if (watchedCoinTrends == undefined)
            return;

        // Loop through every single trend
        for (let j = 1; j < watchedCoinTrends.length; j++) {

            // Get date ranges of current trend
            let trendStart = watchedCoinTrends[j].startTime.substring(0, 10);
            let trendEnd = watchedCoinTrends[j].endTime.substring(0, 10);

            let otherCoinNames = '';
            if (DatesExtension.isDateRangeCollidingWithDateRange(trendStart, trendEnd, this.startDate, this.endDate)) {

                for (let coinName in trends) {

                    if (coinName == this.watchedCoin)
                        continue;

                    if (j >= trends[coinName].length)
                        continue;

                    let otherCoinTrend = trends[coinName][j];
                    if (otherCoinTrend.type == watchedCoinTrends[j].type)
                        otherCoinNames += coinName.substring(0, 3) + ", ";// + "(" + otherCoinTrend.startTime.substring(0, 10) + "->" + otherCoinTrend.endTime.substring(0, 10) + "), ";
                }
            }

            // Append trend box
            if (otherCoinNames != '') {

                otherCoinNames = otherCoinNames.substring(0, otherCoinNames.length - 2);
                domElement.innerHTML += otherCoinNames + " started to " + coinTrend.type + " just after " + this.watchedCoin.substring(0, 3) + " (" + trendStart + "->" + trendEnd + ")<br>";
            }
        }

    }
}