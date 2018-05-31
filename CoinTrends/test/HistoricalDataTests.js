
describe('HistoricalDataProvider', function () {

    it('should return data about BITUSD', function (done) {

        // Arrange
        let historicalDataProvider = new HistoricalDataProvider();

        // Act
        historicalDataProvider.LoadCryptocurrencyHistoricalData("BTCUSD", (xhttp) => {

            // Assert
            expect(xhttp).not.toBeNull();
            done();
        });
    });

    it('should return data about LTCUSD', function (done) {

        // Arrange
        let historicalDataProvider = new HistoricalDataProvider();

        // Act
        historicalDataProvider.LoadCryptocurrencyHistoricalData("LTCUSD", (xhttp) => {

            // Assert
            expect(xhttp).not.toBeNull();
            done();
        });
    });

    it('should return null about some not existing cryptocurrency', function (done) {

        // Arrange
        let historicalDataProvider = new HistoricalDataProvider();

        // Act
        historicalDataProvider.LoadCryptocurrencyHistoricalData("AAAAA", (xhttp) => {

            // Assert
            expect(xhttp).toBeNull();
            done();
        });
    });

    it('should load all 3 cryptocurrencies data', function (done) {

        // Arrange
        let historicalDataProvider = new HistoricalDataProvider();
        let loadedCount = 0;

        // Act
        historicalDataProvider.LoadCryptocurrenciesHistoricalData((coinName, fetchedData) => {

            // Assert
            expect(fetchedData).not.toBeNull();
            loadedCount++;

            // End
            if (loadedCount == historicalDataProvider.CRYPTOCURRENCIES.length)
                done();
        });
    });


});