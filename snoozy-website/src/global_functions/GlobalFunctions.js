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