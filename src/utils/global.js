import { MessageBox } from 'element-ui';

export default {
     install (Vue, options) {
        // 注册全局方法
        Vue.prototype.Vueconfirm = (params) => {
            MessageBox.confirm(params.content,  params.tip || "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: params.type || "warning",
                    center: true
                }).then(() => {
                    params.then && params.then(params.data)
                }).catch(() => {
                    // root.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            }
        }
}