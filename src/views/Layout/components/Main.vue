<!-- 页面 -->
<template>
    <div id="main-wrap">
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    setup(props,{ refs , root }){

    }
}
</script>

<style lang='scss' scoped>
#main-wrap{
    position: fixed;
    // left: $navMenu;
    right: 0;
    top: 75px;
    bottom: 0;
    // border: 30px solid #f7f7f7;
    margin: 30px 0 0 30px;
    border-bottom: none;
    -webkit-box-sizing: border;
    padding-left: 30px;
    background-color: #fff;
    @include webkit(transition,all .3s ease);
}
.content{
    height: 100%;
    width: 100%;
    padding: 15px 0;
}
.open{
    #main-wrap{
        left: $navMenu;
    }
}
.close{
    #main-wrap{
        left: $navMenuMin;
    }
}
</style>
