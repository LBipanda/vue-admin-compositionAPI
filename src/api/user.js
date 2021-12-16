import service from '@/utils/request'

export default {
/**
 * 获取系统
 */
GetSystem(data = {}){
    return service.request({
        method: 'post',
        url: '/system/',
        data: data
    })
},
/**
 * 获取角色
 */
GetRole(data = {}){
    return service.request({
        method: 'post',
        url: '/role/',
        data: data
    })
},
/**
 * 获取按钮权限
 */
GetPermButton(data = {}){
    return service.request({
        method: "post",
        url: "/permButton/",
        data
    })
},
/**
 * 用户添加
 */
AddUser(data){
    return service.request({
        method: 'post',
        url: '/user/add/',
        data: data
    })
},
/**
 * 用户编辑
 */
EditUser(data){
    return service.request({
        method: 'post',
        url: '/user/edit/',
        data: data
    })
},
/**
 * 用户删除
 */
DeleteUser(data){
    return service.request({
        method: 'post',
        url: '/user/delete/',
        data: data
    })
},
/**A
 * 用户禁启用
 */
ActivesUser(data){
    return service.request({
        method: 'post',
        url: '/user/actives/',
        data: data
    })
},

}