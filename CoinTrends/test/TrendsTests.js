﻿
describe('Trends', function () {

    let data1 = [
        { value: 0 },
        { value: 1 },
        { value: 0 },
        { value: 2 },
        { value: 0 },
        { value: -1 },
        { value: 6 },
    ];

    let data2 = [
        { value: 10 },
        { value: 11 },
        { value: 10 },
        { value: 11 },
        { value: 8 },
        { value: 9 },
        { value: 8 },
        { value: 8 },
        { value: 7 },
        { value: 7 },
        { value: 6 },
    ];
    
    it('should calculate extremes', function () {

        // Arrange 
        let trends = new Trends();

        // Act
        let extremes = trends.GetAllExtremePoints(data1, 'value');
        
        // Assert
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
        expect(trend.aFactor).toEqual(1);
        expect(trend.bFactor).toEqual(0);
        expect(trend.startValue).toEqual(0);
        expect(trend.endValue).toEqual(6);
    });

    it('should calculate drop trend', function () {

        // Arrange
        let trends = new Trends();

        // Act
        let trend = trends.CalculateTrend(data2, 'value');
        
        // Assert
        expect(trend.type).toEqual('drop');
        expect(trend.startValue).toEqual(10);
        expect(trend.endValue).toEqual(5);
    });

    it('should calculate function factors', function () {

        // Arrange
        let trends = new Trends();

        // Act
        let fFactors = trends.CalculateFunctionFactors(1, 0, 3, 1);

        // Assert
        expect(fFactors.aFactor).toEqual(0.5);
        expect(fFactors.bFactor).toEqual(-0.5);
    });

    it('should calculate trend line', function () {

        // Arrange
        let trends = new Trends();
        let data = [
            { value: 1 },
            { value: -1 },
            { value: 3 },
        ];

        // Act
        let trendLine = trends.CalculateTrendLine(data, 'value', [0, 2], (a, b) => a > b);

        // Assert
        expect(trendLine.startValue).toEqual(1);
        expect(trendLine.endValue).toEqual(3);
        expect(trendLine.aFactor).toEqual(1);
        expect(trendLine.bFactor).toEqual(1);
        
    });

    it('should return empty trend line if not enough extremes points', function () {

        // Arrange
        let trends = new Trends();
        let data = [
            { value: 1 },
            { value: -1 },
            { value: 3 },
        ];

        // Act
        let trendLine = trends.CalculateTrendLine(data, 'value', [0]);

        // Assert
        expect(trendLine.startValue).toEqual(data[0]['value']);
        expect(trendLine.endValue).toEqual(data[data.length - 1]['value']);
        expect(trendLine.aFactor).toEqual(0);
        expect(trendLine.bFactor).toEqual(0);

    });

    it('should return null trend line if data is too small', function () {

        // Arrange
        let trends = new Trends();

        // Act
        let trend = trends.CalculateTrend([], 'value');

        // Assert
        expect(trend).toBeNull();
    });

    it('should correctly calculate trend', function () {

        // Arrange
        let trends = new Trends();
        let data = [
            { value: 11.49 },
            { value: 11.62 },
            { value: 11.75 },
            { value: 12.08 },
            { value: 12.6 },
            { value: 13.22 },
            { value: 13.31 },
            { value: 11.86 },
            { value: 9.09 },
            { value: 9.51 },
        ];

        // Act
        let extremes = trends.GetAllExtremePoints(data, 'value');
        let trend = trends.CalculateTrend(data, 'value');
        
        // Assert
        expect(extremes.minimums).toEqual([0, 8]);
        expect(extremes.maximums).toEqual([6, 9]);
        expect(trend.type).toEqual('drop');
        expect(trend.startValue).toEqual(11.49);
        expect(trend.endValue).toEqual(8.79);
    });

    it('should correctly calculate trend #2', function () {

        // Arrange
        let trends = new Trends();
        let data = [
            { value: 11.03 },
            { value: 11.08 },
            { value: 11.19 },
            { value: 11.33 },
            { value: 11.56 },
            { value: 11.69 },
            { value: 11.86 },
            { value: 11.86 },
            { value: 12.03 },
            { value: 12.39 }
        ];

        // Act
        let trend = trends.CalculateTrend(data, 'value');

        // Assert
        expect(trend.type).toEqual('growth');
    });

    it('should get maximum and minimum indexes', function () {

        // Arrange
        let trends = new Trends();

        // Act
        let minMax = trends.GetMaximumAndMinimumIndex(data1, 'value');

        // Assert
        expect(minMax.minimum).toEqual(5);
        expect(minMax.maximum).toEqual(6);
    });
});