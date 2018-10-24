import request from './request'

/*export const tableApi = params => { return axios.get('/table', {params:params})};

export const tableSearch = params => { return axios.post('/tableSearch', params)};
*/

export const tableApi = (params) => {
    return request({
        url: '/table',
        params: params,
        method: 'get'
    })
}