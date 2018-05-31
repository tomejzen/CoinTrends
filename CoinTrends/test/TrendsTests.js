
describe('Trends', function () {

    let data1 = [
        { value: 0 },
        { value: 1 },
        { value: -1 },
        { value: 2 },
        { value: 0 },
        { value: -1 },
        { value: 4 },
    ];

    it('should calculate extremes', function () {

        // Arrange
        let trends = new Trends();

        // Act
        let extremes = trends.GetAllExtremePoints(data1, 'value');
        
        // Assert
        console.log(extremes);
        expect(extremes.minimums).toEqual([0, 2, 5]);
        expect(extremes.maximums).toEqual([1, 3, 6]);
    });

    it('should calculate growth trend', function () {

        // Arrange
        let trends = new Trends();

        // Act
        let trend = trends.CalculateTrend(data1, 'value');

        // Assert
        expect(trend.type).toEqual('growth');
        expect(trend.endValue).toEqual(4);
    });

});