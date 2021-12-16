import cookie from "js-cookie";

export default {
    // adminToken: 'admin-token',
    getToken(){
        return cookie.get('admin_token')
    },
    setToken(token){
        cookie.set('admin_token',token)
    },
    removeToken(token){
        cookie.remove('admin_token')
    },
    getUserName(){
        return cookie.get('username')
    },
    setUserName(username){
        cookie.set('username',username)
    },
    removeUserName(){
        cookie.remove('username')
    }
}