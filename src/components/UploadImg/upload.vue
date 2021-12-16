<!-- 页面 -->
<template>
    <el-upload
        class="avatar-uploader"
        :action="requestData.action"
        :data="data.uploadKey"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="data.image" :src="data.image" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import {ref, reactive, onMounted, watch} from '@vue/composition-api';
import commonAPi from "@/api/common"
export default {
    /**
     * 组件过程要做什么事？（显示默认图片，选择图片后渲染图片）
     * 最终要做什么事？（返回选择后的图片路径）
     */
    props: {
        imgUrl: {
            type: String,
            default: ''
        }
    },
    setup(props,{ root, ref, emit }){
        const data = reactive({
            image: "",
            uploadKey: {
                token: "",
                key: ""
            }
        })
        const requestData = reactive({
            // action: "http://up-z2.qiniup.com",
            // accessKey: "WX6ad9iiDwPBE0atj1o5vThpX3HWK5oUfJszwhYO",
            // secretKey: "oYjMd6ZrdPieYg9zF6PmrrGFttYL5MIGE5EfMEPR",
            // buckety: "first-vueadmin"
            action: "http://up-z2.qiniup.com",
            accesskey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
            secretkey: "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
            buckety: "webjshtml"
        })

        const handleAvatarSuccess = (res, file) => {
            let image = `${root.$store.getters["commonStore/qiniuUrl"]}${res.key}`;
            data.image = image;
            emit("update:imgUrl", image);
        }
        const beforeAvatarUpload = (file) => {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            root.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            root.$message.error('上传头像图片大小不能超过 2MB!');
            }
             // 文件名转码
            let suffix = file.name;
            let key = encodeURI(`${suffix}`);
            data.uploadKey.key = key;
            return isJPG && isLt2M;
        }
        //获取七牛云token
        const getQiNiuToken = () => {
            commonAPi.UploadImgToken(requestData).then(res => {
                data.uploadKey.token = res.data.data.token
            })
        }
        /**
         * watch
         */
        watch(() => props.imgUrl, (value) => {
            data.image = value
        })

        onMounted(() => {
            getQiNiuToken()
        })
        return{
            data,requestData,
            handleAvatarSuccess,beforeAvatarUpload
        }
    }
}
</script>

<style lang='scss'>

</style>
