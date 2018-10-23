<template>
    <div>
        <el-form ref="form" :model="form" label-width="110px">
            <el-collapse v-model="collapse_active" @change="">
                <el-collapse-item title="　基本信息" name="1">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="客户名称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户类型">
                                {{form.name}}
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="移动电话">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="证件号">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="销售单编号">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-form-item label="负责销售员">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="选择开关">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>

                    <el-form-item label="是否信贷">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="不办理信贷"></el-radio>
                            <el-radio label="办理自贷"></el-radio>
                            <el-radio label="办理银行贷/助贷"></el-radio>
                            <el-tag v-if="form.resource!='不办理信贷'" class="ml20">该用户曾在公司贷款3笔，逾期5次。</el-tag>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="是否挂靠">
                        <el-radio-group v-model="form.guakao">
                            <el-radio label="挂靠"></el-radio>
                            <el-radio label="不挂靠"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="选择挂靠公司">
                        <el-select v-model="form.gongsi" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="文本框">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    
                </el-collapse-item>

                <el-collapse-item title="　商品信息" name="2">
                    <div class="toolbar ta-r mb10">
                        <el-button type="primary" size="mini" plain @click="event_add_goods">添加商品</el-button>
                    </div>
                    <el-table :data="data_goods" border class="table" ref="multipleTable">
                        <el-table-column prop="date" label="商品信息" sortable width="150">
                        </el-table-column>
                        <el-table-column prop="name" label="颜色" width="120">
                        </el-table-column>
                        <el-table-column prop="address" label="销售单价">
                        </el-table-column>
                        <el-table-column label="数量" width="150">
                            <template slot-scope="scope">
                                <el-input-number size="mini" :min="0" :max="100" v-model="scope.row.numb"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="小计">
                        </el-table-column>
                        <el-table-column label="操作" width="180" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-view" @click="">查看</el-button>
                                <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="" layout="prev, pager, next" :total="1000">
                        </el-pagination>
                    </div>
                    <div class="toolbar ta-r mt10">
                        <span>共选择<b class="color-red fs-16"> 3 </b>件商品</span>
                        <div class="input_coupon_sum">
                            优惠金额：
                            <el-input placeholder="请输入内容" v-model="coupon_sum" clearable></el-input>
                        </div>
                        <el-tag type="danger">￥：600,000.00</el-tag>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="　收款信息" name="3">

                    <el-form-item label="客户付款对象">
                        <el-radio-group v-model="form.guakao">
                            <el-radio label="挂靠"></el-radio>
                            <el-radio label="不挂靠"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="客户支付方式">
                        <el-radio-group v-model="form.guakao">
                            <el-radio label="挂靠"></el-radio>
                            <el-radio label="不挂靠"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="费用金额">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="费用凭证">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="选择审核人">
                        <!-- <el-input v-model="form.name" @focus="event_auditor"></el-input> -->
                        <el-select v-model="form.gongsi" placeholder="请选择公司，不选择是全部" class="mr10">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                        <el-select v-model="form.gongsi" placeholder="请选择审核人">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>

                </el-collapse-item>

                <el-collapse-item title="　可控 Controllability" name="4">
                    <el-form-item label="订单流程">
                        {{form.name}}
                    </el-form-item>
                    <el-form-item label="创建人">
                        {{form.name}}
                    </el-form-item>
                    <el-form-item label="创建日期">
                        {{form.name}}
                    </el-form-item>
                    <el-collapse v-model="collapse_in_active">
                        <el-collapse-item title="　车辆定金阶段" name="1">
                            <el-card class="box-card mb15">
                                <div><span class="display-ib ta-r w70">订单流程：</span>定金审核 - 财务</div>
                                <div><span class="display-ib ta-r w70">审核意见：</span>通过</div>
                                <div><span class="display-ib ta-r w70">备注：</span>撒打算</div>
                                <div><span class="display-ib ta-r w70">审核人ID：</span> asdas</div>
                                <div><span class="display-ib ta-r w70">审核时间：</span>2018-10-23 00:49:38</div>
                            </el-card>
                            <el-card class="box-card mb15">
                                <div><span class="display-ib ta-r w70">订单流程：</span>定金审核 - 财务</div>
                                <div><span class="display-ib ta-r w70">审核意见：</span>通过</div>
                                <div><span class="display-ib ta-r w70">备注：</span>撒打算</div>
                                <div><span class="display-ib ta-r w70">审核人ID：</span> asdas</div>
                                <div><span class="display-ib ta-r w70">审核时间：</span>2018-10-23 00:49:38</div>
                            </el-card>
                            <el-form-item label="审核意见">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="备注信息">
                                <el-input type="textarea" v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="选择审核人">
                                <el-select v-model="form.gongsi" placeholder="请选择公司，不选择是全部" class="mr10">
                                    <el-option key="bbk" label="步步高" value="bbk"></el-option>
                                    <el-option key="xtc" label="小天才" value="xtc"></el-option>
                                    <el-option key="imoo" label="imoo" value="imoo"></el-option>
                                </el-select>
                                <el-select v-model="form.gongsi" placeholder="请选择审核人">
                                    <el-option key="bbk" label="步步高" value="bbk"></el-option>
                                    <el-option key="xtc" label="小天才" value="xtc"></el-option>
                                    <el-option key="imoo" label="imoo" value="imoo"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-collapse-item>
                        <el-collapse-item title="　车辆首付款/全款阶段" name="2">
                            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                        </el-collapse-item>
                        <el-collapse-item title="　车辆服务费阶段" name="3">
                            <div>简化流程：设计简洁直观的操作流程；</div>
                            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                        </el-collapse-item>
                    </el-collapse>
                </el-collapse-item>
            </el-collapse>
            <el-form-item class="form-submit">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    

        <!-- 添加商品 -->
        <el-dialog title="添加商品" :visible.sync="dialog_add_goods" width="50%">
            <el-form ref="filters_add_goods" :inline="true" :model="filters_add_goods">
                    <el-form-item label="车辆品牌" :inline="true">
                        <el-select v-model="filters_add_goods.brand" placeholder="请选择">
                            <el-option label="车辆品牌">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车辆系列" :inline="true">
                        <el-select v-model="filters_add_goods.series" placeholder="请选择">
                            <el-option label="车辆系列">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车辆类型" :inline="true">
                        <el-select v-model="filters_add_goods.type" placeholder="请选择">
                            <el-option label="车辆类型">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="驱动形式" :inline="true">
                        <el-select v-model="filters_add_goods.drive" placeholder="请选择">
                            <el-option label="驱动形式">
                            </el-option>
                        </el-select>
                    </el-form-item>
            </el-form>
            <el-table :data="data_add_goods" border ref="multipleTable">
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column prop="date" label="商品信息" width="150">
                </el-table-column>
                <el-table-column prop="name" label="颜色" width="120">
                </el-table-column>
                <el-table-column prop="address" label="公告型号">
                </el-table-column>
                <el-table-column prop="address" label="销售单价">
                </el-table-column>
                <el-table-column prop="address" label="存量">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog_add_goods = false">取 消</el-button>
                <el-button type="primary" @click="">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 选择审核人 -->
        <el-dialog title="选择审核人" :visible.sync="dialog_auditor" width="50%">
            <!-- <el-form ref="filters_add_goods" :inline="true" :model="filters_add_goods">
                <el-form-item label="车辆品牌" :inline="true">
                    <el-select v-model="filters_add_goods.brand" placeholder="请选择">
                        <el-option label="车辆品牌">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form> -->
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog_auditor = false">取 消</el-button>
                <el-button type="primary" @click="">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                collapse_active: ['1'],
                collapse_in_active: ['1'],
                dialog_add_goods: false,
                dialog_auditor: false,
                coupon_sum: 12,
                filters_add_goods: {
                    brand:'',
                    series:'',
                    type:'',
                    drive:''
                },
                form: {
                    name: '',
                    region: '',
                    gongsi: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    guakao: '挂靠',
                    desc: '',
                    options: []
                },
                data_goods:[
                    {
                        "date": "1997-11-11",
                        "name": "林丽",
                        "address": "吉林省 辽源市 龙山区",
                        "numb": 1
                    }
                ],
                data_add_goods:[
                    {
                        "date": "1997-11-11",
                        "name": "林丽",
                        "address": "吉林省 辽源市 龙山区",
                        "numb": 1
                    }
                ]
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },
            event_add_goods() {
                this.dialog_add_goods = true;
            },
            event_auditor() {
                this.dialog_auditor = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .input_coupon_sum{
        display:inline-block;
        padding:0 15px;
        >div {
            width:100px;
        }
    }
</style>