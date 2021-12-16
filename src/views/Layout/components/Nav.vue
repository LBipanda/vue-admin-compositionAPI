<!-- 页面 -->
<template>
    <div id="nav-wrap">
        <div class="logo"><img src="../../../assets/logo.png" /></div>
        <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse" 
        background-color="transparent" 
        text-color="#fff"
        router>
            <template v-for="(item,index) in routers">
                <el-submenu v-if="!item.hidden" :key="index" :index="index + ''" >
                    <!-- 一级菜单 -->
                    <template slot="title">
                    <!-- <i :class="item.meta.icon"></i> -->
                    <svg-icon :iconName="item.meta.icon" :iconClass="item.meta.icon" />
                    <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <!-- 子菜单 -->
                    <template v-for="(sonItem,index) in item.children">
                        <el-menu-item :key="index" :index="sonItem.path" v-if="!sonItem.hidden">{{sonItem.meta.name}}</el-menu-item>
                    </template>
                    
                    
                    <!-- <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu> -->
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
import {ref ,reactive, computed} from '@vue/composition-api';
export default {
    name: 'navMenu',
    setup(props,{ refs , root }){
        /*****************************************
         * 声明数据
         */
        const routers = reactive(root.$router.options.routes)
        /*********************
         * computed 计算属性
         */
        const isCollapse = computed(() => root.$store.state.appStore.collapse);
        /******************************************
         * 声明函数
         */
        const handleOpen = (key, keyPath)=> {
            console.log(key, keyPath);
        };
        const handleClose = (key, keyPath)=> {
            console.log(key, keyPath);
        }
        return {
            // 数据
            isCollapse,
            routers,
            // 函数
            handleOpen,
            handleClose
        }
    }
}
</script>

<style lang='scss' scoped>
#nav-wrap{
    position: fixed;
    top: 0;
    left: 0;
    // width: $navMenu;
    height: 100vh;
    background-color: #344a5f;
    svg{
        font-size: 20px;
        margin-right: 10px;
    }
    @include webkit(transition,all .3s ease);
    .logo{
        img{
            padding-top: 15px;
            transform: translateX(60%);
            width: 40%;
        };
    }
}
.open{
    #nav-wrap{
        width: $navMenu;
    }
}
.close{
    #nav-wrap{
        width: $navMenuMin;
    }
}

</style>
