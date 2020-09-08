<template>
    <div>
        <v-head style="position:fixed;top:0;left: 0"></v-head>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-user-solid"></i>修改账户信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="管理员账户">
                        <el-input type="text" placeholder="请输入新的账户名" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" placeholder="请输入新的密码" v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input type="password" placeholder="请确认密码" v-model="form.truepassword"></el-input>
                    </el-form-item>
                    <el-form-item label="审核权限">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="个人描述">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员头像">
                        <el-upload
                                :action="'api' + '/uploader'"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :on-success="afterUpload">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import {changeAccount} from '../../api/index';
    export default {
        data() {
            return {
                userid:localStorage.getItem('userid'),
                imgsrc:'',
                dialogImageUrl: '',
                dialogVisible: false,
                options: [
                    {
                        value: 'guangdong',
                        label: '广东省',
                        children: [
                            {
                                value: 'guangzhou',
                                label: '广州市',
                                children: [
                                    {
                                        value: 'tianhe',
                                        label: '天河区'
                                    },
                                    {
                                        value: 'haizhu',
                                        label: '海珠区'
                                    }
                                ]
                            },
                            {
                                value: 'dongguan',
                                label: '东莞市',

                            }
                        ]
                    },
                    {
                        value: 'hunan',
                        label: '湖南省',

                    }
                ],
                form: {
                    name: '',
                    imgsrc:'',
                    truepassword:'',
                    delivery: true,
                    desc: '',
                    address:'',
                }
            };
        },
        methods: {
            afterUpload(res){
                console.log(res)
                this.form.imgsrc = res
            },
            handleRemove(file, fileList) {
                console.log(file);
                console.log(fileList);
            },
            handlePictureCardPreview(file) {
                console.log(file)
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSubmit() {
                console.log(this.form)
                var list = this.form
                if(list.name){
                    if(list.address){
                        if(list.truepassword){
                            if(list.truepassword == list.address){
                                if(list.imgsrc){
                                    changeAccount({
                                        userid:this.userid,
                                        account:this.form.name,
                                        password:this.form.address,
                                        pic:this.form.imgsrc,
                                    }).then((res)=>{
                                        console.log(res)
                                        if(res.data.status==true){
                                            this.$message.success('修改成功！');
                                            localStorage.removeItem('ms_username');
                                            localStorage.removeItem('userimg');
                                            localStorage.removeItem('userid');
                                            this.$router.push({path:'/'});
                                        }
                                    })
                                }else {
                                    this.$message.success('请上传管理员头像');
                                }
                            }else {
                                this.$message.success('两次输入的密码有误');
                            }
                        }else {
                            this.$message.success('请确认密码');
                        }
                    }else {
                        this.$message.success('请输入密码');
                    }
                }else {
                    this.$message.success('请输入账户名');
                }


            }
        }
    }
</script>

<style scoped>

</style>
