class DatesExtension {

    static isDateRangeCollidingWithDateRange(startDate, endDate, borderStartDate, borderEndDate) {

        if (borderStartDate == null && borderEndDate == null)
            return true;

        if (startDate <= borderStartDate && endDate >= borderStartDate ||
            startDate >= borderStartDate && startDate <= borderEndDate ||
            startDate <= borderEndDate && endDate >= borderEndDate)
            return true;

        return false;
    }
}