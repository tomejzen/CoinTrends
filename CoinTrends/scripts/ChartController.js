class ChartController {

    constructor() {

        this.colors = [
            '#9b59b6',
            '#34495e',
            '#e67e22'
        ];
        this.currentColorIndex = 0;

        this.chart = null;
    }

    RenderChart(elementId) {

        // Create chart
        this.chart = this.CreateChart();
        this.chart.responsive = { "enabled": true };

        // Render to element with specified id
        this.chart.write(elementId);
    }

    CreateChart() {

        let chart = new AmCharts.AmSerialChart();

        chart.dataProvider = [];
        chart.categoryField = "time";
        chart.synchronizeGrid = true; // this makes all axes grid to be at the same intervals

        chart.categoryAxis = this.CreateCategoryAxis();
        chart.addValueAxis(this.CreateValueAxis());
        chart.addLegend(this.CreateLegend());
        chart.addChartScrollbar(this.CreateScrollbar());
        chart.addChartCursor(this.CreateCursor());

        return chart;
    }

    CreateValueAxis() {

        let valueAxis = new AmCharts.ValueAxis();
        valueAxis.axisColor = "#DADADA";
        valueAxis.axisThickness = 2;
        valueAxis.logarithmic = true;
        return valueAxis;
    }

    CreateCategoryAxis() {

        let categoryAxis = new AmCharts.CategoryAxis();
        categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
        categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
        categoryAxis.minorGridEnabled = true;
        categoryAxis.axisColor = "#DADADA";
        categoryAxis.twoLineMode = true;
        return categoryAxis;
    }

    CreateCursor() {

        let chartCursor = new AmCharts.ChartCursor();
        chartCursor.cursorAlpha = 0.1;
        chartCursor.fullWidth = true;
        chartCursor.valueLineBalloonEnabled = false;
        return chartCursor;
    }

    CreateScrollbar() {

        let chartScrollbar = new AmCharts.ChartScrollbar();
        return chartScrollbar;
    }

    CreateLegend() {

        let legend = new AmCharts.AmLegend();
        legend.marginLeft = 110;
        legend.useGraphSettings = true;
        return legend;
    }

    CreateGraph(title, valueField, valueAxis) {

        let graph = new AmCharts.AmGraph();
        graph.valueAxis = valueAxis;
        graph.title = title;
        graph.valueField = valueField;
        graph.bullet = "round";
        graph.hideBulletsCount = 30;
        graph.bulletBorderThickness = 1;
        graph.lineThickness = 3;
        graph.lineColor = this.GetColor();
        return graph;
    }

    CreateTrendLine(initialDate, initalValue, finalDate, finalValue, color) {

        let trendLine = new AmCharts.TrendLine();

        trendLine.initialDate = initialDate;
        trendLine.initialValue = initalValue;

        trendLine.finalDate = finalDate;
        trendLine.finalValue = finalValue;

        trendLine.lineColor = color;
        return trendLine;
    }

    GetColor() {
        return this.colors[this.currentColorIndex++];
    }
}

