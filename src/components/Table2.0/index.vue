<!-- 页面 -->
<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <!-- 多选框 -->
            <el-table-column v-if="tableConfig.selection" type="selection" width="55"></el-table-column>
            <!-- solt -->
            <template v-for="(item,index) in tableConfig.tHead">
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
            v-if="tableConfig.pagination"
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
import tableData from '@/mixins/tableData'
import pageData from '@/mixins/paginationHook'
export default {
    props:{
        config: {
            type: Object,
            default: () => {}
        }
    },
    mixins: [ tableData, pageData, ],
    data(){
        return{
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
        }
    },
    beforeMount(){
        this.initTable()
    },
    methods: {
         //初始化表格的配置
        initTable(){
            let tempConfig = this.config
            let keys = Object.keys(this.tableConfig);
            for(let key in tempConfig){
                if(keys.includes(key)){ //判断属性是否相同
                    this.tableConfig[key] = tempConfig[key]
                }
            }
        }
    }
}
</script>

<style lang='scss'>

</style>
