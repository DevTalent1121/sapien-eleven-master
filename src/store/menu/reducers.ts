import { combineReducers } from 'redux';
import { CHANGE_PAGE_TITLE, TOGGLE_DRAWER } from './actions';

export type AppState = {
    app: CommonState;
};
export type CommonState = {
    pageTitle: string;
    drawerOpen: boolean;
};
const initialAppState: CommonState = {
    pageTitle: '',
    drawerOpen: false,
};

export function menuReducer(
    state = initialAppState,
    action: any
): CommonState {
    switch (action.type) {
        case CHANGE_PAGE_TITLE:
            return {
                ...state,
                pageTitle: action.payload,
            };
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: action.payload,
            };
        default:
            return state;
    }
}