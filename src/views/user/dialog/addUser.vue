<!-- 页面 -->
<template>
    <el-dialog
        title="新增"
        :visible.sync="data.dialogState"
        width="50%"
        :modal-append-to-body='false'
        :before-close="close"
        @open="openDialog"
        center>
        <el-form :model="data.form" ref="form" label-width="90px">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="data.form.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="truename">
                <el-input v-model="data.form.truename" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                 <el-input type="password" v-model="data.form.password" placeholder="请输入6~20数字+字母"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
                <el-input v-model="data.form.phone" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="地区：" prop="cityPickerData">
                <AddressPicker :cityPickerData.sync="data.form.cityPickerData"> </AddressPicker>
            </el-form-item>
            <el-form-item label="是否启用：" prop="status">
                <el-radio-group v-model="data.form.status">
                    <el-radio :label="1">禁用</el-radio>
                    <el-radio :label="2">启用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="角色：" prop="role">
                <el-checkbox-group v-model="data.form.role">
                    <el-checkbox :label="item.role" v-for="(item,index) in data.roleList" :key="index">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="按钮：" prop="btnPerm">
                <template v-if="data.btnPerm.length > 0">
                    <div v-for="(item,index) in data.btnPerm" :key="index">
                        <h4>{{ item.name }}</h4>
                        <template v-if="item.perm">
                            <el-checkbox-group v-model="data.form.btnPerm">
                                <el-checkbox v-for="(buttons,index) in item.perm" :key="index" :label="buttons.value">{{buttons.name}}</el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </div>
                </template>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="danger" @click="addInfo()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {ref, reactive, onMounted, watch} from '@vue/composition-api';
import infoAPi from "@/api/info"
import AddressPicker from "@c/addressPicker"
import userApi from "@/api/user"
export default {
    props: {
        dialogStatus: {
            type: Boolean,
            default: false
        },
        editData: {
            type: Object,
            default: () => {}
        },
    },
    components: {
        AddressPicker
    },
    setup(props,{ refs, root, emit }){
        const data = reactive({
            dialogState: false,
            formLabelWidth: '80px',
            form: {
                username: '',
                truename: '',
                // password: '',
                phone: '',
                status: 2,
                cityPickerData: {},
                role: [],
                btnPerm: [],
            },
            category: [],
            roleList: [],
            btnPerm: [],
            
        })
        // watch
        watch(() => data.dialogState = props.dialogStatus )
        // 方法
        const close = () => {
            emit('update:dialogStatus',false)
        };
        const addInfo = () => {
            data.form.region = JSON.stringify(data.form.cityPickerData)
            data.form.role = data.form.role.constructor === Array?data.form.role.join(","):data.form.role
            data.form.btnPerm = data.form.btnPerm.constructor === Array?data.form.btnPerm.join(","):data.form.btnPerm
            if(data.form.id){
                userApi.EditUser(data.form).then(res => {
                    refs.form.resetFields();
                    emit('update:dialogStatus',false)
                    emit('refreshTabelData');
                })
            }else{
                userApi.AddUser(data.form).then(res => {
                    refs.form.resetFields();
                    emit('update:dialogStatus',false)
                    emit('refreshTabelData');
                })
            }
            
        }
        const openDialog = () => {
            getRole() //获取用户角色
            // 初始值处理
            let editData = props.editData;
            if(editData.id) { // 编辑
                editData.role = editData.role ? editData.role.split(',') : []; // 数组
                editData.btnPerm = editData.btnPerm ? editData.btnPerm.split(',') : []; // 数组
                editData.status = editData.status - 0
                // 循环JSON对象
                for(let key in editData) {
                    data.form[key] = editData[key]
                }
                data.form.role = editData.role
            }else{ // 添加
                data.form = {
                    username: '',
                    truename: '',
                    phone: '',
                    password: '',
                    status: 1,
                    cityPickerData: {},
                    role: [],
                    btnPerm: []
                }
            }
            
        }
        onMounted(() => {
            
        })
        //获取角色列表和按钮权限列表
        const getRole = () => {
            userApi.GetRole().then(res => {
                if(res.data.resCode == '0'){
                    data.roleList = res.data.data
                }
            })
            userApi.GetPermButton().then(res => {
                data.btnPerm =  res.data.data
            })
        }
        return {
            data,
            // 方法
            close,
            openDialog,
            addInfo
        }
    }
}
</script>

<style lang='scss' scoped>

</style>
