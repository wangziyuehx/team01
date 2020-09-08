var sqlMap = {
  user: {

    // 根据名字查询用户
    selectname: 'select * from admin where name =?',
    selectaddress: 'select * from admin where address =?',
    selectall: 'select * from admin where name =?,address =?',
    // 登陆用户查询信息
    info: 'select * from user where account =?',
    // 修改账户信息
    updateaccount:'UPDATE user SET account = ?,password = ?,pic = ? WHERE userid = ?',
    // 新增用户
    add: 'insert into admin (name,userid,email,thumb,date,address,descibe,caseid) values (?,?,?,?,?,?,?,CEILING(RAND()*9000+1000))',
    // 删除
    del:'delete from admin where caseid = ?',
    // 删除所有数据
    delall:'delete from admin where userid = ?',
    // 查询所有数据
    all:'select * from admin where userid =?',

    // 修改数据
    update:'UPDATE admin SET name = ?,descibe = ?,address = ? WHERE caseid = ?',

    //查看待办事项
    dealt:'select * from dealt where userid =?',
    // 根据id删除待办事项
    deldealt: 'delete from dealt where id =?',

    // 修改数据
    updatedealt:'UPDATE dealt SET title = ?,userid = ? WHERE id = ?',
    // 添加待办事项
    adddealt: 'insert into dealt (title,userid) values (?,?)',

    // 添加邮箱列表
    emaillist: 'select * from emailList where userid =?',
  }
}
module.exports = sqlMap
