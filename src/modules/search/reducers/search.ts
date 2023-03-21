import {SEARCH_SUCCESS, SearchTypes, TF_STATE_CHANGE} from "../actions/search";


export interface SearchState {
    content: any[];
    tfState?: string;
    loading: boolean
}

const initialState: SearchState = {
    content: [],
    loading: true,
    tfState: undefined
}

const searchReducer = (state: SearchState = initialState, action: SearchTypes) => {
    switch (action.type) {
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
        default: {
            return state
        }
    }
}

export {searchReducer};