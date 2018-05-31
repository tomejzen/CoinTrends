class ChartController {

    constructor() {

        this.colors = [
            'rgba(26, 188, 156, 1)',
            'rgba(231, 76, 60, 1)',
            'rgba(155, 89, 182, 1)',
            'rgba(46, 204, 113, 1)',
            'rgba(52, 152, 219, 1)',
            'rgba(241, 196, 15, 1)'
        ];
        this.currentColorIndex = 0;

        this.chart = null;
    }

    InitializeChart(canvasId) {

        let chartController = this;

        AmCharts.ready(function () {

            // SERIAL CHART
            chartController.chart = new AmCharts.AmSerialChart();

            chartController.chart.dataProvider = [];
            chartController.chart.categoryField = "date";
            
            chartController.chart.synchronizeGrid = true; // this makes all axes grid to be at the same intervals

            // AXES
            // category
            var categoryAxis = chartController.chart.categoryAxis;
            categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
            categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
            categoryAxis.minorGridEnabled = true;
            categoryAxis.axisColor = "#DADADA";
            categoryAxis.twoLineMode = true;
            categoryAxis.dateFormats = [{
                period: 'fff',
                format: 'JJ:NN:SS'
            }, {
                period: 'ss',
                format: 'JJ:NN:SS'
            }, {
                period: 'mm',
                format: 'JJ:NN'
            }, {
                period: 'hh',
                format: 'JJ:NN'
            }, {
                period: 'DD',
                format: 'DD'
            }, {
                period: 'WW',
                format: 'DD'
            }, {
                period: 'MM',
                format: 'MMM'
            }, {
                period: 'YYYY',
                format: 'YYYY'
            }];

            chartController.CreateValueAxis();
            chartController.CreateCursor();
            chartController.CreateScrollbar();
            chartController.CreateLegend();
                      
            // WRITE
            chartController.chart.write("chart");
        });
    }

    CreateValueAxis() {

        this.valueAxis = new AmCharts.ValueAxis();
        this.valueAxis.axisColor = "#DADADA";
        this.valueAxis.axisThickness = 2;
        this.valueAxis.logarithmic = true;
        this.chart.addValueAxis(this.valueAxis);
    }

    CreateCursor() {

        this.chartCursor = new AmCharts.ChartCursor();
        this.chartCursor.cursorAlpha = 0.1;
        this.chartCursor.fullWidth = true;
        this.chartCursor.valueLineBalloonEnabled = true;
        this.chart.addChartCursor(this.chartCursor);
    }

    CreateScrollbar() {

        this.chartScrollbar = new AmCharts.ChartScrollbar();
        this.chart.addChartScrollbar(this.chartScrollbar);
    }

    CreateLegend() {

        this.legend = new AmCharts.AmLegend();
        this.legend.marginLeft = 110;
        this.legend.useGraphSettings = true;
        this.chart.addLegend(this.legend);
    }

    GetColor() {
        return this.colors[this.currentColorIndex++];
    }
}

