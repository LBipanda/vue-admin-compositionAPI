<!-- 页面 -->
<template>
    <div id="layout" :class="!isCollapse?'open':'close'">
        <LayoutHeader />
        <LayoutNav />
        <LayoutMain />
    </div>
</template>

<script>
import LayoutHeader from './components/Header';
import LayoutNav from './components/Nav';
import LayoutMain from './components/Main';
import { computed } from '@vue/composition-api'
export default {
    name:'layout',
    components:{
        LayoutHeader,
        LayoutNav,
        LayoutMain
    },
    setup(props,{ refs , root }){
        /*********************
         * computed 计算属性
         */
        const isCollapse = computed(() => root.$store.state.appStore.collapse);

        return {
            isCollapse
        }
    }
}
</script>

<style lang='scss' scoped>
#layout{
}
</style>
