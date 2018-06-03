
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
    

    it('should merge data that will be displayed on chart', function () {

        // Arrange
        let historicalDataProvider = new HistoricalDataProvider();
        let data1 = [
            { time: '2012-12-12', value1: 100 },
            { time: '2012-12-13', value1: 101 },
            { time: '2012-12-14', value1: 102 }
        ];
        let data2 = [
            { time: '2012-12-11', value2: 9 },
            { time: '2012-12-12', value2: 10 },
            { time: '2012-12-13', value2: 11 },
            { time: '2012-12-14', value2: 12 }
        ];

        // Act
        let mergedData = historicalDataProvider.MergeData(data1, ['value1'], data2, ['value2']);
        let mergedData2 = historicalDataProvider.MergeData(data2, ['value2'], data1, ['value1']);

        // Assert
        expect(mergedData.length).toEqual(4);
        expect(mergedData[0].value1).toBeUndefined();
        expect(mergedData[0].value2).toEqual(9);
        expect(mergedData[3].value1).toEqual(102);
        expect(mergedData[3].value2).toEqual(12);
        expect(mergedData).toEqual(mergedData2);
    });

    it('should merge data even if one set is empty', function () {

        // Arrange
        let historicalDataProvider = new HistoricalDataProvider();
        let data2 = [
            { time: '2012-12-11', value2: 9 }
        ];

        // Act
        let mergedData = historicalDataProvider.MergeData([], [], data2, ['value2']);

        // Assert
        expect(mergedData.length).toEqual(1);
        expect(mergedData[0].value2).toEqual(9);
    });

    it('should merge more than 2 datasets', function () {

        // Arrange
        let historicalDataProvider = new HistoricalDataProvider();
        let data1 = [
            { time: '2012-12-14', value1: 102 }
        ];
        let data2 = [
            { time: '2012-12-13', value2: 11 },
            { time: '2012-12-14', value2: 12 }
        ];
        let data3 = [
            { time: '2012-12-14', value3: 99 }
        ];

        // Act
        let mergedData = historicalDataProvider.MergeData(data1, ['value1'], data2, ['value2']);
        mergedData = historicalDataProvider.MergeData(mergedData, ['value1', 'value2'], data3, ['value3']);

        // Assert
        expect(mergedData.length).toEqual(2);
        expect(mergedData[1].value1).toEqual(102);
        expect(mergedData[1].value2).toEqual(12);
        expect(mergedData[1].value3).toEqual(99);
    });
});