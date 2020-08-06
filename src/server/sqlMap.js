var sqlMap = {
  user: {
    add: 'insert into admin (name,age) values (?,?)',
    // 查询用户
    select: 'select * from admin where name =?',
    // 登陆用户查询信息
    info: 'select * from user where account =?',

    // 删除
    del:'delete from admin where id = ?',
    // 查询所有数据
    all:'SELECT * FROM admin',

    // 修改数据
    update:'UPDATE admin SET name = ?,money = ?,address = ? WHERE id = ?',

    // 查询轮播图
    imgsrc:'SELECT * FROM bannerlist',

    // 查询所有表
    newslist:'SELECT * FROM newslist',
    newpro: 'select * from newslist where new_id =?',
    // 查询赛事
    wx_event:'SELECT * FROM wx_event',
// 查询商品的
    active:'SELECT * FROM active',
    // 查看青年活动的
    young:'SELECT * FROM young',
    // 查看成年活动的
    Chenyoung:'SELECT * FROM Chenyoung',
    //查看旅行活动的
    travel:'SELECT * FROM travel',
    //查看待办事项
    dealt:'SELECT * FROM dealt',
    // 查询购物车
    cartlist:'SELECT * FROM cartlist',
    // 根据id删除商品列表
    deldealt: 'delete from dealt where id =?',

    // 修改数据
    updatedealt:'UPDATE dealt SET title = ?,status = ? WHERE id = ?',
    // 添加待办事项
    adddealt: 'insert into dealt (title,status) values (?,?)',
    // 添加购物车
    addlist: 'insert into cartlist (goods_id,goods_name,goods_title,goods_price,goods_price_yh,goods_count,goods_pic) values (?,?,?,?,?,?,?)',

      // 订单管理的dfk
      dfk:'SELECT * FROM dfk',
      // 订单管理的dfh
      dfh:'SELECT * FROM dfh',
      // 订单管理的dfh
      dsh:'SELECT * FROM dsh',
      // 订单管理的所有
      orderlist:'SELECT * FROM orderlist',
      // 删除待付款商品
      del_order:'delete from dfk where order_id= ?',
      // 根据id查询商品
      order1:'select * from dfk where order_id =?',
      order2:'select * from dfh where order_id =?',
      order3:'select * from dsh where order_id =?',
      orderlist1:'SELECT * FROM orderlist where order_id= ?',
      ding:'SELECT * FROM orderding where goods_id= ?',
      // 地址
      address:'SELECT * FROM address',
      // 根据id查询地址
      address_id:'SELECT * FROM address where address_id= ?',
      // 添加订单
      addorder: 'insert into orderlist (goods_pic,goods_name,goods_title,goods_price,goods_price_sy,goods_price_yh,goods_count,goods_total,order_total,status,goods_id) values (?,?,?,?,?,?,?,?,?,?,?)',
      // 查询收藏列表
    scit:'SELECT * FROM souchang',
    // 添加收藏
    collection:'insert into souchang (goods_name,goods_pic,goods_price_yh,goods_price_sy,goods_price,goods_id,goods_title,goods_detail,goods_remaining) values (?,?,?,?,?,?,?,?,?)',
  // 删除收藏
    delit:'delete from souchang where id= ?',
    // 洗漱类
    xishu:'SELECT * FROM xishu',
    // 首饰类
    shousi:'SELECT * FROM shousi',
  }
}
module.exports = sqlMap
