class Trends {

    constructor() {

    }

    CalculateTrend(data, valueField) {

        let extremes = this.GetAllExtremePoints(data, valueField);

        let dropTrendLine = this.CalculateTrendLine(data, valueField, extremes.minimums, (a, b) => a < b);
        dropTrendLine['type'] = 'drop';
        let growthTrendLine = this.CalculateTrendLine(data, valueField, extremes.maximums, (a, b) => a > b);
        growthTrendLine['type'] = 'growth';
        
        return (Math.abs(dropTrendLine.aFactor) >= Math.abs(growthTrendLine.aFactor)) ? dropTrendLine : growthTrendLine;
    }

    CalculateTrendLine(data, valueField, extremes, compare) {

        for (let i = 0; i < extremes.length - 1; i++) {
            for (let j = i + 1; j < extremes.length; j++) {

                let fFactors = this.CalculateFunctionFactors(extremes[i], data[extremes[i]][valueField], extremes[j], data[extremes[j]][valueField]);

                let f = (x) => (fFactors.aFactor * x) + fFactors.bFactor;

                let valid = true;
                for (let k = 0; k < extremes.length; k++) {

                    if (k == i || k == j)
                        continue;

                    if (compare(data[extremes[k]][valueField], f(extremes[k]))) {
                        valid = false;
                        break;
                    }
                }

                if (valid) {

                    return {
                        startValue: f(0),
                        endValue: f(data.length - 1),
                        aFactor: fFactors.aFactor,
                        bFactor: fFactors.bFactor
                    };
                }
            }
        }
    }

    GetAllExtremePoints(data, valueField) {

        let minimums = [];
        let maximums = [];

        let lastDirection = this.GetDirection(data[1][valueField], data[0][valueField]);
        if (lastDirection == 'up' || lastDirection == 'same') {
            minimums.push(0);
        }
        if (lastDirection == 'down' || lastDirection == 'same') {
            maximums.push(0);
        }

        for (let i = 2; i < data.length; i++) {

            let currentDirection = this.GetDirection(data[i][valueField], data[i - 1][valueField]);

            if (currentDirection != lastDirection) {

                if (currentDirection == 'up')
                    minimums.push(i - 1);
                else if (currentDirection == 'down')
                    maximums.push(i - 1);
            }

            lastDirection = currentDirection;
        }

        if (lastDirection == 'up')
            maximums.push(data.length - 1);
        else if (lastDirection == 'down')
            minimums.push(data.length - 1);

        return {
            minimums: minimums,
            maximums: maximums
        };
    }

    GetDirection(a, b) {

        if (a == b)
            return 'same';

        return (a - b) > 0 ? 'up' : 'down';
    }

    CalculateFunctionFactors(pointA, valueA, pointB, valueB) {

        let aFactor = (valueB - valueA) / (pointB - pointA);
        return {
            aFactor: aFactor,
            bFactor: valueA - (pointA * aFactor)
        };
    }

}