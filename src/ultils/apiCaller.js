import axios from 'axios';
import * as Config from './../constant/Config';
export  function post(endpoint, medthod = 'GET', data) {
    return axios({
        method: medthod,
        url: `${Config.API_URL}/${endpoint}`,
        data: data
    }).catch(err => { console.log(err) });
}
export  function get(endpoint, medthod = 'GET', params) {
    return axios.get(`${Config.API_URL}/${endpoint}`, {
        params: params
      });
}