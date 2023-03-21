export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const TF_STATE_CHANGE = "TF_STATE_CHANGE";

export interface SearchStartAction {
    type: typeof SEARCH_START;
    payload: string
}

interface SearchSuccessAction {
    type: typeof SEARCH_SUCCESS;
    payload: any[]
}

interface TfStateChangeAction {
    type: typeof TF_STATE_CHANGE;
    payload: string | undefined
}

export type SearchTypes =
    | SearchStartAction
    | SearchSuccessAction
    | TfStateChangeAction;

export const searchStart = (search: string): SearchStartAction => ({
    type: SEARCH_START,
    payload: search,
});

export const tfStateChange = (tfstate: string | undefined): TfStateChangeAction => ({
    type: TF_STATE_CHANGE,
    payload: tfstate,
});

export const searchSuccess = (content: any[]): SearchSuccessAction => ({
    type: SEARCH_SUCCESS,
    payload: content,
});
