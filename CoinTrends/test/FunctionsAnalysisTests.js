
describe('FunctionAnalysis', function () {
    
    it('should calculate function factors', function () {

        // Arrange

        // Act
        let funcFormula = FunctionAnalysis.CalculateFunctionFormula(1, 0, 3, 1);

        // Assert
        expect(funcFormula.aFactor).toEqual(0.5);
        expect(funcFormula.bFactor).toEqual(-0.5);
    });
    
    it('should get maximum and minimum indexes', function () {

        // Arrange
        let data = [
            { value: 0 },
            { value: 1 },
            { value: 0 },
            { value: 2 },
            { value: 0 },
            { value: -1 },
            { value: 6 },
        ];

        // Act
        let minMax = FunctionAnalysis.GetMaximumAndMinimumIndex(data, 'value');

        // Assert
        expect(minMax.minimum).toEqual(5);
        expect(minMax.maximum).toEqual(6);
    });

    it('should get last possible maximum and minimum indexes', function () {

        // Arrange
        let data = [
            { value: 0 },
            { value: 2 },
            { value: -1 },
            { value: 2 },
            { value: -1 }
        ];

        // Act
        let minMax = FunctionAnalysis.GetMaximumAndMinimumIndex(data, 'value');

        // Assert
        expect(minMax.minimum).toEqual(4);
        expect(minMax.maximum).toEqual(3);
    });

    it('should return same direction', function () {

        // Arrange

        // Act
        let direction = FunctionAnalysis.GetDirection(1, 1);

        // Assert
        expect(direction).toEqual('same');
    });

    it('should return up direction', function () {

        // Arrange

        // Act
        let direction = FunctionAnalysis.GetDirection(2, 1.3);

        // Assert
        expect(direction).toEqual('up');
    });

    it('should return down direction', function () {

        // Arrange

        // Act
        let direction = FunctionAnalysis.GetDirection(2, 1000);

        // Assert
        expect(direction).toEqual('down');
    });

    it('should calcualte correct funcion slope', function () {

        // Arrange
        let data = [
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 }
        ];

        // Act
        let slope = FunctionAnalysis.CalculateFunctionSlope(data, 'value');

        // Assert
        expect(slope).toEqual(1);
    });

    it('should calcualte correct funcion slope #2', function () {

        // Arrange
        let data = [
            { value: 10 },
            { value: 5 },
            { value: 10 },
            { value: 5 }
        ];

        // Act
        let slope = FunctionAnalysis.CalculateFunctionSlope(data, 'value');

        // Assert
        expect(slope).toEqual(-1);
    });
});