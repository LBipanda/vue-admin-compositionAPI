import service from '@/utils/request'

export default {
/**
 * 获取验证码
 */
GetSms(data){
    return service.request({
        method: 'post',
        url: '/getSms/',
        data: data
    })
},
/**
 * 注册
 */
Register(data){
    return service.request({
        method: 'post',
        url: '/register/',
        data: data
    })
},
/**
 * 登录
 */
Login(data){
    return service.request({
        method: 'post',
        url: '/login/',
        data: data
    })
},
/**
 * 获取用户角色
 */
GetUserRole(data = {}){
    return service.request({
        method: 'post',
        url: '/userRole/',
        data: data
    })
},
}