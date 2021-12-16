<!-- 信息详情页面 -->
<template>
    <div>
        <el-form :model="form" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="信息分类：" prop="name">
                    <el-select v-model="form.categoryId" placeholder="请选择">
                        <el-option
                            v-for="item in data.categoryList"
                            :key="item.id"
                            :label="item.category_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="新闻标题：" prop="name">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="缩略图：" prop="name">
                <UploadImg :imgUrl.sync="form.imgUrl" />
            </el-form-item>
            <el-form-item label="发布日期：" prop="name">
                <el-date-picker
                    v-model="form.createDate"
                    type="createDate"
                    disabled
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="详情：" prop="name">
                <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {ref, reactive, onMounted, watch} from '@vue/composition-api';
import infoAPi from "@/api/info"
import formatTime from '@/utils/common'
import UploadImg from '@c/UploadImg/upload'
//富文本编辑器的导入
import { quillEditor } from 'vue-quill-editor'
// 富文本编辑器require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    components:{
        UploadImg,
        quillEditor
    },
    setup(props,{ root }){
        let tempData = root.$route.params
        root.$store.commit("infoCategoryDetailStore/SET_ID",tempData.id)
        root.$store.commit("infoCategoryDetailStore/SET_TITLE",tempData.title)

        const form = reactive({
            categoryId: '',
            title: '',
            createDate: '',
            content: '',
            imgUrl: ''
        })
        const data = reactive({
            categoryList: '',
            editorOption: {},
        })
        
        const getCategory = () => {
            root.$store.dispatch('commonStore/getCategoryAll','').then(res => {
                if(res.data.resCode == '0'){
                    data.categoryList = res.data.data
                }
            }).catch(err => {
                root.$message({
                    type: 'error',
                    message: err.data.message
                });   
            })
        }
        const getInfo = (editId) => {
            let tempData = {
                id: root.$route.params.id,
                pageNumber: 1,
                pageSize: 1
            }
            infoAPi.GetListInfo(tempData).then(res => {
                if(res.data.resCode == '0'){
                    let tempRes = res.data.data.data[0]
                    console.log(tempRes)
                    form.categoryId = tempRes.categoryId
                    form.title = tempRes.title
                    form.createDate = formatTime.timestampToTime(tempRes.createDate)
                    form.content = tempRes.content
                    form.id = tempRes.id
                }else{
                    root.$message({
                    type: 'error',
                    message: res.data.message
                    });  
                    close()
                }
            })
        }
        // 保存
        const submitForm = () => {
            infoAPi.EditInfo(form).then(res => {
                if(res.data.resCode == '0'){
                    root.$message({
                        type: 'success',
                        message: res.data.message
                    })
                }
            })
        }
        onMounted(() => {
            getCategory()
            getInfo()
        })
        
        return {
            form,data,
            //方法
            submitForm,
        }
    }
}
</script>

<style lang='scss'>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
