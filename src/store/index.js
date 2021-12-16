import Vue from "vue";
import Vuex from "vuex";

// import appStore from './modules/appStore';
// import loginStore from './modules/loginStore';
// import commonStore from './modules/commonStore';
// import infoCategoryDetailStore from "./modules/infoCategoryDetailStore"
import modules from './modules';

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    ...modules
  },
  // 存储所有的 state
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    })
  ]

  //指定的state存储
  // plugins: [
  //   createPersistedState({
  //     storage: window.localStorage,
  //     reducer(val) {
  //       return {
  //         // 只储存state中的值
          
  //       };
  //     }
  //   })
  // ]
});
  
