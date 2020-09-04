const db =require('./server/mysql')
const express = require('express')
const mysql = require('mysql');
const sql = require('./sqlMap');//sql语句
const app = express();
const multer = require('multer')

app.use(express.static('public'));
app.use(express.static('dist'));


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

var server = require('http').createServer(app);
var conn = mysql.createConnection(db.mysql);
conn.connect ()
conn.on('error',err=>{
    console.log('Re-connecting lost connection: ');
   var conn = mysql.createConnection(db.mysql)
    conn.connect ()
})

// 多表查询整个列表

app.post('/index', (req, res) => {
    let admin = sql.user.all
    let params = req.query;
    conn.query(admin,[params.userid], (err, result) => {
        if (err) {
            res.json({
                message:'查询失败',
                is:err,
            });
        }else {
            list1 = result
            for (var i=0;i<list1.length;i++) {
                if(list1[i].id!==1){
                    list1[i].id = i+1
                }
            }
            res.json({
                success_code: 200,
                mes:'查询成功',
                admin:list1,

            })
        }
    });
});

// 根据姓名或者地址查询
app.post('/infoname', function(req, res){;
    let admin = sql.user.all
    let params = req.query;
    conn.query(admin,[params.userid], (err, result) => {
        if (err) {
            res.json({
                message:'查询失败',
                is:err,
            });
        }else {
            list1 = result
            for (var i=0;i<list1.length;i++) {
                if(list1[i].id!==1){
                    list1[i].id = i+1
                }
            }
            var searchlist = []
            for (var a = 0;a<list1.length;a++){
                if(params.name){
                    if(list1[a].name.indexOf(params.name) != -1){
                        var mes = '查询成功'
                        searchlist.push(list1[a])
                    }
                }else if(params.address){
                    if(list1[a].address.indexOf(params.address) != -1){
                        var mes = '查询成功'
                        searchlist.push(list1[a])
                    }
                }else {
                    if(list1[a].name.indexOf(params.name) != -1 && list1[a].address.indexOf(params.address) != -1){
                        var mes = '查询成功'
                        searchlist.push(list1[a])
                    }
                }



              }
            res.json({
                success_code: 200,
                mes:mes,
                admin:searchlist,

            })
        }
    });

});
// 根据caseid修改
app.post('/changeinfo', function(req, res){
    let sqlStr = sql.user.update;
    let params = req.query;
    conn.query(sqlStr,[params.name,params.descibe,params.address,params.caseid], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                mes:'修改成功',
                status:true
            })
        }
    });
});
// 根据caseid删除
app.post('/del', function(req, res){
    let sqlStr = sql.user.del;
    let params = req.query;
    conn.query(sqlStr, [params.caseid], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                mes:'删除成功',
                status:true
            })
        }
    });
});

//登陆
var list = []
app.get('/login',function (req,res) {
    var response = {
        "account":req.query.account,
        "password":req.query.password,
    };
    var selectSQL = "select account,password from user where account = '"+req.query.account+"' and password = '"+req.query.password+"'";
    var serch = sql.user.info;
    conn.query(serch, [response.account], (err, result) => {
        if (err) {
            res.json(err);
        }else {
           list = result

        }

    });
    var  addSqlParams = [req.query.account,req.query.password];
    conn.query(selectSQL,addSqlParams,function (err, result) {
        if(err){
            return;
        }else {

            if(list.length>0 && result.length>0){
                if(list.account==result.account){
                    if(list.password==result.password){
                            res.json({
                                mes:'登录成功',
                                pic:list[0].pic,
                                statu:true,
                                userid:list[0].userid
                            })

                    }else {
                        res.json({
                            mes:'密码错误',
                            statu:0
                        })
                    }
                }else {
                    res.json({
                        mes:'帐号错误',
                        statu:0
                    })
                }
            }else {
                res.json({
                    mes:'帐号或密码错误',
                    statu:0
                })
            }

        }

    });

})

// 验证码登陆
app.post('/codelogin', function(req, res){
    let sqlStr = "select account from user where account = '"+req.query.account+"'"
    let params = req.query;

    conn.query(sqlStr, [params.account ], (err, result) => {
        if(params.code=='5050215'){
            res.json({
                mes:'查询成功',
                status:true
            })
        }else {
            res.json({
                mes:err,
                status:0
            })
        }

    });
});

// 待办事项

app.post('/dealt', function(req, res) {
    let sqlStr = sql.user.dealt;
    let params = req.query;
    conn.query(sqlStr, [params.userid],function(err, result) {
        if (err) {
            res.json({
                message:'查询失败',
                is:err,
            });
        }else {
            res.json({
                message:' 查询成功',
                dealt: result,
            })
        }
    });
});
//发送验证码
app.get('/sendcode', function(req, res){
    let params = req.query;
    conn.query((err, result) => {
        if(params.phone=='18385300473'){
            res.json({
                mes:'验证码发送成功',
                code:'5050215',
                status:1
            })
        }else {
            res.json({
                mes:'验证码发送失败',
                code:'',
                status:0
            })
        }
    });
});

// 根据id删除待办事项

app.post('/deldealt', function(req, res){
    let sqlStr = sql.user.deldealt;
    let params = req.query;
    conn.query(sqlStr, [params.id], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                mes:'删除成功',
                status:true
            })
        }
    });
});
// 添加待办事项

app.post('/adddealt', function(req, res){
    let sqlStr = sql.user.adddealt;
    let params = req.query;
    conn.query(sqlStr, [params.title,params.userid], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                mes:'添加成功',
                status:true
            })
        }
    });
});
//修改
// 根据id修改待办事项
app.post('/changedealt', function(req, res){
    let sqlStr = sql.user.updatedealt;
    let params = req.query;
    let num = params.id
    let idnum = parseInt(num)
    conn.query(sqlStr, [params.title,params.userid,idnum], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                mes:'修改成功',
                status:true
            })
        }
    });
});

//添加图片到指定的文件进行存储
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/')
        //文件保存路径
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({storage: storage})
app.post('/uploader', upload.single('file'), function (req, res, next) {
    //定义接口
    // console.log(req.file)
    res.send('/img/'+req.file.filename)
})

// 添加用户信息
app.post('/add', function(req, res){
    let sqlStr = sql.user.add;
    let params = req.query;
    conn.query(sqlStr, [params.name,params.userid,params.state,params.thumb,params.date,params.address,params.describe], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                mes:'添加成功',
                status:true
            })
        }
    });
});
// 删除所有表格数据
app.post('/delall', function(req, res){
    let sqlStr = sql.user.delall;
    let params = req.query;
    conn.query(sqlStr, [params.userid],(err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                mes:'删除所有成功',
                status:true
            })
        }
    });
});

app.listen(8888, () => {
    console.log('Server running at http://192.168.1.104');
})

