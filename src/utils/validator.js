/*
*  过滤特殊字符
*/
export function stripscript(s){
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/*
*  验证邮箱
*/
export function validatorEmail(value){
    let emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return emailReg.test(value) ? true : false
}
/*
*  验证密码
*/
export function validatorPassword(value){
    let passReg =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
    return passReg.test(value) ? true : false
}
/*
*  验证 验密码
*/
export function validatorCode(value){
    let codeReg = /^[0-9]{6}$/
    return codeReg.test(value) ? true : false
}