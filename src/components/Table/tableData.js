import {ref, reactive, onMounted, watch} from '@vue/composition-api';
import commonApi from '@/api/common'
export default {
    getTableData(){
        const resultData = reactive({
            data:[],
            total: 0
        })
        const getTableData = (temp) => {
            console.log(temp)
            let tempData = temp.data
            console.log(tempData.option)
            let key =  tempData.option;
            let value = tempData.key_word;
            let params ={
                url: temp.url,
                method: temp.methods,
                data:{
                    // tempData.option: value,
                    pageNumber: tempData.pageNumber,
                    pageSize: tempData.pageSize,
                }
            }
            params.data[key] = value
            commonApi.GetTable(params).then(res => {
                console.log("TableList",res)
                resultData.data = res.data.data.data
                resultData.total = res.data.data.total || 0
                
            })
        }
        return {
            resultData,getTableData
        }
    }
    
}