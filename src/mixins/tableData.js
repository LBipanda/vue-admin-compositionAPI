import commonApi from '@/api/common'

export default {
    data(){

    },
    creted(){
    },
    mounted() {
        this.getTableData()
    },
    methods: {
        getTableData(){
            let tempData = this.tableConfig.requestData;
            let params ={
                url: tempData.url,
                method: tempData.methods,
                data:{
                    username: "",
                    truename: "",
                    phone: "",
                    pageNumber: tempData.data.pageNumber,
                    pageSize: tempData.data.pageSize,
                }
            }
            commonApi.GetTable(params).then(res => {
                console.log("res",res)
                this.tableData = res.data.data.data
                this.total = res.data.data.total || 0
                
            })
        }
    },

}