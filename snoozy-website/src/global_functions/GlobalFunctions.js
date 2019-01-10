export const convertToLocale = (value, from, to, how) => {
    let valToArr    = [];

    if (how === 'BY_CHAR') valToArr = value.split('');
    if (how === 'BY_SPACE') valToArr = value.split(' ');

    let newVal      = '';

    for (let i = 0, ilen = valToArr.length; i < ilen; i++)
    {
        if (valToArr[i] === from)
        {
            valToArr[i] = to
        }
    }

    if (how === 'BY_CHAR') valToArr = valToArr.join('');
    if (how === 'BY_SPACE') valToArr = valToArr.join(' ');

    return newVal;
}

export const formatTime = (number) => {
    if (number < 10)
    {
        return "0" + number;
    }
    
    return number;
}

export const returnAlarmDate = (alarm_date) => {
    let date        = new Date(0);
    let result      = '';

    if (date) 
    {
        date.setSeconds(alarm_date.getTime() / 1000);

        let dateStr     = date.toString();

        let weekday     = dateStr.substring(0,3);
        let month       = dateStr.substring(4,7);
        let day         = dateStr.substring(8,10);
        let year        = '';

        //if current year is NOT same as alarm year, add year to return
        if ( date.getFullYear() != dateStr.substring(11,15) ){
            year        = ' ' + dateStr.substring(11,15); 
        }

        result          = weekday + ' ' + day + ' ' + month + year;
    }

    return result;
}