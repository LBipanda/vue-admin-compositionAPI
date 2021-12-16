<!-- 页面 -->
<template>
    <div>
        <el-table :data="data.tableData" border style="width: 100%">
            <!-- 多选框 -->
            <el-table-column v-if="data.tableConfig.selection" type="selection" width="55"></el-table-column>
            <!-- solt -->
            <template v-for="(item,index) in data.tableConfig.tHead">
                <el-table-column :key="index" :prop="item.field" :label="item.label" v-if="item.columnType == 'slot'" width="180">
                    <template slot-scope="scope">
                        <!-- <slot></slot> //匿名插槽 -->
                        <!-- <slot name="status"></slot> 具名插槽 -->
                        <slot :name="item.slotName" :data="scope.row"></slot> 
                    </template>
                </el-table-column>
                <!-- 表格数据 -->
                <el-table-column v-else :key="index" :prop="item.field" :label="item.label" width="180"></el-table-column>
            </template>
        </el-table>
        <el-pagination
            v-if="data.tableConfig.pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageData.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.total">
        </el-pagination>
    </div>
    
</template>

<script>
import {ref, reactive, onMounted, watch} from '@vue/composition-api';
import tableData from './tableData'
import { paginationHook } from './paginationHook'
export default {
    props:{
        config: {
            type: Object,
            default: () => {}
        }
    },
    setup( props,{ root,ref }){
        //获取table数据
        let { resultData, getTableData } = tableData.getTableData()
        // 页码
        let { pageData, totalCount, handleSizeChange, handleCurrentChange } = paginationHook()
        // 组件变量
        const data = reactive({
            tableConfig: {
                //表头
                tHead: [],
                //多选框
                selection: false,
                // 分页
                pagination: false,
                // 请求参数
                requestData: {},
            },
            // 表格数据
            tableData: []
        }) 
        /**
         * watch监听
         */
        // watch(() => resultData.data,(newValue,oldValue) => data.tableData = newValue)  //监听一个对象
        //监听多个对象watch([])括号里面用数组括号
        // 数据渲染的监听
        watch([
            () => resultData.total,
            () => resultData.data
        ],([total,resultsData]) => {
            data.tableData = resultsData
            totalCount(total)
        }
        )

        // 页码的监听
        watch([
            () => pageData.pageSize,
            () => pageData.currentPage
        ],([pageSize,currentPage]) => {
            let requestData = data.tableConfig.requestData
            if(requestData.data){
                requestData.data.pageNumber = currentPage
                requestData.data.pageSize = pageSize
                getTableData(data.tableConfig.requestData)
            }
        }
        )

        /**
         * 挂载
         */
        onMounted(() => {
            initTable()
            getTableData(data.tableConfig.requestData)
        })
        /**
         * vue3.0 业务逻辑的拆分与组合
         */

        /**
         * 方法 methods
         */
        // const getTableData = () => {
        //     console.log(data.tableConfig.requestUrl)
        //     let params ={
        //         url: data.tableConfig.requestUrl,
        //         method: "post",
        //         data:{
        //             username: "",
        //             truename: "",
        //             phone: "",
        //             pageNumber: 1,
        //             pageSize: 10,
        //         }
        //     }
        //     commonApi.GetTable(params).then(res => {
        //         console.log(res)
        //     })
        // }
        //初始化表格的配置
        const initTable = () =>{
            let tempConfig = props.config
            let keys = Object.keys(data.tableConfig);
            for(let key in tempConfig){
                if(keys.includes(key)){ //判断属性是否相同
                    data.tableConfig[key] = tempConfig[key]
                }
            }
        }
        // 刷新数据
        const refreshData = () => {
            getTableData(data.tableConfig.requestData);
        }
        // 带参数刷新数据
        const paramsLoadData = (params) => {
            let requestData = Object.assign({}, params, {
                pageNumber: 1,
                pageSize: 10
            })
            console.log(requestData)
            data.tableConfig.requestData.data = requestData
            handleCurrentChange(1)
            getTableData(data.tableConfig.requestData);
        }
        return {
            data,
            //表格数据
            resultData,
            //页码
            pageData, handleSizeChange, handleCurrentChange, refreshData, paramsLoadData
        }
    }
}
</script>

<style lang='scss'>

</style>
