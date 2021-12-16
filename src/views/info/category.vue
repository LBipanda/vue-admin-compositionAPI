<!-- 页面 -->
<template>
    <div class="infoCategory">
        <el-button type="danger" @click="addFirst()">新增一级分类</el-button>
        <hr style="margin:10px -30px" />
        <el-row :gutter="30">
            <el-col :span="8">
                <div class="category-wrap">
                <div class="category" v-for="(item,index) in categoryList.item" :key="index">
                    <!-- 一级分类 -->
                    <h4>
                        <svg-icon iconName="minus" iconClass="minus"></svg-icon>
                        {{item.category_name}}
                        <div class="button-group">
                            <el-button size="mini" type="danger" @click="editCategory(item,'first')" round>编辑</el-button>
                            <el-button size="mini" type="success" round @click="addTwice(item)">添加子级</el-button>
                            <el-button size="mini" round @click="isDelete(item.id)">删除</el-button>
                        </div>
                    </h4>
                    <!-- 二级分类 -->
                    <ul>
                        <li v-for="(itemTwo,index) in item.children" :key="index">
                            {{itemTwo.category_name}}
                            <div class="button-group">
                                <el-button size="mini" type="danger" round @click="editCategory(itemTwo)">编辑</el-button>
                                <el-button size="mini" round @click="isDelete(itemTwo.id)">删除</el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
            </el-col>
            <el-col :span="16">
                <h4 class="menu-title">分类操作</h4>
                <el-form label-width="100px" :model="form" style="width:410px">
                    <el-form-item label="一级分类名称" v-if="firstCategoryInput">
                        <el-input v-model="form.categoryName"></el-input>
                    </el-form-item>
                    <el-form-item label="二级分类名称" v-if="twiceCategoryInput">
                        <el-input v-model="form.secCategoryName"></el-input>
                    </el-form-item>
                    <el-form-item v-if="firstCategoryInput || twiceCategoryInput">
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {ref, reactive, watch, onMounted} from '@vue/composition-api'
import infoApi from '@/api/info'
import { global } from '@/utils/global_V3.0'

