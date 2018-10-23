import axios from 'axios'

export const tableApi = params => { return axios.get('/table', {params:params})};

export const tableSearch = params => { return axios.post('/tableSearch', params)};
