<!-- 页面 -->
<template>
    <el-dialog
        title="新增"
        :visible.sync="data.dialogState"
        width="40%"
        :modal-append-to-body='false'
        :before-close="close"
        @open="openDialog"
        center>
        <el-form :model="data.form" ref="form">
            <el-form-item label="类别" :label-width="data.formLabelWidth">
                <el-select v-model="data.form.categoryId" placeholder="请选择活动区域">
                    <el-option v-for="(item,index) in data.category" :key="index" :label="item.category_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" :label-width="data.formLabelWidth">
                <el-input v-model="data.form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="概况" :label-width="data.formLabelWidth">
                <el-input v-model="data.form.content" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="danger" @click="addInfo()">确 定</el-button>
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
                content: ''
            },
            category: []
        })
        // watch
        watch(() => data.dialogState = props.dialogStatus )
        const openDialog = (() => {
            data.category = props.categoryList
        })
        // 方法
        const close = (() => {
            data.form.categoryId = ''
            data.form.title = ''
            data.form.content = ''
            emit('update:dialogStatus',false)
        });
        const addInfo = (() => {
            infoAPi.AddInfo(data.form).then(res => {
                console.log(res)
                if(res.data.resCode == '0'){
                    root.$message({
                        type: 'success',
                        message: res.data.message
                    });  
                    close()
                    // root.$parent.getListInfo();
                }else{
                    root.$message({
                        type: 'error',
                        message: res.data.message
                    });  
                }
            })
        })
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
