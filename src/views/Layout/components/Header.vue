<!-- 页面 -->
<template>
    <div id="header-wrap">
        <div @click="changeNavState()"><svg-icon iconName="menu" iconClass="menu" /></div>
        <div class="flex aic h100pc">
            <div class="flex aic h100pc bdr mt-10 mb-10 pr-10">
                <div class="imgHeader"><img src="@/assets/image/LBipanda.jpg" /></div>
                <p class="lh100pc ml-15">{{username}}</p>
            </div>
            <div @click="loginOut"><svg-icon iconName="main" iconClass="main" class="pl-10" /></div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
    setup(props,{ refs , root }){
        const username = computed(() => root.$store.state.appStore.username)
        const changeNavState = (() => {
                root.$store.commit('appStore/SET_COLLAPSE','')

        })
        const loginOut = ( ()=> {
            root.$store.dispatch('appStore/loginOut','').then(res => {
                console.log(res)
                if(res == 'true'){
                    root.$router.push({
                        name: 'login'
                    })
                }
            })
        })

        return {
            changeNavState,
            username,
            loginOut
        }
    }
}
</script>

<style lang='scss' scoped>
#header-wrap{
    position: fixed;
    // left: $navMenu;
    top: 0;
    right: 0;
    height: 75px;
    background-color: #fff;
    -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    @include webkit(transition,all .3s ease);
    svg{
        font-size: 35px;
    }
    .imgHeader{
        height: 50px;
        width: 50px;
        border-radius: 50%;
        overflow: hidden;  
    }
}
.open{
    #header-wrap{
        left: $navMenu;
    }
}
.close{
    #header-wrap{
        left: $navMenuMin;
    }
}
</style>
