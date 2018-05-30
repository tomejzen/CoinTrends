class ChartController {

    constructor() {

        this.colors = [
            { background: 'rgba(26, 188, 156,0.2)', border: 'rgba(22, 160, 133,1.0)' },
            { background: 'rgba(46, 204, 113,0.2)', border: 'rgba(39, 174, 96,1.0)' },
            { background: 'rgba(52, 152, 219,0.2)', border: 'rgba(41, 128, 185,1.0)' },
            { background: 'rgba(155, 89, 182,0.2)', border: 'rgba(142, 68, 173,1.0)' },
            { background: 'rgba(241, 196, 15,0.2)', border: 'rgba(243, 156, 18,1.0)' },
            { background: 'rgba(231, 76, 60,0.2)', border: 'rgba(192, 57, 43,1.0)' }
        ];
        this.currentColorIndex = 0;
    }

    InitializeChart(canvasId) {

        // Get canvas context
        const ctx = document.getElementById(canvasId).getContext('2d');

        // Initalize chart object with default settings
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        type: 'logarithmic'
                    }]
                }
            }
        });
    }

    GetColor() {
        return this.colors[this.currentColorIndex++];
    }
}