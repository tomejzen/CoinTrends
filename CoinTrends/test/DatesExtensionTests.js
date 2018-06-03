
describe('DatesExtension', function () {
    
    it('should detect date ranges colliding, when one started before', function () {

        // Arrange

        // Act
        let colliding = DatesExtension.isDateRangeCollidingWithDateRange("2012-12-12", "2012-12-20", "2012-12-14", "2012-12-21");

        // Assert
        expect(colliding).toBeTruthy();
    });

    it('should detect date ranges colliding, when one started inside', function () {

        // Arrange

        // Act
        let colliding = DatesExtension.isDateRangeCollidingWithDateRange("2012-12-12", "2012-12-20", "2012-12-10", "2012-12-14");

        // Assert
        expect(colliding).toBeTruthy();
    });

    it('should detect date ranges colliding, when one is sub range', function () {

        // Arrange

        // Act
        let colliding = DatesExtension.isDateRangeCollidingWithDateRange("2012-12-12", "2012-12-20", "2012-12-10", "2012-12-30");

        // Assert
        expect(colliding).toBeTruthy();
    });


    it('should not detect date ranges collision, when they are not colliding', function () {

        // Arrange

        // Act
        let colliding = DatesExtension.isDateRangeCollidingWithDateRange("2012-12-12", "2012-12-20", "2012-12-24", "2012-12-30");

        // Assert
        expect(colliding).toBeFalsy();
    });

    it('should not detect date ranges collision, when they are not colliding #2', function () {

        // Arrange

        // Act
        let colliding = DatesExtension.isDateRangeCollidingWithDateRange("2012-12-12", "2012-12-20", "2011-12-24", "2011-12-30");

        // Assert
        expect(colliding).toBeFalsy();
    });

    it('should detect date ranges collision, when border range is null', function () {

        // Arrange

        // Act
        let colliding = DatesExtension.isDateRangeCollidingWithDateRange("2012-12-12", "2012-12-20", null, null);

        // Assert
        expect(colliding).toBeTruthy();
    });

    it('should detect date ranges collision when ending same day', function () {

        // Arrange

        // Act
        let colliding = DatesExtension.isDateRangeCollidingWithDateRange("2018-01-25", "2018-06-02")

        // Assert
        expect(colliding).toBeTruthy();
    });
});