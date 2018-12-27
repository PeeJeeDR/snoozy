import * as CONSTANTS from '../constants';

const initialState  = {
    loginStatus: false,
}

const ExternalAppsReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case CONSTANTS.STORE_CALENDAR_STATUS:
            return Object.assign({}, state, {
                loginStatus: action.payload
            })

        case CONSTANTS.GET_CALENDAR_STATUS:
            return state.loginStatus

        default: 
            return state;
    }
}

export default ExternalAppsReducer;