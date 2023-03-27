import {takeEvery, call, put, select} from 'redux-saga/effects';
import {
    changeLastPage,
    SEARCH_START,
    SearchStartAction,
    searchSuccess,
    SearchTypes, setStatisticsHided, setStatisticsShowed,
    tfStateChange
} from "../actions/search";
import {execute, ozonSearch} from "../../../rest-services/search-service";
import * as parse5 from 'parse5';
import {renderIntoDocument, Simulate} from "react-dom/test-utils";
import e from "express";
import {SearchType} from "../utils/consts";



function* searchAsync(action: SearchStartAction): any {
    console.log(action)
    let page = yield select((state: any) => state?.searchReducer?.lastPage);
    const resultData: any[] = [];
    let validSearch = true;
    let showed: number = 0;
    let hided: number = 0;
    let emptyRedirect: number = 0;
    while (validSearch && resultData.length < 50 && emptyRedirect < 5) {
        let data = yield select((state: any) => state?.searchReducer?.tfState);
        let response: string = yield call(() => ozonCallAsync(action.payload.search, page, data));

        const htmlDoc = parse5.parseFragment(response);
        const divWithItems = yield call(() => recursiveSearchAsync(htmlDoc.childNodes));
        const dataState = divWithItems?.attrs.filter((attr: { name: string; }) => attr.name === 'data-state')[0].value;
        const searchData = dataState ? JSON.parse(divWithItems?.attrs.filter((attr: { name: string; }) => attr.name === 'data-state')[0].value) : undefined;
        console.log(searchData)
        if (!searchData || searchData?.items?.length === 0) {
            validSearch = false
        }

        const currentItemsLength = resultData.length;
        searchData?.items?.forEach((item: any) => {
                let itemdata: any = {
                link: `https://www.ozon.ru` + item?.action?.link,
                images: item?.tileImage?.items.map(img => {
                    const index = img?.image?.link.indexOf('multimedia');
                    const replacePart = img?.image?.link.substring(index, index + 13)
                    return img?.image?.link.replace(replacePart, replacePart+'wc200/')
                })
            }
            item.mainState.forEach((state: any) => {
                if (state?.atom?.price?.price) {
                    itemdata = {
                        ...itemdata,
                        price: state?.atom?.price?.price
                    }
                }
                if (state?.atom?.priceWithTitle?.price) {
                    itemdata = {
                        ...itemdata,
                        price: state?.atom?.priceWithTitle?.price
                    }
                }
                if (state?.atom?.textAtom?.text) {
                    itemdata = {
                        ...itemdata,
                        title: state?.atom?.textAtom?.text
                    }
                }
            })

            if (searchTypeCondition(itemdata, action.payload.searchType, action.payload.search)) {
                resultData.push(itemdata)
                showed = showed + 1;
            }
            else {
                hided = hided + 1;
            }

        })
        if (currentItemsLength === resultData.length) {
            emptyRedirect = emptyRedirect + 1;
        }
        page = page + 1;
        yield put(changeLastPage(page));
    }
    yield put(setStatisticsShowed(showed));
    yield put(setStatisticsHided(hided));
    yield put(searchSuccess(resultData));
}

function* recursiveSearchAsync(nodes: any[]): any {
    let result;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName === 'div') {
            if (nodes[i].attrs.some((attr: any) => {
                return attr.name === "id"
                    && attr.value.includes("state-searchResultsV2");
            })) {
                result = nodes[i];
                break;
            }else if(nodes[i].attrs.some((attr: any) => {
                return attr.name === "id"
                    && attr.value.includes("state-megaPaginator");
            })) {
                const nextpage = JSON.parse(nodes[i].attrs.find((atr: { name: string; }) => atr.name==="data-state").value).nextPage;
                if (nextpage) {
                    console.log(nextpage.substring(nextpage.indexOf('tf_state=') + 9, nextpage.length))
                    yield put(tfStateChange(nextpage.substring(nextpage.indexOf('tf_state=') + 9, nextpage.length)));
                }
            } else {
                result = yield call(() => recursiveSearchAsync(nodes[i].childNodes));
                if (result) {
                    break
                }
            }
        }
    }
    return result
}

function* ozonCallAsync(search: string, page?: number, tfstate?: string): any {

    let response: string = yield call(() => ozonSearch(search, undefined, page, tfstate))
    if (response.includes('location.replace(')){
        const redirect = response.substring(
            response.indexOf('location.replace(')+18,
            response.indexOf('");</script>',
                response.indexOf('location.replace(')
            )
        ).replaceAll('\\/', '/')
            .replaceAll('\\', '')
            .replaceAll('u0026', '&')
            .replaceAll('u002b', " ")


        response = yield call(() => execute(redirect+(tfstate ? `&tf_state=${tfstate}`: '')));
        yield put(tfStateChange(undefined));
    }
    return response
}

function searchTypeCondition(item: any, searchType: SearchType, search: string): any {
    switch (searchType) {
        case SearchType.AnyOrderMatch:{
            console.log('any')
            const searchArray = search.split(' ');
            const itemArray = item.title.toLowerCase().split(' ');
            return searchArray.every(value => itemArray.includes(value))
        }
        case SearchType.FullMatch: {
            console.log('full')
            return item.title.toLowerCase().includes(search);
        }
        default: {
            console.log('default')
            return false
        }
    }
}


export default function* searchAsyncWatcher() {
    yield takeEvery(SEARCH_START, searchAsync)
}