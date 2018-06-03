
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
});