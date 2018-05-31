class Trends {

    constructor() {

    }

    CalculateTrend(data, valueField) {

        
        return {
            type: 'growth',
            startValue: 0,
            endValue: 0
        };
    }

    GetAllExtremePoints(data, valueField) {

        let minimums = [];
        let maximums = [];

        let lastDirection = this.GetDirection(data[1][valueField], data[0][valueField]);
        if (lastDirection == 'up') {
            minimums.push(0);
        }
        else if (lastDirection == 'down') {
            maximums.push(0);
        }
        else if (lastDirection == 'still') {

            minimums.push(0);
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

}