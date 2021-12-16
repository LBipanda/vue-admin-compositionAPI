<!-- 页面 -->
<template>
    <div>
        <el-row>
            <el-col :span="20">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="关键字：">
                        <el-select v-model="configTable.requestData.data.option" placeholder="请选择">
                        <el-option v-for="(item,index) in formInline.optionList" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input v-model="configTable.requestData.data.key_word" placeholder="请输入搜索关键字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="search()">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="4"><el-button type="danger" @click="componentsCtatus.addStatus = !componentsCtatus.addStatus;componentsCtatus.editData={}">新增</el-button></el-col>
        </el-row>
        <UserTable :config="configTable" ref="userTable">
            <template v-slot:status="slotData">
                <el-switch active-color="#13ce66" v-model="slotData.data.status" @change="changeSatus(slotData.data)" active-value="2"  inactive-value="1" inactive-color="#ff4949"> </el-switch>
            </template>
            <template v-slot:operation="slotData">
                <el-button size="mini" type="success" @click="editUser(slotData.data)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteUser(slotData.data)">删除</el-button>
            </template>
        </UserTable>
        <AddUser :dialogStatus.sync="componentsCtatus.addStatus" :editData="componentsCtatus.editData" @refreshTabelData="refreshData"></AddUser>
    </div>
</template>

<script>
import {ref, reactive, onMounted, watch} from '@vue/composition-api';
import UserTable from '@c/Table/index';
import AddUser from "./dialog/addUser"
import requestUrl from '@/api/requestUrl'
import userApi from "@/api/user"
export default {
    name: 'userList',
    components: {
        UserTable,AddUser
    },
    setup(props,{refs, root}){    

        const componentsCtatus = reactive({
            addStatus: false,
            editData: {}
        })
        const configTable = reactive({
            selection: true,
            pagination: true,
            requestData: {
                url: requestUrl.userTable,
                methods: "post",
                data: {
                    key_word: '',
                    option: '',
                    pageNumber: 1,
                    pageSize: 10
                }
            },
            tHead: [
                { label: "邮箱/用户名称", field: "username", },
                { label: "正式姓名", field: "truename", },
                { label: "手机号", field: "phone", },
                { label: "地区", field: "", },//region
                { label: "角色", field: "role", },
                { label: "禁启用状态", field: "status", columnType: "slot",slotName: "status" },
                { label: "操作", columnType: "slot",slotName: "operation" },
            ]
        })
        const formInline = reactive({
            
            optionList: [
                { value: "username", label: "邮箱/用户名称" },
                { value: "phone", label: "手机号" },
            ],
            // list: [1,2,3,4,5,6,7,8,9]
            })
        onMounted(() => {
            // console.log(formInline.list)
            // let tempTotal = formInline.list.reduce((total,item) => {
            //     return total+item
            // },0)
            // console.log(tempTotal)
        })
        /**
         * 方法
         */
        const search = () => {
            refs.userTable.paramsLoadData(configTable.requestData.data)
        }
        const editUser = (val) => {
            console.log(val)
            componentsCtatus.addStatus = true
            componentsCtatus.editData = val
        }
        const deleteUser = (val) => {
            console.log(val)
            userApi.DeleteUser({id:[val.id]}).then(res => {
                console.log(res)
                refreshData()
            })
        }
        const changeSatus = (val) => {
            console.log(val)
            let params = {
                id: val.id,
                status: val.status
            }
            userApi.ActivesUser(params).then(res => {
                console.log(res)
                refreshData()
            })
        }
        const refreshData = () => {
            refs.userTable.refreshData()
        }
        return {
            componentsCtatus,formInline,configTable,
            search,editUser,deleteUser,refreshData,changeSatus
        }
    }
}
</script>

<style lang='scss' scoped>

</style>
