import * as CONSTANTS from '../constants';

export const storeCalendarStatus = payload => {
    return {
        type: CONSTANTS.STORE_CALENDAR_STATUS,
        payload
    }
}

export const getCalendarStatus = payload => {
    return {
        type: CONSTANTS.GET_CALENDAR_STATUS,
        payload
    }
}