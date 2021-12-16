import Vue from "vue";
import store from "../store/index.js";
// 自定义指令
Vue.directive("btnPerm",{
    // 父级未渲染
    bind:function(el, bingind, vnode){
        // el 绑定的对象 DOM，原生JS处理
        // 操作DOM
        if(bingind.def.hasBtnPerm(bingind.value)) {
            console.log("btnPerm")
            el.className = el.className + " dsb";
        }
    },
    // 操作父节点
    inserted:function(el){},
    update:function(){},
    componentUpdated:function(){},
    unbind:function(){},
    hasBtnPerm:function(permission){
        const button = store.getters["appStore/buttons"]; // 请求到的数据权限
        const roles = store.getters["appStore/roles"]; // 获取角色 
        // 如果是超级管理员
        // if(roles.includes("admin")) { return true }
        return button.indexOf(permission) != -1; //
    }
})