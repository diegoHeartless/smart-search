import e from "express";
import {SearchType} from "../utils/consts";

export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const TF_STATE_CHANGE = "TF_STATE_CHANGE";
export const CHANGE_LAST_PAGE = "CHANGE_LAST_PAGE";
export const SET_STATISTICS_SHOWED = "SET_STATISTICS_SHOWED";
export const SET_STATISTICS_HIDED = "SET_STATISTICS_HIDED";

export interface SearchStartAction {
    type: typeof SEARCH_START;
    payload: {search: string, searchType: SearchType}
}

interface SearchSuccessAction {
    type: typeof SEARCH_SUCCESS;
    payload: any[]
}

interface TfStateChangeAction {
    type: typeof TF_STATE_CHANGE;
    payload: string | undefined
}

export interface ChangeLastPage {
    type: typeof CHANGE_LAST_PAGE;
    payload: number
}

export interface SetStatisticsShowed {
    type: typeof SET_STATISTICS_SHOWED;
    payload: number
}

export interface SetStatisticsHided {
    type: typeof SET_STATISTICS_HIDED;
    payload: number
}

export type SearchTypes =
    | SearchStartAction
    | SearchSuccessAction
    | TfStateChangeAction
    | ChangeLastPage
    | SetStatisticsShowed
    | SetStatisticsHided;

export const searchStart = (search: string, searchType: SearchType): SearchStartAction => ({
    type: SEARCH_START,
    payload: {search, searchType},
});

export const changeLastPage = (page: number): ChangeLastPage => ({
    type: CHANGE_LAST_PAGE,
    payload: page,
});

export const setStatisticsShowed = (statistic: number | undefined): SetStatisticsShowed => ({
    type: SET_STATISTICS_SHOWED,
    payload: statistic,
});

export const setStatisticsHided = (statistic: number | undefined): SetStatisticsHided => ({
    type: SET_STATISTICS_HIDED,
    payload: statistic,
});


export const tfStateChange = (tfstate: string | undefined): TfStateChangeAction => ({
    type: TF_STATE_CHANGE,
    payload: tfstate,
});

export const searchSuccess = (content: any[]): SearchSuccessAction => ({
    type: SEARCH_SUCCESS,
    payload: content,
});