export default {
    name: 'infoCategory',
    setup(props,{refs, root}){
        // vue3.0全局方法
        const { confirm } = global()
        const firstCategoryInput = ref(false) 
        const twiceCategoryInput = ref(false) 
        const form = reactive({
            categoryName: '',
            secCategoryName: '',
            isEdit: false,
            id: ''
        })
        const categoryList = reactive({
            item: [],
            current: []
        })
        // 生命周期
        onMounted(() => {
            getCategory()
        })
        // 方法  获取分类
        const getCategory = (() => {
            // infoApi.GetCategory().then(res => {
            //     // console.log(res)
            //     if(res.data.resCode == '0'){
            //         categoryList.item = res.data.data.data
            //         console.log(categoryList.item)
            //     }
            // })

            //获取分类无子级 vuex
            // root.$store.dispatch('commonStore/getInfoCategory','').then(res => {
            //     console.log(res)
            //     if(res.data.resCode == '0'){
            //         categoryList.item = res.data.data.data
            //     }
            // }).catch(err => {
            //     root.$message({
            //         type: 'error',
            //         message: err.data.message
            //     });   
            // })

            //获取分类有子级 vuex
            root.$store.dispatch('commonStore/getCategoryAll','').then(res => {
                console.log('getCategoryAll',res)
                if(res.data.resCode == '0'){
                    categoryList.item = res.data.data
                }
            }).catch(err => {
                root.$message({
                    type: 'error',
                    message: err.data.message
                });   
            })
        }) 
        const submitForm = (() => {
            if(form.categoryName == '' && form.secCategoryName == '') {
                root.$message({
                    message: "分类名称不能为空",
                    type: "error"
                })
                return false;
            }
            if(form.isEdit){//判断是编辑分类还是新增分类
            console.log(form)
                if(form.categoryName != ''){ //编辑一级分类
                    editParentClass()
                }else if(form.secCategoryName != ''){
                    editParentClass()
                }
            }else{
                if(form.categoryName != ''){ //新增一级分类
                console.log('新增一级')
                    addParentClass()
                }else{
                    console.log('新增子级')
                    addChildClass()
                }
            }
        })
        const addParentClass =(() => {
            infoApi.AddFirstCategory({ categoryName: form.categoryName }).then(res => {
                console.log(res)
                let data = res.data
                if(data.resCode === 0) {
                        root.$message({
                            message: data.message,
                            type: "success"
                        });
                        form.categoryName = ''
                        getCategory()
                        /**
                         * 两种处理方法
                         * 1、请求接获取分类接口（缺点：浪费资源）
                         * 2、直接push，请求接口后返回的数据
                         */
                        // category.item.push(response.data.data)
                        // 数组的方法，添加数组末尾
                    }
            })
        })
        const addChildClass =(() => {
            let data = {
                categoryName: form.secCategoryName,
                parentId: form.id
            }
            infoApi.AddChildrenCategory(data).then(res => {
                console.log(res)
                let data = res.data
                if(data.resCode === 0) {
                        root.$message({
                            message: data.message,
                            type: "success"
                        });
                        form.categoryName = ''
                        getCategory()
                        /**
                         * 两种处理方法
                         * 1、请求接获取分类接口（缺点：浪费资源）
                         * 2、直接push，请求接口后返回的数据
                         */
                        // category.item.push(response.data.data)
                        // 数组的方法，添加数组末尾
                    }
            })
        })
        // 编辑一级分类
        const editParentClass = (() => {
            let data = {
                id: form.id,
                categoryName: form.categoryName?form.categoryName:form.secCategoryName
            }
            infoApi.EditCategory(data).then(res => {
                console.log(res)
                let data = res.data
                if(data.resCode === 0) {
                    root.$message({
                        message: data.message,
                        type: "success"
                    });
                    form.categoryName = ''
                    form.secCategoryName = ''
                    getCategory()
                }else{
                    root.$message({
                        message: data.message,
                        type: "error"
                    });
                }
            })
        })
        // 添加一级分类
        const addFirst = (() => {
            form.secCategoryName = ''
            form.isEdit = false
            firstCategoryInput.value = true
            twiceCategoryInput.value = false
        })
        // 添加二级分类
        const addTwice = ((item) => {
            form.categoryName = ''
            form.isEdit = false
            form.id = item.id
            firstCategoryInput.value = false
            twiceCategoryInput.value = true
        })
        // 编辑分类
        const editCategory= ((item,cla) => {
            console.log(item)
            form.isEdit = true;
            if(cla == 'first'){
                firstCategoryInput.value = true
                twiceCategoryInput.value = false
                form.categoryName = item.category_name
                form.secCategoryName = ''
                form.id = item.id
            }else{
                firstCategoryInput.value = false
                twiceCategoryInput.value = true
                form.categoryName = ''
                form.secCategoryName = item.category_name
                form.id = item.id
            }
            console.log(form)
        })
        const isDelete = ((item) => {
            // vue3.0全局方法封装
            confirm({
                content:'确认删除当前信息，确认后无法恢复!!',
                tip: '警告',
                fn: deleteCategoryComfirm,
                id: item
            })
        })
        //删除分类
        const deleteCategoryComfirm = ((item) =>{
            console.log(item)
            infoApi.DeleteCategory({ categoryId: item }).then(res => {
                console.log(res)
                let data = res.data
                if(data.resCode === 0) {
                    root.$message({
                            message: '删除成功',
                            type: "success"
                        });
                    getCategory()
                }
            })
        });
        
        return {
            //ref
            firstCategoryInput,
            twiceCategoryInput,
            // reactive
            form,
            categoryList,
            // function
            submitForm,
            addFirst,
            addTwice,
            isDelete,
            deleteCategoryComfirm,
            editCategory
        }
    }
}
</script>

<style lang='scss' scoped>
@import "@/assets/styles/config.scss";
.infoCategory{
    .category-wrap {
        div:first-child {
            &:before { top: 20px; }
        }
        div:last-child {
            &:before { bottom: 21px; }
        }
    }
    .category{
        position: relative;
        line-height: 44px;
        cursor: pointer;
        &:before {
            content: '';
            position: absolute;
            left: 22px;
            top: 0;
            bottom: 0;
            width: 32px;
            border-left: 1px dotted #000;
        }
        h4{
            position: relative;
            padding-left: 40px;
        }
        svg {
            position: absolute;
            left: 14px;
            top: 15px;
            background-color: #fff;
            font-size: 17px;
        }
        li{
            position: relative;
            padding-left: 36px;
            margin-left: 24px;
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 22px;
                width: 32px;
                border-bottom: 1px dotted #000;
            }
        }
        li, h4 {
            @include webkit(transition, all .5s ease 0s);
            &:hover {
                background-color: #f3f3f3;
                .button-group { display: block; }
            }
        }
        .button-group {
            display: none;
            position: absolute;
            z-index: 2;
            right: 11px;
            top: -1px;
            button { font-size: 12px; }
        }
    }
    .menu-title {
        line-height: 44px;
        padding-left: 22px;
        background-color: #f3f3f3;
    }
    .el-form-item{
        margin: 10px 0;
    }
}
</style>
