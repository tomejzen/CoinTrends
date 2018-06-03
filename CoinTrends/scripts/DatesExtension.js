class DatesExtension {

    static IsDateRangeCollidingWithDateRange(startTime, endTime, borderStartTime, borderEndTime) {

        if (borderStartTime == null || borderEndTime == null)
            return true;

        let startDate = startTime.substring(0, 10);
        let endDate = endTime.substring(0, 10);
        let borderStartDate = borderStartTime.substring(0, 10);
        let borderEndDate = borderEndTime.substring(0, 10);
        
        if (startDate <= borderStartDate && endDate > borderStartDate ||
            startDate >= borderStartDate && startDate <= borderEndDate ||
            startDate <= borderEndDate && endDate >= borderEndDate)
            return true;

        return false;
    }
    
    static FormatDate(date) {

        let month = date.toLocaleString("en-us", { month: "short" });
        let day = date.getDate();
        let year = date.getFullYear();

        return month + ' ' + day + ', ' + year;
    }
}