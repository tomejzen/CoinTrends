class Trends {

    constructor() {

        this.DROP_COLOR = "#e74c3c";
        this.GROW_COLOR = "#2ecc71";
        this.TREND_LENGTH = 30;
    }

    CalculateTrend(data, valueField) {

        // Not enough data to find trend line
        if (data.length < 3)
            return null;

        // Get data extremes
        let extremes = FunctionAnalysis.GetMaximumAndMinimumIndex(data, valueField);
        // Get trend of all data
        let trendSlope = FunctionAnalysis.CalculateFunctionSlope(data, valueField);


        // Find resistance trend line
        if (trendSlope < 0) {
            
            let resistanceTrendLine = this.CalculateSupportResistance(data, valueField, extremes.maximum, (a, b) => a > b, trendSlope);
            if (resistanceTrendLine != null)
                resistanceTrendLine['type'] = 'drop';
            
            return resistanceTrendLine;
        }
        // Find support trend line
        else {

            let supportTrendLine = this.CalculateSupportResistance(data, valueField, extremes.minimum, (a, b) => a < b, trendSlope);
            if (supportTrendLine != null)
                supportTrendLine['type'] = 'grow';

            return supportTrendLine;
        }
    }

    CalculateSupportResistance(data, valueField, extreme, compare, trendSlope) {

        let trendLine = null;

        for (let i = 0; i < data.length; i++) {

            // We dont want to check extreme because it is already point of function
            if (extreme == i)
                continue;

            // Get function factors based on extreme point and current one
            let functionFormula = FunctionAnalysis.CalculateFunctionFormula(extreme, data[extreme][valueField], i, data[i][valueField]);

            // Function is not what we are looking for (i.e. we got descending function for grow)
            if (compare(functionFormula.aFactor, 0) || functionFormula.aFactor == 0)
                continue;
            
            // Check if calculated support/resistance trendline is valid
            if (Trends.IsValidSupportResistanceTrendLine(data, valueField, i, extreme, compare, functionFormula.func)) {
                
                // Check if calculated trendline is better than last one
                if (trendLine == null || Math.abs(trendSlope - functionFormula.aFactor) < Math.abs(trendSlope - trendLine.aFactor)) {
                    
                    trendLine = {
                        startValue: functionFormula.func(0),
                        endValue: functionFormula.func(data.length - 1),
                        aFactor: functionFormula.aFactor,
                        bFactor: functionFormula.bFactor
                    };
                }
            }
        }

        // Return calculated trend line
        return trendLine;
    }
    
    static IsValidSupportResistanceTrendLine(data, valueField, i, extreme, compare, f) {

        // For every point in data check if current trend line is valid
        // (No points available below trend line if it is drop, and over if it is grow)
        for (let k = 0; k < data.length; k++) {

            if (k == i || k == extreme)
                continue;

            // Some point below support trend line or above resistance trend line
            if (compare(data[k][valueField], f(k)))
                return false;
        }

        return true;
    }
    
    // Calculate trends data required by chart to draw it
    CalculateTrends(data, coinName) {

        let trends = [];

        for (let k = data.length; k > 0; k -= this.TREND_LENGTH) {

            // Slice data to get only week part
            let dataPart = data.slice(k, k + this.TREND_LENGTH);

            // Get trend informations
            let trend = this.CalculateTrend(dataPart, coinName);
            if (trend == null)
                continue;

            trend.startTime = dataPart[0]['time'].slice(0, 10) + " 12:00:00";
            trend.endTime = dataPart[dataPart.length - 1]['time'].slice(0, 10) + " 12:00:00";

            // Assign color of drop
            trend.color = this.DROP_COLOR;
            if (trend.type == 'grow')
                trend.color = this.GROW_COLOR;

            // Add trend to collection
            trends.push(trend);
        }

        return trends;
    }
    
}