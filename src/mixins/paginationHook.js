
export default {
    data(){
        return {
            pageData: {
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    creted(){
    },
    mounted() {
    },
    methods: {
        handleSizeChange(val){
            this.pageData.pageSize = val;
            this.getTableData()
        },
        handleCurrentChange(val){
            this.pageData.currentPage = val;
            this.getTableData()
        }
    },

}