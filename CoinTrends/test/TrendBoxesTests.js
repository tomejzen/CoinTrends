
describe('Trends', function () {

    let trendBoxes;
    beforeEach(function () {

        document.body.insertAdjacentHTML('afterbegin', '<div id="trend-boxes"></div>');
        trendBoxes = new TrendBoxes('trend-boxes', 'BTCUSD');
    });

    it('should clear trendbox element', function () {

        // Arrange
        let boxesElem = document.getElementById('trend-boxes');
        boxesElem.innerHTML = 'foo';

        // Act
        trendBoxes.clearTrendBoxes();

        // Assert
        expect(boxesElem.innerHTML).toEqual('');
    });

    it('should append new trendbox', function () {

        // Arrange
        let boxesElem = document.getElementById('trend-boxes');
        let coinTrend = {
            aFactor: 1.0207142857142872,
            bFactor: 425.84,
            color: "#2ecc71",
            endTime: "2016-05-13 12:00:00",
            endValue: 455.4407142857143,
            startTime: "2016-04-14 12:00:00",
            startValue:  425.84,
            type: "grow"
        };
        let otherCoins = [
            'ETH', 'LTC'
        ];

        // Act
        trendBoxes.appendTrendBox(coinTrend, otherCoins);

        // Assert
        expect(boxesElem.innerHTML).toContain('LTC');
        expect(boxesElem.innerHTML).toContain('ETH');
        expect(boxesElem.innerHTML).toContain('grow');
        expect(boxesElem.innerHTML).toContain('BTC');
    });
});