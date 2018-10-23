<template>
    <div class="table">
        <div class="container">
            <el-form ref="filtersForm" :inline="true" :model="filters" class="toolbar">
                <el-form-item label="销售单号" :inline="true">
                    <el-input v-model.trim="filters.movieID" placeholder="请输入销售单号"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" :inline="true">
                    <el-input v-model.trim="filters.movieName" placeholder="请输入影片名"></el-input>
                </el-form-item>
                <el-form-item label="订单阶段">
                    <el-select v-model="filters.value" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button>搜索</el-button>
                <el-button type="primary" icon="plus" @click="choose_customer">新建</el-button>
            </el-form>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="date" label="日期" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="">查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button type="text" icon="el-icon-view" @click="">处理</el-button>
                        <el-button type="text" icon="el-icon-view" @click="">审核</el-button>
                        <el-button type="text" icon="el-icon-view" @click="event_refund">申请退款</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
        
        <!-- 选择客户 -->
        <el-dialog title="选择客户" :visible.sync="dialog_customer" width="50%">
            <el-form ref="filtersForm" :inline="true" :model="filters">
                <el-row :gutter="24">
                    <el-form-item label="销售单号" :inline="true">
                        <el-input v-model.trim="filters.movieID" placeholder="请输入销售单号"></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称" :inline="true">
                        <el-input v-model.trim="filters.movieName" placeholder="请输入影片名"></el-input>
                    </el-form-item>
                    <el-button>搜索</el-button>
                </el-row>
            </el-form>
            <el-table :data="data" border ref="multipleTable">
                <el-table-column prop="date" label="日期" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog_customer = false">取 消</el-button>
                <el-button type="primary" @click="">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 申请退款 -->
        <el-dialog title="申请退款" :visible.sync="dialog_refund" width="50%">
            <el-form ref="form_refund" :model="form_refund" label-width="80px">
                <el-form-item label="退款原因">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form_refund.address"></el-input>
                </el-form-item>
                <el-form-item label="补充资料">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog_refund = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { tableApi, tableSearch } from '@/api/table'
    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: true,
                dialog_refund: false,
                delVisible: false,
                dialog_customer: false,
                dialogImageUrl: '',
                dialogVisible: false,
                filtersForm: {
                    name: '',
                    date: '',
                    address: ''
                },
                form_refund: {
                    name: '',
                    date: '',
                    address: ''
                },
                filters: {
                    movieID:'',
                    movieName:'',
                    value:'3'
                },
                options: [{
                    value: '1',
                    label: '黄金糕'
                }, {
                    value: '2',
                    label: '双皮奶'
                }, {
                    value: '3',
                    label: '蚵仔煎'
                }, {
                    value: '4',
                    label: '龙须面'
                }, {
                    value: '5',
                    label: '北京烤鸭'
                }],
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 选择客户
            choose_customer(data){
                this.dialog_customer = true
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                /*if (process.env.NODE_ENV === 'development') {
                    this.url = '/mock/table';
                };*/
                tableApi({page: this.cur_page}).then(res => {
                    this.tableData = res.data.list;
                })
                
                /*this.$axios.get(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.data.list;
                })*/
            },
            search() {
                this.is_search = true;
                tableSearch({name: 'sadasd', age: '4242'}).then(res => {
                    console.log(res)
                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form_refund = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.dialog_refund = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form_refund);
                this.dialog_refund = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            event_refund(){
                this.dialog_refund = true
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>
