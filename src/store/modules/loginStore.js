
import loginApi from '@/api/login';

export default {
    namespaced: true,
    state: {
        collapse: false,
    },
    getters:{},
    mutations: {
    SET_COLLAPSE(state,value){
        console.log('bbbbbbbbbbbbb');
        
        state.collapse = !state.collapse
    }
    },
    actions: {
    toLogin(){
        return new Promise((resolve,reject) => {
        
        })
    },
    aaa({commit},value){
        return new Promise((resolve,reject) => {
        loginApi[value.ApiNmae](value.params).then(res => {
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
        })
    }

    },
}