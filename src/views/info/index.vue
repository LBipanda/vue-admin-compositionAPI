<!-- 页面 -->
<template>
    <div>
        <el-row :gutter="15" class="flex">
            <el-col :span="4" class="flex">
                <label for="">类型:</label>
                    <el-select v-model="cateGoryValue" placeholder="请选择">
                        <el-option
                            v-for="item in options.category"
                            :key="item.id"
                            :label="item.category_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
            </el-col>
            <el-col :span="7" class="flex">
                <label for="">日期:</label>
                    <el-date-picker
                        v-model="dataValue"
                        type="datetimerange"
                        align="right"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00', '08:00:00']">
                    </el-date-picker>
            </el-col>
            <el-col :span="3" class="flex">
                <label for="">关键字:</label>
                <el-select v-model="keyValue" placeholder="请选择" style='width:80px'>
                    <el-option
                    v-for="item in options.configOption.init"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6" class="flex jc-sb">
                <el-input v-model="serchValue" placeholder="请输入内容"></el-input>
                <el-button type="danger" @click="search('search')" v-btnPerm="'info.edit'" class="dsn" >搜索</el-button>
            </el-col>
            <el-col :span="2" style="float:left">
                <el-button type="primary" class="ml-10" @click="addInfoStatus = true" v-if="btnPerm('info.edit')">新增</el-button>
            </el-col>
        </el-row>  
        <!-- 表格  -->
        <el-table :data="tableData.list" border style="width: 98%" class="mt-30" v-loading="tableLoading">
            <el-table-column type="selection" width="45"> </el-table-column>
            <el-table-column prop="title" label="标题" width="180"> </el-table-column>
            <el-table-column prop="categoryId" label="类别" width="180" :formatter="formatCategory"> </el-table-column>
            <el-table-column  prop="createDate" label="日期" width="180" :formatter="formatDate"> </el-table-column>
            <el-table-column prop="user" label="管理人"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="editInfo(scope.row.id)">编辑</el-button>
                    <!-- <router-link to="/infoCategoryDetail/11/22"> -->
                    <!-- <router-link :to="{ path: `/infoCategoryDetail/${scope.row.id}/${scope.row.title}` }"> -->
                        <!-- <el-button size="mini" type="success" @click="editInfo(scope.row.id)">编辑详情</el-button> -->
                    <!-- </router-link> -->
                        <el-button size="mini" type="success" @click="infoDetail(scope.row)">编辑详情</el-button>
                    <!-- @click="handleEdit(scope.$index, scope.row)" -->
                    <el-button size="mini" type="danger" @click="deleteInfo(scope.row)">删除</el-button>
                    <!-- @click="handleDelete(scope.$index, scope.row)" -->
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row>
            <el-col :span="12">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total">
                </el-pagination>
            </el-col>
        </el-row>

        <!-- 新增弹窗 -->
        <AddInfo :dialogStatus.sync='addInfoStatus' :categoryList="options.category" />
        <!-- 编辑弹窗 -->
        <EditInfo :dialogStatus.sync='editInfoStatus' :id="infoId" :categoryList="options.category" @getListInfo="search('search')" />
        <!-- <el-dialog
            title="提示"
            :visible.sync="addInfoStatus"
            width="30%"
            center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addInfoStatus = false">取 消</el-button>
                <el-button type="primary" @click="addInfoStatus = false">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import {ref, reactive, onMounted, watch} from '@vue/composition-api';
