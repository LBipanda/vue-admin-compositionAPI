import service from '@/utils/request'

export default {
    /**
     * 获取七牛云token
     */
    UploadImgToken(data){
        return service.request({
            method: 'post',
            url: '/uploadImgToken/',
            data: data
        })
    },
    // 组件二次封装的接口
    /**
     * 获取table列表数据
    */
    GetTable(body){
        console.log('body',body)
        return service.request({
            method: body.method || "post",
            url: body.url,
            data: body.data || {}
        })
    },
    /**
     * 获取省市区地址
    */
    GetCityPicker(body){
        return service.request({
            method: "post",
            url: "/cityPicker/",
            data: body
        })
    },

}