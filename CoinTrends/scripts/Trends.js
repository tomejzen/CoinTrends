class Trends {

    constructor() {

        this.DROP_COLOR = "#e74c3c";
        this.GROWTH_COLOR = "#2ecc71";
        this.TREND_LENGTH = 10;
    }

    CalculateTrend(data, valueField) {

        // Not enough data to find trend line
        if (data.length < 3)
            return null;

        // Get data extremes
        let extremes = this.GetMaximumAndMinimumIndex(data, valueField);
        let trendSlope = this.GetTrendSlope(data, valueField);
        
        // Find drop trend line
        if (trendSlope < 0) {

            let dropTrendLine = this.CalculateTrendLine(data, valueField, extremes.minimum, (a, b) => a < b);
            dropTrendLine['type'] = 'drop';
            return dropTrendLine;
        }
        // Find growth trend line
        else {

            let growthTrendLine = this.CalculateTrendLine(data, valueField, extremes.maximum, (a, b) => a > b);
            growthTrendLine['type'] = 'growth';
            return growthTrendLine;
        }
    }

    CalculateTrendLine(data, valueField, extreme, compare) {

        for (let i = 0; i < data.length; i++) {

            // We dont want to check extreme because it is already point of function
            if (extreme == i)
                continue;

            // Get function factors based on extreme point and current one
            let fFactors = this.CalculateFunctionFactors(extreme, data[extreme][valueField], i, data[i][valueField]);

            // Function is not what we are looking for (i.e. we got descending function for growth)
            if (!compare(fFactors.aFactor, 0))
                continue;

            // Function we will use to calculate points of trend line
            let f = (x) => (fFactors.aFactor * x) + fFactors.bFactor;

            // Check if calculated support/resistance trendline is valid
            if (this.IsValidSupportResistanceTrendLine(data, valueField, i, extreme, compare, f)) {
                
                return {
                    startValue: f(0),
                    endValue: f(data.length - 1),
                    aFactor: fFactors.aFactor,
                    bFactor: fFactors.bFactor
                };
            }

        }

        return {
            startValue: data[0][valueField],
            endValue: data[data.length - 1][valueField],
            aFactor: 0,
            bFactor: 0
        };
    }

    // Find extremes in data set
    GetMaximumAndMinimumIndex(data, valueField) {

        // Get indexes of maximum and minimum
        let maximum = data.reduce((iMax, x, i, arr) => x[valueField] > arr[iMax][valueField] ? i : iMax, 0);
        let minimum = data.reduce((iMin, x, i, arr) => x[valueField] < arr[iMin][valueField] ? i : iMin, 0);

        return {
            maximum: maximum,
            minimum: minimum
        };
    }

    IsValidSupportResistanceTrendLine(data, valueField, i, extreme, compare, f) {

        // For every point in data check if current trend line is valid
        // (No points available below trend line if it is drop, and over if it is growth)
        for (let k = 0; k < data.length; k++) {

            if (k == i || k == extreme)
                continue;

            // Some point below support trend line or above resistance trend line
            if (compare(data[k][valueField], f(k)))
                return false;
        }

        return true;
    }

    // Get trend slope
    GetTrendSlope(data, valueField) {

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

        return ((n * sumXY) - (sumX * sumY)) / ((n * sumXSquared) - Math.pow(sumX, 2));
    }

    // Calculate trends data required by chart to draw it
    CalculateTrends(data, coinName) {

        let trends = [];

        for (let k = 0; k < data.length / this.TREND_LENGTH; k++) {

            // Slice data to get only week part
            let dataPart = data.slice(k * this.TREND_LENGTH, (k + 1) * this.TREND_LENGTH);

            // Get trend informations
            let trend = this.CalculateTrend(dataPart, coinName);
            trend.startTime = dataPart[0]['time'].slice(0, 10) + " 12:00:00";
            trend.endTime = dataPart[dataPart.length - 1]['time'].slice(0, 10) + " 12:00:00";

            // Assign color of drop
            trend.color = this.DROP_COLOR;
            if (trend.type == 'growth')
                trend.color = this.GROWTH_COLOR;

            // Add trend to collection
            trends.push(trend);
        }

        return trends;
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