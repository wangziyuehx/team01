const db =require('./server/mysql')
const express = require('express')
const mysql = require('mysql');
const sql = require('./sqlMap');//sql语句
const app = express();
app.use(express.static('public'));

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

// 查看新闻列表
app.post('/newslist', function(req, res) {
    let sqlStr = sql.user.newslist;
    // let conn = new DBHelper().getConn();
    conn.query(sqlStr, function(err, result) {
        if (err) {
            res.json({
                message:'查询失败',
                is:err,
            });
        }else {
            res.json({
                message:' 查询成功',
                list: result,
            })
        }
    });
});
// 多表查询整个列表
var list1 = []
var list2 = []
var list3 = []
var list4 = []
var list5 = []
app.post('/index', (req, res) => {
    let admin = sql.user.all

    // // 请求显示新闻列表
    // conn.query(news, (err, result) => {
    //     if (err) {
    //         res.json({
    //             message:'查询失败',
    //             is:err,
    //         });
    //     }else {
    //         list3 = result
    //     }
    // });
    // // 请求显示赛事列表
    // conn.query(event, (err, result) => {
    //     if (err) {
    //         res.json({
    //             message:'查询失败',
    //             is:err,
    //         });
    //     }else {
    //         list4 = result
    //     }
    // });
    // // 请求显示活动列表
    // conn.query(active, (err, result) => {
    //     if (err) {
    //         res.json({
    //             message:'查询失败',
    //             is:err,
    //         });
    //     }else {
    //         list5 = result
    //     }
    // });
    // // 请求获取图片列表
    // conn.query(sqlStr, (err, result) => {
    //     if (err) {
    //         res.json({
    //             message:'查询失败',
    //             is:err,
    //         });
    //     }else {
    //         list2 = result
    //     }
    // });
    // 请求获取个人信息列表
    conn.query(admin, (err, result) => {
        if (err) {
            res.json({
                message:'查询失败',
                is:err,
            });
        }else {
            list1 = result
            res.json({
                success_code: 200,
                mes:'查询成功',
                admin:list1,

            })
        }
    });
});

// 根据商品名称查询商品
app.post('/goods', function(req, res){
    let sqlStr = sql.user.select;
    let params = req.query;
    console.log(req)
    conn.query(sqlStr, [params.goods_id], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({result})
        }
    });
});

// 根据姓名查询
app.post('/infoname', function(req, res){
    let sqlStr = sql.user.select;
    let params = req.query;
    conn.query(sqlStr, [params.name], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({result})
        }
    });
});
// 根据id修改
app.post('/changeinfo', function(req, res){
    let sqlStr = sql.user.update;
    let params = req.query;
    conn.query(sqlStr,[params.name,params.money,params.address,params.id], (err, result) => {
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
// 根据id删除
app.post('/delinfo', function(req, res){
    let sqlStr = sql.user.del;
    let params = req.query;
    conn.query(sqlStr, [params.id], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({result})
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
        }
        if(result=='')
        { res.json({
            mes:'帐号密码错误',
            statu:0
        })
        }
        else
        {
            res.json({
                mes:'登录成功',
                pic:list[0].pic,
                statu:true
            })

        }
    });

})
// 待办事项

app.post('/dealt', function(req, res) {
    let sqlStr = sql.user.dealt;
    conn.query(sqlStr, function(err, result) {
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
    conn.query(sqlStr, [params.title,params.status], (err, result) => {
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
    console.log(typeof (idnum))
    conn.query(sqlStr, [params.title,params.status,idnum], (err, result) => {
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

//添加图片的

// 购物车


app.post('/cart/list', function(req, res) {
    let sqlStr = sql.user.cartlist;
    conn.query(sqlStr, function(err, result) {
        if (err) {
            res.json({
                message:'查询失败',
                is:err,
            });
        }else {
            res.json({
                message:' 查询成功',
                cartlist: result,

            })
        }
    });
});
// 删除购物车列表
app.post('/cart/delete', function(req, res){
    let sqlStr = sql.user.dellist;
    let params = req.query;
    console.log(params)
    conn.query(sqlStr, [params.goods_id], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({mes:'ok'})
        }
    });
});

// 增加商品
app.post('/cart/add', function(req, res){
    let sqlStr = sql.user.addlist;
    let params = req.query;
    conn.query(sqlStr, [params.goods_id,params.goods_name,params.goods_title,params.goods_price,params.goods_price_yh,
            params.goods_count,params.goods_pic], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                result:1,
                message:'添加成功'
            })
        }
    });
});
// 个人中心页面
var d_fk = 1
var  d_fh = 1
var d_sh = 1
var d_pj = 0
app.post('/center', function(req, res){
    res.json({
        count:{'d_fk':d_fk,'d_fh':d_fh,'d_sh':d_sh,'d_pj':d_pj},
        message:'请求成功'
    })
});

// 订单管理
var dfk = []
var dsh = []
var dfh = []
var orderlist=[]
app.post('/orderlist', function(req, res){
    let sqlStr1 = sql.user.dfk;
    let sqlStr2 = sql.user.dfh;
    let sqlStr3 = sql.user.dsh;
    let sqlStr4 = sql.user.orderlist;
    conn.query(sqlStr1,  (err, result) => {
        if (err) {
            res.json(err);
        }else {
            dfk = result
        }
    });
    conn.query(sqlStr2,  (err, result) => {
        if (err) {
            res.json(err);
        }else {
            dfh = result
        }
    });
    conn.query(sqlStr3,  (err, result) => {
        if (err) {
            res.json(err);
        }else {
            dsh = result
        }
    });
    conn.query(sqlStr4,  (err, result) => {
        if (err) {
            res.json(err);
        }else {
            orderlist = result
        }
    });
    // 最后的结果
    res.json({
        mes:'ok',
        dfk:dfk,
        dfh: dfh,
        dsh:dsh,
        orderlist:orderlist,

    })

});

// 删除待付款的商品
app.post('/order/delete', function(req, res){
    let sqlStr = sql.user.del_order;
    let params = req.query;
    console.log(params)
    conn.query(sqlStr, [params.order_id], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({mes:'ok'})
        }
    });
});

// 根据id查询
var payWay=[{'name':'微信支付'},{'name':'健康币支付'},{'name':'其他'}]
// var order ={express_name:'贵州省贵阳市'}
app.post('/orderpro', function(req, res){
    let sqlStr1 = sql.user.order1;
    let sqlStr2 = sql.user.order2;
    let sqlStr3 = sql.user.order3;
    let sqlStr4 = sql.user.orderlist1
    let params = req.query;
    console.log(params)

        conn.query(sqlStr4,  [params.order_id], (err, result) => {
            if (err) {
                res.json(err);
            }else {
                res.json({
                    orderpro:result,
                    payway:payWay,
                })
            }
        });


});

// 地址显示
app.post('/address/list', function(req, res){
    let sqlStr = sql.user.address;
    conn.query(sqlStr,  (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                mes:1,
                addrlist:result
            })
        }
    });
});
// 编辑地址的
app.post('/center/address/info', function(req, res){
    let sqlStr = sql.user.address_id;
    let params = req.query;
    conn.query(sqlStr,  [params.address_id], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                info:result
            })
        }
    });
});

