import axios from 'axios';
import * as Config from './../constant/Config';
export function post(endpoint, data) {
    return axios.post(`${Config.API_URL}/${endpoint}`, data);
}
export function put(endpoint, data) {
    return axios.put(`${Config.API_URL}/${endpoint}`, data);
}
export function getAuth(endpoint, medthod = 'POST', data) {
    return axios({
        headers:
            { 'Content-Type': 'application/x-www-form-urlencoded', },
        method: medthod,
        url: `${Config.BASE_URL}/${endpoint}`,
        data: data
    }).catch(err => { console.log(err) });
}
export function get(endpoint, params) {
    return axios.get(`${Config.API_URL}/${endpoint}`, {
        params: params
    });
}
export function deleteItem(endpoint, id) {
    debugger;
    return axios.delete(`${Config.API_URL}/${endpoint}?id=${id}`, null);
}

