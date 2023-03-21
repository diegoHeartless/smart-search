import {takeEvery, call, put, select} from 'redux-saga/effects';
import {SEARCH_START, SearchStartAction, searchSuccess, SearchTypes, tfStateChange} from "../actions/search";
import {execute, ozonSearch} from "../../../rest-services/search-service";
import * as parse5 from 'parse5';
import {Simulate} from "react-dom/test-utils";



function* searchAsync(action: SearchStartAction): any {

    let page = 1;
    const resultData: any[] = [];
    while (resultData.length < 50) {
        let data = yield select((state: any) => state?.searchReducer?.tfState);
        console.log(data)
        let response: string = yield call(() => ozonCallAsync(action.payload, page, data))
        const htmlDoc = parse5.parseFragment(response);
        const divWithItems = yield call(() => recursiveSearchAsync(htmlDoc.childNodes));
        const dataState = divWithItems?.attrs.filter((attr: { name: string; }) => attr.name === 'data-state')[0].value;
        const searchData = dataState ? JSON.parse(divWithItems?.attrs.filter((attr: { name: string; }) => attr.name === 'data-state')[0].value) : undefined;
        console.log(searchData)
        if (searchData?.items?.length === 0) {
            console.log('search empty')
            break;
        }
        searchData?.items.forEach((item: any) => {
            let itemdata: any = {
                link: `https://www.ozon.ru`+item?.action?.link,
                images: item?.tileImage?.items
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
            console.log(itemdata)
            console.log(itemdata.title.includes(action.payload))
            if (itemdata.title.toLowerCase().includes(action.payload)) {
                resultData.push(itemdata)
            }
            console.log(resultData)
        })

        page = page + 1;
    }
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
                console.log(nodes[i])
                console.log("data-state")
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
    console.log(response)
    if (response.includes('location.replace(')){
        console.log('redirect detected')
        const redirect = response.substring(
            response.indexOf('location.replace(')+18,
            response.indexOf('");</script>',
                response.indexOf('location.replace(')
            )
        ).replaceAll('\\/', '/').replaceAll('\\', '').replaceAll('u0026', '&')
        console.log('redirect detected')
        console.log('redirect url = ' + redirect)
        response = yield call(() => execute(redirect+(tfstate ? `&tf_state=${tfstate}`: '')));
        yield put(tfStateChange(undefined));
    }
    return response
}


export default function* searchAsyncWatcher() {
    yield takeEvery(SEARCH_START, searchAsync)
}