// 订单详情
// 根据id查询
var payWay=[{'name':'微信支付',bianma:'pay_wx'},{'name':'健康币支付',bianma:'pay_jkb'}]
// var order ={express_name:'贵州省贵阳市'}
app.post('/ding', function(req, res){
    let ding = sql.user.ding
    let params = req.query;
    console.log(params)

    conn.query(ding,[params.goods_id], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                ding:result,
                payway:payWay,
            })
        }
    });


});

// 提交订单操作
app.post('/orderit', function(req, res){
    let addit = sql.user.addorder
    let params = req.query;
    console.log(params)

    conn.query(addit,[params.goods_pic,params.goods_name,params.goods_title,params.goods_price,params.goods_price_sy,params.goods_price_yh,params.goods_count,params.goods_total,params.order_total,params.status,params.goods_id], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                result,

            })
        }
    });


});
// 收藏列表
app.post('/collection/list', function(req, res){
    let sclist = sql.user.scit
    conn.query(sclist, (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                list:result,

            })
        }
    });


});
// 点击收藏
app.post('/collection/add', function(req, res){
    let addit = sql.user.collection
    let params = req.query;
    console.log(params)
    conn.query(addit,[params.goods_name,params.goods_pic,params.goods_price_yh,params.goods_price_sy,params.goods_price,params.goods_id,params.goods_title,params.detail,params.goods_remaining], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                result,
            })
        }
    });


});
// 根据id删除
app.post('/collection/delete', function(req, res){
    let delit = sql.user.delit
    let params = req.query;
    console.log(params)
    conn.query(delit,[params.id], (err, result) => {
        if (err) {
            res.json(err);
        }else {
            res.json({
                result,
            })
        }
    });


});
// 查询洗漱用品
app.post('/goodfl', function(req, res){
    let xishu = sql.user.xishu
    let shousi = sql.user.shousi
    let params = req.query;
    console.log(params)
    if(params.category_name=="首饰类"){
        conn.query(shousi,(err, result) => {
            if (err) {
                res.json(err);
            }else {
                res.json({
                    goods:result,
                })
            }
        });
    }else {
        conn.query(xishu,(err, result) => {
            if (err) {
                res.json(err);
            }else {
                res.json({
                    goods:result,
                })
            }
        });
    }




});
app.listen(8888, () => {
    // console.log('Server running at http://192.168.0.118:8888');
    // 自己手机的
    console.log('Server running at http://192.168.3.50:8888');
})

