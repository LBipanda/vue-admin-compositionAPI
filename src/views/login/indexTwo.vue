<!-- 页面 -->
<template>
    <div id="login">
        <div class="login-main">
            <ul class="header">
                <!-- <li :class="item.isSelect?'current':''" v-for="(item,index) in menuTab" :key="index">{{item.text}}</li> -->
                <li :class="{current:item.isSelect}" v-for="(item,index) in menuTab" :key="index" @click="changeMenu(item)">{{item.text}}</li>
            </ul>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-body" >
                <el-form-item prop="username">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="new-password"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="new-password" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="passwords" v-if="menuTab[1 ].isSelect">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="new-password" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <label>验证码</label>
                    <el-row :gutter="15">
                        <el-col :span="14"><el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input></el-col>
                        <el-col :span="10" ><el-button type="success">获取验证码</el-button></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="w100pc mt-20">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { stripscript, validatorEmail, validatorPassword, validatorCode } from "@/utils/validator"
export default {
    name:'login',
    data () {
        var username = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if(!validatorEmail(value)){
                callback(new Error('请输入正确的邮箱'));
            }else{
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            this.ruleForm.password = stripscript(value)
            value = this.ruleForm.password
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(!validatorPassword(value)){
                callback(new Error('密码错误：请输8到20位数字字母的密码'));
            }else{
                callback();
            }
        };
        var validatePassTwo = (rule, value, callback) => {
            this.ruleForm.passwords = stripscript(value)
            value = this.ruleForm.passwords
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(value !== this.ruleForm.password){
                callback(new Error('密码错误：两次密码不一致'));
            }else{
                callback();
            }
        };
        var checkCode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }else if(!validatorCode(value)){
                return callback(new Error('验证码格式错误'));
            }else{
                callback();
            }
            
        };
        return {
            menuTab:[
                {text:'登录',isSelect: true},
                {text:'注册',isSelect: false},
            ],
            ruleForm: {
                username: '',
                password: '',
                passwords: '',
                code: ''
                },
            rules: {
                username: [
                    { validator: username, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwords: [
                    { validator: validatePassTwo, trigger: 'blur' }
                ],
                code: [
                    { validator: checkCode, trigger: 'blur' }
                ]
            }
            
        }
    },
    methods:{
        changeMenu(item){
            this.menuTab.forEach(res =>{
                if(res.isSelect){
                    res.isSelect = false;
                }
            });
            item.isSelect = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
#login{
    height: 100vh;
    background: #36485D;
}
.login-main{
    width: 300px;
    margin: auto;
}
.header{
    display: flex;
    justify-content: space-around ;
    padding-top: 30%;
}

.header > li{
    height: 40px;
    width: 30%;
    line-height: 40px;
    text-align: center;
    color: white;
}
.current{
    background: rgba(0,0,0,0.2);
}
.login-body{
    margin-top: 20px;
    label{
        color: #ffffff;
        display: block;
        margin-bottom: -8px;
        margin-top: 15px;
    }
}
</style>
