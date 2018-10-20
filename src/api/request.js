import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000
})

/**
 * 获取token
 * @return {[string]} [返回token字符串]
 */
function getToken() { 
    let user = localStorage.getItem('user');
    if(user == null){
        router.push({path: '/login'})
    }else{
        return JSON.parse(user)['authorization'] || '';
    }
};


/**
 * AES加密
 * @return {[string]} [返回加密后字符串]
 */
function encrypt(word){
    let key = 'eIa@yb^vpG4Kovtr';
    key = CryptoJS.enc.Utf8.parse(key);
    let iv = "eIa@yb^vpG4Kovtr";
    iv = CryptoJS.enc.Utf8.parse(iv);
    let encrypted = CryptoJS.AES.encrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7 
    }).toString();
    return encrypted;
}

service.interceptors.request.use(config => {
    let xtoken = config.url.indexOf('doLogin') > -1 ? '' : getToken();
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    
    if(xtoken != null){
        config.headers['Authorization'] = xtoken;
        localStorage.setItem("Authorization", xtoken);
    }
    //login  加密开始
    /*if( config.url.indexOf('doLogin') > -1){
        let str=encrypt(JSON.stringify(config.data));
        config.data={}
        config.data.data=str;
    }*/
    //login  加密结束
    if(config.method=='post'){
        config.data = {
            ...config.data,
            _t: Date.parse(new Date())/1000,
        }
        config.data = Qs.stringify(config.data);
    }else if(config.method=='get'){
        config.params = {
            _t: Date.parse(new Date())/1000,
            ...config.params
        }
    }
    return config
},function(error){
    return Promise.reject(error)
})

service.interceptors.response.use(response => {
    if(response.data.code != 0){
        if (response.data.code == 200000401){
            mcVue.$message.error('登录已过期，请重新登录');
            localStorage.clear();
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }
        
        mcVue.$message.error(response.data.msg);
        
        return new Promise(() => {});
    }else{
        return response.data;
    }
    
    
}, function (error) {
    return Promise.reject(error)
})

export default service