import AddInfo from './dialog/addInfo'
import EditInfo from './dialog/editInfo'
import { global } from '@/utils/global_V3.0'
import infoApi from '@/api/info'
import formatTime from '@/utils/common'
export default {
    name: 'infoIndex',
    components:{
        AddInfo,
        EditInfo
    },
    setup(props,{refs, root}){
        // vue3.0全局方法
        const { confirm } = global()
        // 基础数据
        const cateGoryValue = ref('');
        const keyValue = ref('');
        const dataValue = ref('');
        const serchValue = ref('');
        const addInfoStatus = ref(false);
        const editInfoStatus = ref(false);
        const infoId = ref('')
        const tableLoading = ref(false)
        // 对象数据
        const tableData = reactive({
            list: [],
            total: 0,
            pageSize: 10, // 页码
            nowPage: 1
        })
        const options = reactive({
            category: [], //分类
            configOption: { //关键字
                init: ["id", "title"]
            }
        });
        // 方法
        const handleSizeChange = ((value) => {
            tableData.pageSize = value;
            search()
        })
        const handleCurrentChange = ((value) => {
            tableData.nowPage = value;
            search()
        })
        //编辑
        const editInfo = (item)=>{
            infoId.value = item
            editInfoStatus.value = true
        }
        // 删除
        const deleteInfo = ((item) => {
            // vue3.0全局方法封装
            // confirm({
            //     content:'确认删除当前信息，确认后无法恢复!!',
            //     fn: VueconfireDelete
            //     })
            
            // vue2.0全局方法
            root.Vueconfirm({
                content:'确认删除当前信息，确认后无法恢复!!',
                then: VueconfireDelete,
                data: item.id
                })
        })

        const VueconfireDelete = ((item) => {
            infoApi.deleteInfo({id: item}).then(res => {
                if(res.data.resCode == '0'){
                    root.$message({
                        type: 'success',
                        message: res.data.message
                    });
                    getListInfo()
                }
            })
        })
        
        const getCategory = (() => {
            // infoApi.GetCategory().then(res => {
            //     console.log(res)
            //     if(res.data.resCode == '0'){
            //         options.category = res.data.data.data
            //         // console.log(categoryList.item)
            //     }
            // })

            // vuex
            // root.$store.dispatch('commonStore/getInfoCategory','').then(res => {
            //     if(res.data.resCode == '0'){
            //         options.category = res.data.data.data
            //     }
            // }).catch(err => {
            //     root.$message({
            //         type: 'error',
            //         message: err.data.message
            //     });   
            // })
            //获取分类有子级vuex
            root.$store.dispatch('commonStore/getCategoryAll','').then(res => {
                if(res.data.resCode == '0'){
                    options.category = res.data.data
                }
            }).catch(err => {
                root.$message({
                    type: 'error',
                    message: err.data.message
                });   
            })
        }) 
        //搜索
        const search = ((item) => {
            if(item == 'search'){
                tableData.nowPage = 1,
                tableData.pageSize = 10
            }
            let data ={
                categoryId: cateGoryValue.value,
                startTiem: dataValue.value[0],
                endTime: dataValue.value[1],
                title: serchValue.value,
                id: keyValue.value,
                pageNumber: tableData.nowPage,
                pageSize: tableData.pageSize
            }
            getListInfo(data)
        })
        //获取表格数据
        const getListInfo = (params) => {
            tableLoading.value = true
            infoApi.GetListInfo(params).then(res => {
                tableLoading.value = false
                let data = res.data.data
                if(res.data.resCode == '0'){
                    tableData.list = data.data
                    tableData.total = data.total
                }else{
                    root.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            }).catch(err => {
                tableLoading.value = false
            })
        }
        //跳转到详情页面
        const infoDetail = (item) => {
            root.$router.push({
                path: `/infoCategoryDetail/${item.id}/${item.title}`,
            })
            // root.$router.push({
            //     name: 'infoCategoryDetail',
            //     query: item
            // })
        }

        // 饿了么UIformatter日期格式
        const formatDate = ((row, column, cellValue, index) => {
            return formatTime.timestampToTime(row.createDate)
        })
        const formatCategory = ((row, column, cellValue, index) => {
            let tempid = row.categoryId
            let tempCategory = options.category.filter(res => res.id == tempid)[0]
            return tempCategory?tempCategory.category_name:''
        })
        /**
         * 生命周期
         */
        onMounted(() => {
            getCategory()
            search()
        })
        return {
            // 数据
            cateGoryValue,
            dataValue,
            keyValue,
            serchValue,
            tableData,
            options,
            addInfoStatus,
            editInfoStatus,
            infoId,
            tableLoading,
            // 方法
            handleSizeChange,
            handleCurrentChange,
            editInfo,
            infoDetail,
            deleteInfo,
            VueconfireDelete,
            search,
            formatDate,
            formatCategory,
        }
    }
}
</script>

<style class="scss" scoped>
label{
    width: 80px;
    line-height: 40px;
}
.dsn{
    display: none;
}
.dsb{
    display: block;
}
</style>
