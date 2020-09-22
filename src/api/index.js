// api.js
import { httpGet, httpPost } from './http.js';
// 图片地址
export const picurl = 'http://192.168.1.104:8888'
// export const picurl = 'http://139.224.129.91'
// 登陆接口
export const login = (params = {}) => httpGet({ url: '/login', params })
//修改账户信息,
export const changeAccount = (params = {}) => httpPost({ url: '/changeAccount', params })
// 首页数据提取
export const index = (params = {}) => httpPost({ url: '/index', params })

//修改用户信息,
export const change = (params = {}) => httpPost({ url: '/changeinfo', params })
//查询用户
export const infoname = (params = {}) => httpPost({ url: '/infoname', params })
//删除用户
export const del = (params = {}) => httpPost({ url: '/del', params })
//删除所有数据
export const delall = (params = {}) => httpPost({ url: '/delall', params })
//查看待办事项
export const dealt = (params = {}) => httpPost({ url: '/dealt', params })
//删除待办事项
export const deldealt = (params = {}) => httpPost({ url: '/deldealt', params })
//添加待办事项
export const adddealt = (params = {}) =>httpPost({ url: '/adddealt', params })

//修改待办事项
export const changedealt= (params = {}) => httpPost({ url: '/changedealt', params })
//图片上传,
export const img = (params = {}) => httpPost({ url: '/upload', params })
//用户添加
export const add = (params = {}) =>httpPost({ url: '/add', params })
//发送邮箱
export const sendemail = (params = {}) =>httpPost({ url: '/sendemail', params })
