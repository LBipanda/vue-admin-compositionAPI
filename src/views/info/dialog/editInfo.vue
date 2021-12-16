<!-- 编辑页面 -->
<template>
    <el-dialog
        title="编辑"
        :visible.sync="data.dialogState"
        width="40%"
        :modal-append-to-body='false'
        :before-close="close"
        @open="openDialog"
        center>
        <el-form :model="data.form" ref="clearForm">
            <el-form-item label="类别" :label-width="data.formLabelWidth" prop="categoryId">
                <el-select v-model="data.form.categoryId" placeholder="请选择活动区域">
                    <el-option v-for="(item,index) in data.category" :key="index" :label="item.category_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" :label-width="data.formLabelWidth" prop="title">
                <el-input v-model="data.form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="概况" :label-width="data.formLabelWidth" prop="content">
                <el-input v-model="data.form.content" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="danger" @click="editInfo()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {ref, reactive, watch} from '@vue/composition-api'
import infoAPi from "@/api/info"
export default {
    props: {
        dialogStatus: {
            type: Boolean,
            default: false
        },
        categoryList: {
            type: Array,
            default: () => []
        },
        id: {
            type: String,
            default: ''
        }
    },
    // watch: {
    //     dialogStatus: {
    //         handler(newValue,oldValue){
    //             console.log(newValue)
    //             console.log(oldValue)
    //             this.dialogState =  newValue
    //         }
    //     }
    // },
    // data(){
    //     return {
    //         dialogState: true,
    //         form: {
    //             name: '',
    //             category: '',
    //             date1: '',
    //             date2: '',
    //             delivery: false,
    //             type: [],
    //             resource: '',
    //             desc: ''
    //         },
    //         formLabelWidth: '80px'
    //     }
    // },
    // methods: {
    //     close(){
    //         this.$emit('update:dialogStatus',false)
    //         // this.$emit('close',false)
    //     },
    // },
    setup(props,{ refs, root, emit }){
        const data = reactive({
            dialogState: false,
            formLabelWidth: '80px',
            form: {
                categoryId: '',
                title: '',
                content: '',
                id: ''
            },
            category: []
        })
        // watch
        watch(() => data.dialogState = props.dialogStatus )
        const openDialog = (() => {
            data.category = props.categoryList
            getInfo(props.id)
        })
        // 方法
        //根据id获取信息
        const getInfo = (editId) => {
            let tempData = {
                id: editId,
                pageNumber: 1,
                pageSize: 1
            }
            infoAPi.GetListInfo(tempData).then(res => {
                if(res.data.resCode == '0'){
                    let tempRes = res.data.data.data[0]
                    data.form.categoryId = tempRes.categoryId
                    data.form.title = tempRes.title
                    data.form.content = tempRes.content
                    data.form.id = tempRes.id
                }else{
                    root.$message({
                    type: 'error',
                    message: res.data.message
                    });  
                    close()
                }
            })
        }
        const editInfo = () => {
            infoAPi.EditInfo(data.form).then(res => {
                if(res.data.resCode == '0'){
                    root.$message({
                        type: 'success',
                        message: res.data.message
                    })
                    emit('getListInfo')
                    close()
                }
            })
        }
        //关闭模态框
        const close = (() => {
            refs.clearForm.resetFields();
            // data.form.categoryId = ''
            // data.form.title = ''
            // data.form.content = ''
            emit('update:dialogStatus',false)
        });

        return {
            data,
            // 方法
            close,
            openDialog,
            editInfo
        }
    }
}
</script>

<style lang='scss' scoped>

</style>