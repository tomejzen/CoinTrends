class FunctionAnalysis {

    // Calculate function slope
    static CalculateFunctionSlope(data, valueField) {

        let n = data.length;
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumXSquared = 0;

        for (let x = 0; x < data.length; x++) {
            let y = data[x][valueField];

            sumX += x;
            sumY += y;
            sumXY += (x * y);
            sumXSquared += Math.pow(x, 2);
        }

        // Calculate slope from formula
        return ((n * sumXY) - (sumX * sumY)) / ((n * sumXSquared) - Math.pow(sumX, 2));
    }

    // Check function direction 
    static GetDirection(to, from) {

        if (to == from)
            return 'same';

        return (to - from) > 0 ? 'up' : 'down';
    }
    
    // Translate points to function factors
    // y = aFactor * x + bFactor
    static CalculateFunctionFormula(pointA, valueA, pointB, valueB) {

        let aFactor = (valueB - valueA) / (pointB - pointA);
        let bFactor = valueA - (pointA * aFactor);

        return {
            aFactor: aFactor,
            bFactor: bFactor,
            func: (x) => (aFactor * x) + bFactor
        };
    }

    // Find extremes in data set
    static GetMaximumAndMinimumIndex(data, valueField) {

        // Get indexes of maximum and minimum
        let maximum = data.reduce((iMax, x, i, arr) => x[valueField] >= arr[iMax][valueField] ? i : iMax, 0);
        let minimum = data.reduce((iMin, x, i, arr) => x[valueField] <= arr[iMin][valueField] ? i : iMin, 0);

        return {
            maximum: maximum,
            minimum: minimum
        };
    }
}