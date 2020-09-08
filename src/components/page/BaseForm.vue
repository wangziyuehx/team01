<template>
    <div>
        <v-head style="position:fixed;top:0;left: 0"></v-head>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>新增用户信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="用户地址">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
<!--                    <el-form-item label="邮箱">-->
<!--                        <el-switch v-model="form.delivery"></el-switch>-->
<!--                    </el-form-item>-->
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="个人描述">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="用户头像">
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
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    // import httplist from '@/utils/prots'
    import {login,picurl,index, change,infoname,del,dealt,deldealt,adddealt,changedealt,img,add} from '../../api/index';
export default {
    name: 'baseform',
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
                // region: '',
                date1: '',
                // date2: '',
                email:'',

                // type: ['步步高'],
                // resource: '小天才',
                desc: '',
                // options: ''
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

            add({
                userid:this.userid,
                date:this.form.date1,
                name:this.form.name,
                address:this.form.address,
                email:this.form.email,
                thumb:this.form.imgsrc,
                describe:this.form.desc
            }).then((res)=>{
               console.log(res)
                if(res.data.status==true){
                    this.$message.success('提交成功！');
                    this.$router.push({path:'/table'});
                }
            }).catch((err)=>{
                console.log(err)
            })

        }
    }
};
</script>
