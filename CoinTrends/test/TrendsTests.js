
describe('Trends', function () {

    let data1 = [
        {
            date: "2018-05-10",
            value: 0
        },
        {
            date: "2018-05-11",
            value: 1
        },
        {
            date: "2018-05-12",
            value: -1
        },
        {
            date: "2018-05-13",
            value: 2
        },
        {
            date: "2018-05-14",
            value: 0
        },
        {
            date: "2018-05-15",
            value: -1
        },
        {
            date: "2018-05-16",
            value: 4
        },
    ];

    it('should calculate extremes', function () {

        // Arrange
        let trends = new Trends();

        // Act
        let extremes = trends.GetAllExtremes(data1, 'value');

        // Assert
        expect(extremes.minimums.length).toEqual(3);
        expect(extremes.maximums.length).toEqual(4);

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