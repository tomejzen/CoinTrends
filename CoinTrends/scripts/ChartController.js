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

    RenderChart(elementId) {

        // Create chart
        this.chart = this.CreateChart();

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
        chartCursor.valueLineBalloonEnabled = true;
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

    MergeData(dataA, valueFieldsA, dataB, valueFieldsB) {

        // Data set A is supposed to be longer if not reverse arguments order
        if (dataB.length > dataA.length)
            return this.MergeData(dataB, valueFieldsB, dataA, valueFieldsA);

        // Creete array which will be returned
        let mergedData = new Array(dataA.length);
        let dataBIndex = 0;

        for (let i = 0; i < dataA.length; i++) {

            mergedData[i] = {};
            mergedData[i]['time'] = dataA[i]['time'];

            // Copy values from dataA set
            for (let j = 0; j < valueFieldsA.length; j++)
                mergedData[i][valueFieldsA[j]] = dataA[i][valueFieldsA[j]];

            // If dataB is covering the same time as current iteration
            if (dataB.length > dataBIndex && dataB[dataBIndex]['time'] == dataA[i]['time']) {

                // Copy values from dataB set
                for (let j = 0; j < valueFieldsB.length; j++)
                    mergedData[i][valueFieldsB[j]] = dataB[dataBIndex][valueFieldsB[j]];

                // Go to next value 
                dataBIndex++;
            }
        }

        // Return merged data array
        return mergedData;
    }
}

