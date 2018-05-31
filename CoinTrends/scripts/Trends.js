class Trends {

    constructor() {

    }

    CalculateTrend(data, valueField) {

        // Not enough data to find trend line
        if (data.length < 3)
            return null;

        // Get data extremes
        let extremes = this.GetAllExtremePoints(data, valueField);
        
        // Find drop trend line
        let dropTrendLine = this.CalculateTrendLine(data, valueField, extremes.minimums, (a, b) => a < b);
        dropTrendLine['type'] = 'drop';

        // Find growth trend line
        let growthTrendLine = this.CalculateTrendLine(data, valueField, extremes.maximums, (a, b) => a > b);
        growthTrendLine['type'] = 'growth';

        // Return trend that was more significant
        return (Math.abs(dropTrendLine.aFactor) >= Math.abs(growthTrendLine.aFactor)) ? dropTrendLine : growthTrendLine;
    }

    CalculateTrendLine(data, valueField, extremes, compare) {

        if (extremes.length < 2) {

            return {
                startValue: data[0][valueField],
                endValue: data[data.length - 1][valueField],
                aFactor: 0,
                bFactor: 0
            };
        }

        for (let i = 0; i < extremes.length - 1; i++) {
            for (let j = i + 1; j < extremes.length; j++) {

                // Get function factors based on extreme points
                let fFactors = this.CalculateFunctionFactors(extremes[i], data[extremes[i]][valueField], extremes[j], data[extremes[j]][valueField]);

                // Function we will use to calculate points of trend line
                let f = (x) => (fFactors.aFactor * x) + fFactors.bFactor;

                // For every point in extremes check if current trend line is valid
                // (No points available below trend line if it is drop)
                let valid = true;
                for (let k = 0; k < extremes.length; k++) {

                    if (k == i || k == j)
                        continue;

                    // Some point below trendline
                    if (compare(data[extremes[k]][valueField], f(extremes[k]))) {
                        valid = false;
                        break;
                    }
                }

                // If trend line found return it
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

    // Search data for extreme points
    GetAllExtremePoints(data, valueField) {

        // Initalize array
        let minimums = [];
        let maximums = [];

        // Add point 0 as extremes
        let lastDirection = this.GetDirection(data[1][valueField], data[0][valueField]);
        if (lastDirection == 'up' || lastDirection == 'same') {
            minimums.push(0);
        }
        if (lastDirection == 'down' || lastDirection == 'same') {
            maximums.push(0);
        }

        // Check for extremes in data set
        for (let i = 2; i < data.length; i++) {

            let currentDirection = this.GetDirection(data[i][valueField], data[i - 1][valueField]);

            // Function direction changed add point as extreme
            if (currentDirection != lastDirection) {

                if (currentDirection == 'up')
                    minimums.push(i - 1);
                else if (currentDirection == 'down')
                    maximums.push(i - 1);
            }

            lastDirection = currentDirection;
        }

        // Add last point as extreme
        if (lastDirection == 'up')
            maximums.push(data.length - 1);
        else if (lastDirection == 'down')
            minimums.push(data.length - 1);

        // Return found extreemes
        return {
            minimums: minimums,
            maximums: maximums
        };
    }

    // Check function direction going from b to a
    GetDirection(a, b) {

        if (a == b)
            return 'same';

        return (a - b) > 0 ? 'up' : 'down';
    }

    // Translate points to function factors
    // y = aFactor * x + bFactor
    CalculateFunctionFactors(pointA, valueA, pointB, valueB) {

        let aFactor = (valueB - valueA) / (pointB - pointA);
        return {
            aFactor: aFactor,
            bFactor: valueA - (pointA * aFactor)
        };
    }

}