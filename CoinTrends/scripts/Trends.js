class Trends {

    constructor() {

    }

    CalculateTrend(data, valueField) {

        let minimums = [0];
        let maximums = [0];

        let direction = '';
        let lastValue = data[0][valueField];

        for (let i = 1; i < data.length; i++) {

            let v = data[i][valueField];
            let currentDirection = (v - lastValue) > 0 ? 'up' : 'down';

            if (currentDirection != direction) {

                if (currentDirection == 'up')
                    minimums.push(i);
                else
                    maximums.push(i);
            }

            lastValue = v;
            direction = currentDirection;
        }
        
        return {
            type: 'growth',
            startValue: 0,
            endValue: 0
        };
    }

    GetAllExtremes(data, valueField) {

    }

}