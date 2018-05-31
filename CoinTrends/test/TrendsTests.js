
describe('Trends', function () {

    it('should calculate growth trend', function () {

        // Arrange
        let trends = new Trends();
        let data = [
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

        // Act
        let trend = trends.CalculateTrend(data, 'value');

        // Assert
        expect(trend.type).toEqual('growth');
        expect(trend.endValue).toEqual(4);
    });

});