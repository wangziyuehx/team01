<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
<!--                <p class="login-tips">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>
    // import httplist from '@/utils/prots'
     import {login,picurl,index, change,infoname,del,dealt,deldealt,adddealt,changedealt,img,add} from '../../api/index';
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            var that = this
            if(this.param.username){
                if(this.param.password){
                    login({
                            account:this.param.username,
                            password:this.param.password
                    }).then((res)=>{
                        console.log(res);
                        var mes = res.data.mes
                        var pic = picurl+res.data.pic
                        var userid = res.data.userid
                        // console.log(mes)
                        if(res.data.statu == true){
                            console.log('登陆成功')
                            this.$message.success('登录成功');
                            localStorage.setItem('ms_username', this.param.username);
                            localStorage.setItem('userimg', pic);
                            localStorage.setItem('userid', userid);
                            this.$router.push('/index');
                        }else {
                            that.$message.success(mes);
                        }
                    });

                }else {
                    that.$message.success('请输入密码');
                }

            }else {
                that.$message.success('请输入用户名');
            }



        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #092B34;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.7);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: red;
}
</style>
