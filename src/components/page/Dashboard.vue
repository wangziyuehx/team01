<template>
    <div>
        <v-head style="position:fixed;top:0;left: 0"></v-head>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img :src="pic" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2020-8-4</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>贵阳</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>项目进度统计</span>
                    </div>系统开发
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>工伤认定小程序
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>原创派
                    <el-progress :percentage="13.7"></el-progress>电子归档章
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="additem">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">

                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"

                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-edit" @click="editor(scope.$index, scope.row)" style="margin-right: 16px"></i>
                                <i class="el-icon-delete" @click="delpro(scope.$index, scope.row)"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
        <!-- 编辑弹出框 -->
        <el-dialog  :title.sync="maintitle" :visible.sync="editVisible" width="30%">
            <el-form label-width="70px">

                <el-form-item label="待办事项">
                    <el-input v-model="title"></el-input>
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
import Schart from 'vue-schart';
import bus from '../common/bus';
// import httplist from '@/utils/prots'
import {login,picurl,index, change,infoname,del,dealt,deldealt,adddealt,changedealt,img,add} from '../../api/index';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            pic:localStorage.getItem('userimg'),
            userid:localStorage.getItem('userid'),
            todoList: [],
            maintitle:'2',
            editVisible: false,
            title:'',
            form:'',
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],
            options: {
                type: 'bar',
                title: {
                    text: '最近一周各品类销售图'
                },
                xRorate: 25,
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售趋势图'
                },
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [74, 118, 200, 235, 90]
                    }
                ]
            }
        };
    },
    components: {
        Schart,
    },
    created(){
        dealt({
            userid:this.userid
        }).then((res)=>{
            console.log(res);
            this.todoList = res.data.dealt
        });
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        },

    },

    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        editor(index, row){
            console.log(row)
            this.editVisible = true;
            this.maintitle = '修改待办事项'
            this.form = row
            this.title = row.title
            this.status = row.status

        },
        delpro(index, row){
            console.log(row)
            var id = row.id
            deldealt({
                id:id
            }).then((res)=>{
                console.log(res);
                if(res.data.status == true){
                    this.todoList .splice(index, 1);
                }

            });

        },
        additem() {

            this.maintitle = '添加待办事项'
            this.editVisible = true;
            this.title = ''
            this.status = ''
        },
// 添加
saveEdit() {
    var mes = this.maintitle

    if(mes=='添加待办事项'){
        console.log('添加待办事项')
        adddealt({
            title:this.title,
            userid:this.userid
        }).then((res)=>{
            console.log(res);
            if(res.data.status ==true){
                this.editVisible = false;
                this.$message.success(`添加成功`);
                dealt({ userid:this.userid}).then((res)=>{
                    this.todoList = res.data.dealt
                });
            }
        });
    }else {
        console.log('修改待办事项')
        var id = this.form.id
        changedealt({id:id,title:this.title,userid:this.userid}).then((res)=>{
            console.log(res)
            if(res.data.status ==true){
                this.editVisible = false;
                this.$message.success(`修改成功`);
                dealt({ userid:this.userid}).then((res)=>{
                    this.todoList = res.data.dealt
                });
            }
        });
    }

},

    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
