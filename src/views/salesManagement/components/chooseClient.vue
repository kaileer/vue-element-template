<template>
    <div>
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
        <el-button @click="close">取消</el-button>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                filters: {
                    movieID:'',
                    movieName:'',
                    value:'3'
                },
                tableData: [{
			        "date": "1997-11-11",
			        "name": "林丽",
			        "address": "吉林省 辽源市 龙山区"
			    }, {
			        "date": "1987-09-24",
			        "name": "文敏",
			        "address": "江西省 萍乡市 芦溪县"
			    }, {
			        "date": "1996-08-08",
			        "name": "杨秀兰",
			        "address": "黑龙江省 黑河市 五大连池市"
			    }, {
			        "date": "1978-06-18",
			        "name": "魏强",
			        "address": "广东省 韶关市 始兴县"
			    }, {
			        "date": "1977-07-09",
			        "name": "石秀兰",
			        "address": "江苏省 宿迁市 宿豫区"
			    }, {
			        "date": "1994-09-20",
			        "name": "朱洋",
			        "address": "海外 海外 -"
			    }, {
			        "date": "1980-01-22",
			        "name": "傅敏",
			        "address": "海外 海外 -"
			    }, {
			        "date": "1985-10-10",
			        "name": "毛明",
			        "address": "内蒙古自治区 包头市 九原区"
			    }, {
			        "date": "1975-09-08",
			        "name": "何静",
			        "address": "西藏自治区 阿里地区 普兰县"
			    }, {
			        "date": "1970-06-07",
			        "name": "郭秀英",
			        "address": "四川省 巴中市 恩阳区"
			    }]
            }
        },
        methods: {
            close(){
            	this.$emit(false)
            }
        }
    }
</script>

<style scoped>
</style>