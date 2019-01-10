export const formatTime = (number) => {
    if (number < 10)
    {
        return "0" + number;
    }
    
    return number;
}

export const getDateOfWeek = (week, year) => {
    var d = (1 + (week - 1) * 7); // 1st of January + 7 days for each week

    return new Date(year, 0, d);
}