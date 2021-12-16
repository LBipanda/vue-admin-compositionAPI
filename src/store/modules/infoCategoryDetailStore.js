import infoApi from '@/api/info';

export default {
    namespaced: true,
    state: {
        id: "",
        title: ""
    },
    getters:{},
    mutations: {
        SET_ID(state,value){
            state.id = value
            console.log(state.id)
        },
        SET_TITLE(state,value){
            state.title = value
            console.log(state.title)
        },
    },
    actions: {
    
    }
}