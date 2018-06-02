
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
        { value: 8 },
        { value: 5 },
    ];
     
    it('should calculate growth trend', function () {
        
        // Arrange
        let trends = new Trends();

        // Act
        let trend = trends.CalculateTrend(data1, 'value');

        // Assert
        expect(trend.type).toEqual('growth');
        expect(trend.aFactor).toEqual(7);
        expect(trend.bFactor).toEqual(-36);
        expect(trend.startValue).toEqual(-36);
        expect(trend.endValue).toEqual(6);
    });

    it('should calculate growth trend #2', function () {

        // Arrange
        let trends = new Trends();
        let data = [
            { value: 0 },
            { value: -2, },
            { value: 2 }
        ];

        // Act
        let trend = trends.CalculateTrend(data, 'value');

        // Assert
        expect(trend.type).toEqual('growth');
        expect(trend.aFactor).toEqual(4);
        expect(trend.bFactor).toEqual(-6);
        expect(trend.startValue).toEqual(-6);
        expect(trend.endValue).toEqual(2);
    });

    it('should calculate growth trend #3', function () {

        // Arrange
        let trends = new Trends();
        let data = [
            { value: 0 },
            { value: -2 },
            { value: 2 },
            { value: 1 }
        ];

        // Act
        let trend = trends.CalculateTrend(data, 'value');

        // Assert
        expect(trend.type).toEqual('growth');
        expect(trend.aFactor).toEqual(1.5);
        expect(trend.bFactor).toEqual(-3.5);
        expect(trend.startValue).toEqual(-3.5);
        expect(trend.endValue).toEqual(1);
    });

    it('should calculate growth trend #4', function () {

        // Arrange
        let trends = new Trends();
        let data = [
            { value: 0 },
            { value: 0 },
            { value: 2 },
            { value: 2 },
            { value: 1 },
            { value: 1 }
        ];

        // Act
        let trend = trends.CalculateTrend(data, 'value');

        // Assert
        expect(trend.type).toEqual('growth');
        expect(trend.aFactor).toEqual(0.25);
        expect(trend.bFactor).toEqual(-0.25);
        expect(trend.startValue).toEqual(-0.25);
        expect(trend.endValue).toEqual(1);
    });

    it('should calculate growth trend #5', function () {

        // Arrange
        let trends = new Trends();
        let data = [
            { value: 1 },
            { value: 0 },
            { value: 0 },
            { value: 1 },
            { value: 1 },
            { value: 0 },
            { value: 1 },
            { value: 3 }
        ];

        // Act
        let trend = trends.CalculateTrend(data, 'value');
        
        // Assert
        expect(trend.type).toEqual('growth');
        expect(trend.aFactor).toEqual(1);
        expect(trend.bFactor).toEqual(-5);
        expect(trend.startValue).toEqual(-5);
        expect(trend.endValue).toEqual(2);
    });

    it('should calculate drop trend', function () {

        // Arrange
        let trends = new Trends();

        // Act
        let trend = trends.CalculateTrend(data2, 'value');
        
        // Assert
        expect(trend.type).toEqual('drop');
        expect(trend.startValue).toEqual(12.5);
        expect(trend.endValue).toEqual(7.5);
    });

    it('should calculate drop trend #2', function () {

        // Arrange
        let trends = new Trends();
        let data = [
            { value: 0 },
            { value: 2 },
            { value: -1 }
        ];

        // Act
        let trend = trends.CalculateTrend(data, 'value');

        // Assert
        expect(trend.type).toEqual('drop');
        expect(trend.aFactor).toEqual(-3);
        expect(trend.bFactor).toEqual(5);
        expect(trend.startValue).toEqual(5);
        expect(trend.endValue).toEqual(-1);
    });

    it('should calculate drop trend #3', function () {

        // Arrange
        let trends = new Trends();
        let data = [
            { value: 1 },
            { value: 1 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 }
        ];

        // Act
        let trend = trends.CalculateTrend(data, 'value');

        // Assert
        expect(trend.type).toEqual('drop');
        expect(trend.aFactor).toEqual(-0.25);
        expect(trend.bFactor).toEqual(1.25);
        expect(trend.startValue).toEqual(1.25);
        expect(trend.endValue).toEqual(0);
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
        let trendLine = trends.CalculateSupportResistance(data, 'value', 2, (a, b) => a < b);

        // Assert
        expect(trendLine.startValue).toEqual(-5);
        expect(trendLine.endValue).toEqual(3);
        expect(trendLine.aFactor).toEqual(4);
        expect(trendLine.bFactor).toEqual(-5);
        
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
        let trend = trends.CalculateTrend(data, 'value');
        
        // Assert
        expect(trend.type).toEqual('drop');
        expect(trend.startValue).toBeCloseTo(20.91);
        expect(trend.endValue).toBeCloseTo(9.51);
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