import router from "./index";
import store from "../store/index";
import app from "@/utils/app";

const whiteRouter = ['/login'];//indexOf方法，判断数组中是否有某个对象
//全局路由守卫
export default router.beforeEach((to, from, next) => {
    //to and from are Route Object,next() must be called to resolve the hook}
    if(app.getToken()){
        if(to.path === '/login'){
            app.removeToken();
            app.removeUserName();
            store.commit("appStore/SET_TOKEN", '');
            store.commit("appStore/SET_USERNAME", '');
        }else{
            //获取用户角色
            //动态分配路由
            /**
             * 1、什么时候处理动态路由(登录的时候处理)
             * 2、以什么条件处理（登录时获取用户的角色来分配路由，通过addRoutes()方法()里面放数组）
             */
            console.log(store.getters['appStore/roles'])
            if(store.getters['appStore/roles'].length === 0) {//判断vuex里面的roles数组是不是空数组，为空数组的话，需要请求登录账号的角色
                store.dispatch("permissionStore/getUserRole").then(res => {
                    console.log("role",res)
                    let role = res.role;
                    let button = res.button;
                    let btnPerm = res.btnPerm;
                    store.commit("appStore/SET_ROLES", role);
                    store.commit("appStore/SET_BUTTONS", button);
                    // 存储角色
                    store.dispatch('permissionStore/createRolerouter', role).then(response => {
                        let addRouters = store.getters['permissionStore/addRouters'];
                        // 路由更新
                        router.options.routes = router.options.routes.concat(addRouters);
                        // 添加动态路由
                        router.addRoutes(addRouters)
                        next({ ...to, replace: true});
                        // es6扩展运算符，防止内容发生变化的情况
                        // 不被记录历史记录
                    })
                })
            }else{
                next();
            }
        }
    }else{
        console.log(whiteRouter.indexOf(to.path))
        if(whiteRouter.indexOf(to.path) !== -1){
            next();
        }else{
            next('/login');
        }
    }
})