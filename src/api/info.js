import service from '@/utils/request'

export default {
    /************************************
     * 分类
     */
    /**
     * 添加一级分类
     */
    AddFirstCategory(data){
        return service.request({
            method: 'post',
            url: '/news/addFirstCategory/',
            data: data
        })
    },
    /**
     * 添加二级分类
     */
    AddChildrenCategory(data){
        return service.request({
            method: 'post',
            url: '/news/addChildrenCategory/',
            data: data
        })
    },
    /**
     * 获取分类(不包含子级)
     */
    GetCategory(data = {}){
        return service.request({
            method: 'post',
            url: '/news/getCategory/',
            data: data
        })
    },
    /**
     * 获取分类(包含子级)
     */
    GetCategoryAll(data = {}){
        return service.request({
            method: 'post',
            url: '/news/getCategoryAll/',
            data: data
        })
    },
    /**
     * 删除分类
     */
    DeleteCategory(data = {}){
        return service.request({
            method: 'post',
            url: '/news/deleteCategory/',
            data: data
        })
    },
    /**
     * 修改分类
     */
    EditCategory(data = {}){
        return service.request({
            method: 'post',
            url: '/news/editCategory/',
            data: data
        })
    },
    /************************************
     * 信息
     */
    /**
     * 添加信息
     */
    AddInfo(data = {}){
        return service.request({
            method: 'post',
            url: '/news/add/',
            data: data
        })
    },
    /**
     * 修改信息
     */
    EditInfo(data = {}){
        return service.request({
            method: 'post',
            url: '/news/editInfo/',
            data: data
        })
    },
    /**
     * 获取信息列表
     */
    GetListInfo(data = {}){
        return service.request({
            method: 'post',
            url: '/news/getList/',
            data: data
        })
    },
    /**
     * 删除信息
     */
    deleteInfo(data = {}){
        return service.request({
            method: 'post',
            url: '/news/deleteInfo/',
            data: data
        })
    },
}