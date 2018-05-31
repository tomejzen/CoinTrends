
describe('ChartController', function () {

    it('should create ValueAxis object', function () {

        // Arrange
        let chartController = new ChartController();

        // Act
        let valueAxis = chartController.CreateValueAxis();

        // Assert
        expect(valueAxis instanceof AmCharts.ValueAxis).toBeTruthy();
    });

    it('should create ChartScrollbar object', function () {

        // Arrange
        let chartController = new ChartController();

        // Act
        let scrollbar = chartController.CreateScrollbar();

        // Assert
        expect(scrollbar instanceof AmCharts.ChartScrollbar).toBeTruthy();
    });

    it('should create AmLegend object', function () {

        // Arrange
        let chartController = new ChartController();

        // Act
        let legend = chartController.CreateLegend();

        // Assert
        expect(legend instanceof AmCharts.AmLegend).toBeTruthy();
    });

    it('should create ChartCursor object', function () {

        // Arrange
        let chartController = new ChartController();

        // Act
        let cursor = chartController.CreateCursor();

        // Assert
        expect(cursor instanceof AmCharts.ChartCursor).toBeTruthy();
    });

    it('should create CreateGraph object', function () {

        // Arrange
        let chartController = new ChartController();

        // Act
        let graph = chartController.CreateGraph('title1', 'valueField1', null);

        // Assert
        expect(graph instanceof AmCharts.AmGraph).toBeTruthy();
        expect(graph.title).toEqual('title1');
        expect(graph.valueField).toEqual('valueField1');
    });

    it('should create CategoryAxis object', function () {

        // Arrange
        let chartController = new ChartController();

        // Act
        let categoryAxis = chartController.CreateCategoryAxis();

        // Assert
        expect(categoryAxis instanceof AmCharts.CategoryAxis).toBeTruthy();
    });

    it('should create TrendLine object', function () {

        // Arrange
        let chartController = new ChartController();

        // Act
        let trendLine = chartController.CreateTrendLine(1, 1, 2, 3, '#ff0000');

        // Assert
        expect(trendLine instanceof AmCharts.TrendLine).toBeTruthy();
    });
    
    it('should render chart in div with specified id', function () {

        // Arragne
        let chartController = new ChartController();
        document.body.insertAdjacentHTML('afterbegin', '<div id="myChart"></div>');

        // Arrange & Assert
        expect(document.getElementById('myChart').innerHTML).toEqual('');

        chartController.RenderChart('myChart');

        expect(document.getElementById('myChart').innerHTML).not.toEqual('');
    });

    it('should merge data that will be displayed on chart', function () {

        // Arrange
        let chartController = new ChartController();
        let data1 = [
            { time: '2012-12-12', value1: 100 },
            { time: '2012-12-13', value1: 101 },
            { time: '2012-12-14', value1: 102 }
        ];
        let data2 = [
            { time: '2012-12-11', value2: 9 },
            { time: '2012-12-12', value2: 10 },
            { time: '2012-12-13', value2: 11 },
            { time: '2012-12-14', value2: 12 }
        ];

        // Act
        let mergedData = chartController.MergeData(data1, ['value1'], data2, ['value2']);
        let mergedData2 = chartController.MergeData(data2, ['value2'], data1, ['value1']);
        
        // Assert
        expect(mergedData.length).toEqual(4);
        expect(mergedData[0].value1).toBeUndefined();
        expect(mergedData[0].value2).toEqual(9);
        expect(mergedData[3].value1).toEqual(102);
        expect(mergedData[3].value2).toEqual(12);
        expect(mergedData).toEqual(mergedData2);
    });

    it('should merge data even if one set is empty', function () {

        // Arrange
        let chartController = new ChartController();
        let data2 = [
            { time: '2012-12-11', value2: 9 }
        ];

        // Act
        let mergedData = chartController.MergeData([], [], data2, ['value2']);

        // Assert
        expect(mergedData.length).toEqual(1);
        expect(mergedData[0].value2).toEqual(9);
    });

    it('should merge more than 2 datasets', function () {

        // Arrange
        let chartController = new ChartController();
        let data1 = [
            { time: '2012-12-14', value1: 102 }
        ];
        let data2 = [
            { time: '2012-12-13', value2: 11 },
            { time: '2012-12-14', value2: 12 }
        ];
        let data3 = [
            { time: '2012-12-14', value3: 99 }
        ];

        // Act
        let mergedData = chartController.MergeData(data1, ['value1'], data2, ['value2']);
        mergedData = chartController.MergeData(mergedData, ['value1', 'value2'], data3, ['value3']);

        // Assert
        expect(mergedData.length).toEqual(2);
        expect(mergedData[1].value1).toEqual(102);
        expect(mergedData[1].value2).toEqual(12);
        expect(mergedData[1].value3).toEqual(99);
    });
});