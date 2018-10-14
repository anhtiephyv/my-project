import axios from 'axios';
import * as Config from './../../constant/Config';
const endpoint = 'Category';
export function post(endpoint, medthod = 'GET', data) {
    return axios({
        method: medthod,
        url: `${Config.API_URL}/${endpoint}`,
        data: data
    }).catch(err => { console.log(err) });
}
export function getPaging(params) {
    return axios.get(`${Config.API_URL}/${endpoint}/getlistpaging`, {
        params: params
    });
}
export function addCategory(data) {
    return axios.post(`${Config.API_URL}/${endpoint}/create`, data);
}