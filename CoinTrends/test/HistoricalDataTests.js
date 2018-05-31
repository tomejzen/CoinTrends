
describe('HistoricalDataProvider', function () {

    it('should return data about BITUSD', function () {

        // Arrange
        let historicalDataProvider = new HistoricalDataProvider();

        // Act
        historicalDataProvider.LoadCryptocurrencyHistoricalData("BTCUSD", (xhttp) => {

            // Assert
            expect(0).toBe('0');
        });
    });

});