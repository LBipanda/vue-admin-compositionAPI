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
                <el-form-item prop="passwords" v-if="menuTab[1].isSelect">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="new-password" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <label>验证码</label>
                    <el-row :gutter="15">
                        <el-col :span="14"><el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input></el-col>
                        <el-col :span="10" ><el-button type="success" @click="getSms()" :disabled="SmsStatus"><span>{{SmsText}}</span></el-button></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" class="w100pc mt-20"><span v-if="menuTab[0].isSelect">登录</span><span v-else>注册</span></el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import sha1 from 'js-sha1'
import { stripscript, validatorEmail, validatorPassword, validatorCode } from "@/utils/validator";
import { ref, reactive, isRef, toRefs, onMounted, computed } from "@vue/composition-api";
import loginApi from '@/api/login'
export default {
    name:'login',
    // setup(props,context){
    setup(props,{ refs , root }){
        // 这里放置vue2.0的data数据、method里的自定义函数、生命周期

        const validateEmail = ((rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if(!validatorEmail(value)){
                callback(new Error('请输入正确的邮箱'));
            }else{
                callback();
            }
        })
        const validatePass = ((rule, value, callback) => {
            ruleForm.password = stripscript(value)
            value = ruleForm.password
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(!validatorPassword(value)){
                callback(new Error('密码错误：请输8到20位数字字母的密码'));
            }else{
                callback();
            }
        })
        const validatePassTwo = ((rule, value, callback) => {
            if(menuTab[0].isSelect){ callback() }
            ruleForm.passwords = stripscript(value)
            value = ruleForm.passwords
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(value !== this.ruleForm.password){
                callback(new Error('密码错误：两次密码不一致'));
            }else{
                callback();
            }
        })
        const validateCode = ((rule, value, callback) => {
            if (!value) {
                return callback(new Error('验证码不能为空'));
            }else if(!validatorCode(value)){
                return callback(new Error('验证码格式错误'));
            }else{
                callback();
            }
        })

        /************************************************** 
        *  声明数据
        */
        // 通过ref声明基础类型数据（ref对象），接受一个内部值并返回一个反应性且可变的ref对象。ref对象具有.value指向内部值的单个属性。通过.value获取值
        const tempAddress = ref("长沙")
        const SmsStatus = ref(false)
        const SmsText = ref("获取验证码")
        const timer = ref(null)
        // console.log(tempAddress.value)
        // 通过reactive方法来声明引用类型数据（反应对象），这相当于2.x的Vue.observable()。
        const menuTab = reactive([
            {text:'登录',isSelect: true},
            {text:'注册',isSelect: false},
        ])
        const ruleForm = reactive({
            username: 'libinnzs@163.com',
            password: 'lb123456',
            passwords: 'lb123456',
            code: ''
        })
        const rules = reactive({
            username: [
                { validator: validateEmail, trigger: 'blur' }
            ],
            password: [
                { validator: validatePass, trigger: 'blur' }
            ],
            // passwords: [
            //     { validator: validatePassTwo, trigger: 'blur' }
            // ],
            // code: [
            //     { validator: validateCode, trigger: 'blur' }
            // ]
        })
        // 通过isRef() 检查值是否是引用对象。返回true或者false
            // console.log(isRef(tempAddress));//值类型
            // console.log(isRef(menuTab));//引用类型

        // toRefs 将反应对象（reactive）转换为普通的ref对象（ref），保证对象解构或扩展运算符时不会丢失原有响应式对象的响应
        // function useFeatureX() {
        //     const state = reactive({
        //         foo: 1,
        //         bar: 2
        //     })
        //     return toRefs(state)
        // }
        // const { foo, bar } = useFeatureX()
        // console.log(foo)
        // console.log(bar.value)

        /**************************************************************
        *  声明函数
        */
        const changeMenu = (item =>{
            menuTab.forEach(res =>{
                if(res.isSelect){
                    res.isSelect = false;
                }
            });
            // ruleForm.code = '';
            SmsText.value = "获取验证码"
            SmsStatus.value = false
            clearInterval(timer.value)
            refs['ruleForm'].resetFields();

            item.isSelect = true;
        })
        // 获取验证码
        const getSms = (() =>{
            SmsStatus.value = true;
            countDown(60)
            setTimeout(() => {
                loginApi.GetSms(ruleForm).then(res => {
                    console.log(res)
                    if(res.data.resCode == '0'){
                        root.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                    }
                }).catch(err => {
                    SmsStatus.value = false
                    SmsText.value = "重新获取验证码"
                    console.log(err)
                })
            },3000)
        })
        // 倒计时
        const countDown = ((tempTime) =>{
            timer.value = setInterval(() => {
                tempTime--;
                SmsText.value = `发送中${tempTime}S`;
                if(tempTime == 0){
                    SmsStatus.value = false;
                    SmsText.value = '再次获取';
                    clearInterval(timer.value)
                }
            },1000)
        })
        // 登录注册
        const submitForm = ((formName) => {
            refs[formName].validate((valid) => {
                if (valid) {
                    menuTab[0].isSelect?login():register()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        })
        const login = () => {
            root.$store.dispatch('appStore/toLogin',ruleForm).then(res => {
                if(res.data.resCode == '0'){
                    // 页面跳转
                    root.$router.push({
                        name: 'console'
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
        const register = ()=> {
            loginApi.Register(ruleForm).then(res => {
                if(res.data.resCode == '0'){
                    root.$message({
                        message: res.message,
                        type: 'success'
                    })
                    changeMenu(menuTab[0])
                    SmsStatus.value = false
                    SmsText.value = "重新获取验证码"
                }
            }).catch(err => {
                console.log(err)
            })
        }
        /**************************************************************
         * 生命周期（挂载完成后）
         */
        onMounted(() => {

        })
        return {
            menuTab,
            SmsStatus,
            SmsText,
            timer,
            ruleForm,
            rules,
            changeMenu,
            getSms,
            submitForm,
            validateEmail,
            validatePass,
            validatePassTwo,
            validateCode
        }
    },
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
