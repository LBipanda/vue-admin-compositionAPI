import infoApi from '@/api/info';

export default {
    namespaced: true,
    state: {
        qiniuUrl: "http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/"
    },
    getters:{
        qiniuUrl: state => state.qiniuUrl
    },
    mutations: {
        SET_COLLAPSE(state,value){
            console.log('bbbbbbbbbbbbb');
            
            state.collapse = !state.collapse
        }
    },
    actions: {
        getInfoCategory(){
            return new Promise((resolve,reject) => {
                infoApi.GetCategory().then(res => {
                    if(res.data.resCode == '0'){
                        resolve(res)
                    }else{
                        reject(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getCategoryAll(){
            return new Promise((resolve,reject) => {
                infoApi.GetCategoryAll().then(res => {
                    if(res.data.resCode == '0'){
                        resolve(res)
                    }else{
                        reject(res)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
    },
}