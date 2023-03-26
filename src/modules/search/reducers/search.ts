import {
    CHANGE_LAST_PAGE,
    SEARCH_START,
    SEARCH_SUCCESS,
    SearchTypes, SET_STATISTICS_HIDED,
    SET_STATISTICS_SHOWED,
    TF_STATE_CHANGE
} from "../actions/search";
import {isNumberedHeader} from "parse5/dist/common/html";


export interface SearchState {
    content: any[];
    tfState?: string;
    loading: boolean
    lastPage: number,
    statistics: {
        showed: number,
        hided: number
    }
}

const initialState: SearchState = {
    content: [],
    loading: false,
    tfState: undefined,
    lastPage: 1,
    statistics: {
        showed: 0,
        hided: 0
    }
}

const searchReducer = (state: SearchState = initialState, action: SearchTypes) => {
    switch (action.type) {
        case SEARCH_START: {
            return {
                ...state,
                loading: true,
                statistics: {
                    showed: 0,
                    hided: 0
                }
            }
        }
        case SEARCH_SUCCESS: {
            return {
                ...state,
                content: action.payload,
                loading: false
            }
        }
        case TF_STATE_CHANGE: {
            return {
                ...state,
                tfState: action.payload
            }
        }
        case CHANGE_LAST_PAGE: {
            return {
                ...state,
                lastPage: action.payload
            }
        }
        case SET_STATISTICS_SHOWED: {
            return {
                ...state,
                statistics: {
                    ...state.statistics,
                    showed: state.statistics.showed + action.payload
                }
            }
        }
        case SET_STATISTICS_HIDED: {
            return {
                ...state,
                statistics: {
                    ...state.statistics,
                    hided: state.statistics.hided + action.payload
                }
            }
        }
        default: {
            return state
        }
    }
}

export {searchReducer};