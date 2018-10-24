<template>
    <div>
        <el-button @click="exportExcel">默认按钮</el-button>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import excel from '@/assets/utils/excel'
export default {
    name: 'export-excel',
    data() {
        return {
            exportLoading: false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        exportExcel() {
            if (this.tableData.length) {
                this.exportLoading = true
                const params = {
                    title: ['日期', '姓名', '地址'],
                    key: ['date', 'name', 'address'],
                    data: this.tableData,
                    autoWidth: true,
                    filename: '分类列表'
                }
                excel.export_array_to_excel(params)
                this.exportLoading = false
            } else {
                this.$Message.info('表格数据不能为空！')
            }
        }
    },
    created() {

    },
    mounted() {

    }
}
</script>