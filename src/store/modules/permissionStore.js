import loginApi from '@/api/login';
import { defaultRouterMap, asyncRouterMap } from "@/router"

function hasPremission(roles, router){
    if(router.meta && router.meta.role) {
        return roles.some(item => router.meta.role.indexOf(item) >= 0)
    }
}
export default {
    namespaced: true,
    state: {
        addRouters: [],  // 匹配的
    },
    getters:{
        addRouters: state => state.addRouters
    },
    mutations: {
        SET_ROUTER(state, router) {
            state.addRouters = router
            // state.addRouters = defaultRouterMap.concat(router)
        }
    },
    actions: {
        //获取角色
        getUserRole({commit},value){
            return new Promise((resolve,reject) => {
                loginApi.GetUserRole().then(res => {
                    resolve(res.data.data)
                }).catch(err =>{
                    reject(err)
                })
            })
        },
        // 创建动态路由
        createRolerouter({commit},data){
            return new Promise((resolve,reject) => {
                let role = data;
                // 超管的状态
                let addRouters = []
                if(role.includes('admin')) {
                    addRouters = asyncRouterMap
                }else{ // 普通管理员
                    addRouters = asyncRouterMap.filter(item => {
                        if(hasPremission(role, item)) {
                            // 优先判断
                            if(item.children && item.children.length > 0) {
                                item.children = item.children.filter(child => {
                                    if(hasPremission(role, child)){
                                        return child;
                                    }
                                })
                                return item;
                            }
                            return item;
                        }
                    })
                }
                 // 更新路由
                commit('SET_ROUTER', addRouters);
                resolve()
            })
        }
    },
}