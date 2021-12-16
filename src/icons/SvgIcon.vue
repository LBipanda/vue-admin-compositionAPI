<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="svgName" ></use>
    </svg>
</template>

<script>
import { ref, reactive, isRef, toRefs, computed } from "@vue/composition-api";
export default {
    name: 'svgIcon',
    // props: ['iconName','className'],
    props: {
        iconName:{
            type: String,
            default: 'commom',
            required: true
        },
        iconClass:{
            type: String,
            default: 'commom',
            required: true
        },
        // // 如果是对象的话
        // iconName:{
        //     type: Array,
        //     default: () => [],
        //     required: true
        // }
    },
    setup(props){
        const msg = ref('手把手撸码前端');
        const count = ref(10)
        /**
        * computed 监听属性变化，并计算属性
        */
        const svgName = computed(() => `#icon-${props.iconName}`)
        const svgClass = computed(() => {
            if(props.iconClass){
                return `svg-icon ${props.iconClass}`
            }else{
                return `svg-icon`
            }
        })
        return {
            msg,
            svgName,
            svgClass
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    // color: red;
}
</style>
