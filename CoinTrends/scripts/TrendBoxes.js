class TrendBoxes {

    constructor(id, watchedCoinName) {

        this.startDate = null;
        this.endDate = null;
        this.watchedCoinName = watchedCoinName;
        this.domElement = document.getElementById(id);
    }
    
    updateTrendBoxes(trends, event) {

        this.clearTrendBoxes();

        // If zoom event fired update border dates
        if (event != null && event.type == 'zoomed') {

            this.startDate = event.startDate.toISOString().substring(0, 10);
            this.endDate = event.endDate.toISOString().substring(0, 10);
        }

        // We are checking for drops and grows based on this coin
        let watchedCoinTrends = trends[this.watchedCoinName];
        if (watchedCoinTrends == undefined)
            return;

        // Loop through every single trend
        for (let j = 1; j < watchedCoinTrends.length; j++) {
            
            let otherCoins = [];
            if (DatesExtension.isDateRangeCollidingWithDateRange(watchedCoinTrends[j].startTime, watchedCoinTrends[j].endTime, this.startDate, this.endDate)) {

                for (let coinName in trends) {

                    if (coinName == this.watchedCoinName || j >= trends[coinName].length)
                        continue;

                    if (trends[coinName][j].type == watchedCoinTrends[j].type)
                        otherCoins.push(coinName.substring(0, 3));// + " (" + trends[coinName][j].startTime + " -> " + trends[coinName][j].endTime + ")");
                }
            }

            // Append trend box
            this.appendTrendBox(watchedCoinTrends[j], otherCoins);
        }

    }

    clearTrendBoxes() {

        this.domElement.innerHTML = '';
    }

    appendTrendBox(coinTrend, otherCoins) {

        // No coins with same trend - do not add trend box
        if (otherCoins.length == 0)
            return '';

        let src = 'images/arrowdownred.svg';
        if (coinTrend.type == 'grow')
            src = 'images/arrowupgreen.svg';

        // Append element
        this.domElement.innerHTML += `
            <div class="trend-box">
                <div class="icon">
                    <img src="${src}" alt="${coinTrend.type}">
                </div>
                <div class="content">
                    <div class="title">
                        ${this.watchedCoinName.substring(0, 3)} ${coinTrend.type} - ${coinTrend.startTime.substring(0, 10)}
                    </div>
                    <div class="desc">${otherCoins.join(', ')} started to ${coinTrend.type} just after ${this.watchedCoinName.substring(0, 3)}</div>
                </div>
            </div>
        `;
    }
}