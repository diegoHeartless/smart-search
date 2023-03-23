import axios from "axios";


const serviceUrl = 'https://www.ozon.ru/search/?text=fr&from_global=true';
//let driver = await new Builder().forBrowser('firefox').build();
export const ozonSearch = async (search: string, redirectUrl?: string, page?: number, tf_state?: string): Promise<string> => {
    delete axios.defaults.headers.common['Access-Control-Allow-Origin'];
    let response ;
    console.log(tf_state)
    console.log(redirectUrl)
    console.log(search)
    console.log(search)
    if (redirectUrl) {
        response = await axios.get(redirectUrl + tf_state ? `&tf_state=${tf_state}`: '')
    } else {
        console.log(`https://www.ozon.ru/search/?text=${search}&from_global=true` + (page ? `&page=${page}`: '') + (tf_state ? `&tf_state=${tf_state}`: ''))
        response = await axios.get(
            `https://www.ozon.ru/search/?text=${search}&from_global=true` + (page ? `&page=${page}`: '') + (tf_state ? `&tf_state=${tf_state}`: '')
        )
    }
    console.log(response)
    return response.data
}

export const execute = async (url: string): Promise<string> => {
    let response;
    console.log(url)
        response = await axios.get(url)
    console.log(response)
 //       const text = await axios.post('http://localhost:8080/getpage', response)
    //    console.log(text)

   // console.log(response)
    return response.data;
}