<template>
    <div>
        <v-head style="position:fixed;top:0;left: 0"></v-head>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >删除全部</el-button>
                <el-select v-model="addressd" placeholder="地址"  class="handle-select mr10">
                    <el-option v-for="(item,index) in addresslist" :key="index" :label="item.text" :value="item.text"></el-option>
<!--                    <el-option key="2" label="当地" value="当地"></el-option>-->
                </el-select>
                <el-input v-model="name" placeholder="用户名" class="handle-input mr10" @input="getFundList($event)"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>

            </div>
            <el-table
                :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                @select-all="all"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="家庭地址"></el-table-column>
                <el-table-column prop="descibe" label="个人描述"></el-table-column>
                <el-table-column label="核身状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
<!--                <el-pagination-->
<!--                    background-->
<!--                    layout="total, prev, pager, next"-->
<!--                    :current-page="query.pageIndex"-->
<!--                    :page-sizes="[10, 15, 20]"-->
<!--                    :total="pageTotal"-->
<!--                    @current-change="handlePageChange"-->
<!--                ></el-pagination>-->

                <el-pagination background
                  layout="prev, pager, next, sizes, total, jumper"
                   :page-sizes="[5, 10, 15, 20]"
                :page-size="pagesize"
                :total="tableData.length"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                >
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">

                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="个人描述">
                    <el-input v-model="form.descibe"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
// import httplist from '@/utils/prots'
import {login,picurl,index, change,infoname,del,delall,dealt,deldealt,adddealt,changedealt,img,add} from '../../api/index';
function rTime(date) {
    var json_date = new Date(date).toJSON();
    return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
export default {
    name: 'basetable',
    data() {
        return {
            userid:localStorage.getItem('userid'),
            picurl:'',
            name:'',
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },

            addresslist:[{
                text:'贵阳'
            },{
                text:'上海'
            },{
                text:'北京'
            },{
                text:'深圳'
            },{
                text:'广东'
            },{
                text:'浙江'
            },{
                text:'广西'
            },{
                text:'四川'
            },{
                text:'陕西'
            }],

            pagesize: 10,
            currpage: 1,
            addressd:'',

            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            allselect:false
        };
    },
    // mounted(){
    //     this.test();
    // },
    created() {
        this.test();
    },
    methods: {
        test() {
            var that = this
           index({
               userid:that.userid
           }).then(function (res) {
                console.log(res)
                var list = res.data.admin
                for (var i = 0;i<list.length;i++) {
                    var piclist = picurl+list[i].thumb
                    list[i].thumb = piclist

                }
                that.tableData = list
            })
                 },

        getFundList($event){
            if($event==''){
                this.test()
            }
        },
        // 触发搜索按钮
        handleSearch() {
           var that = this
            infoname({
                name:this.name,
                address:this.addressd,
                userid:that.userid
            }).then((res)=>{
                console.log(res);
                var list = res.data.admin
                for (var i = 0;i<list.length;i++) {
                    var piclist = picurl+list[i].thumb
                    list[i].thumb = piclist

                }
                that.tableData = list
            });
        },
        // 删除操作
        handleDelete(index, row) {
            var that = this
            console.log(row)
            var caseid = row.caseid
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {

                    del({
                        caseid:caseid
                    }).then((res)=>{
                        console.log(res);
                        if(res.data.status==true){
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                            if(this.tableData.length==0){
                                delall({}).then((response)=>{});
                            }
                        }else {
                            this.$message.success('操作失败');
                        }

                    });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;
        },
        all(){
          console.log('全选')
            this.allselect = true
        },

        delAllSelection() {
          var pan =this.allselect
            if(pan==true){
                delall({
                    userid:this.userid
                }).then((response)=>{
                    if(response.data.status==true){
                        this.$message.success('删除成功');
                        this.test();
                    }else {
                        this.$message.success('操作失败');
                    }
                });
            }else {
                this.$message.success('请勾选所有内容');
            }

        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            console.log(this.form)
            var that = this
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);

            change({

                    caseid:this.form.caseid,
                    name:this.form.name,
                    descibe:this.form.descibe,
                    address:this.form.address

            }).then((response)=>{
                console.log('修改成功');
                console.log(response);
            });
        },
        // 分页导航
        // handlePageChange(val) {
        //     this.$set(this.query, 'pageIndex', val);
        //     this.getData();
        // }



        handleCurrentChange(val) {

            this.currpage = val;
        },
        handleSizeChange(val) {

            this.pagesize = val;
        },
    },
    watch:{
        $route(){
            this.test();
        }
    },
};
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
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
