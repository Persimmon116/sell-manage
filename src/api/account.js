/**
 * 账号功能模块相关所有请求
 */

import req from "@/utils/request";

/* 登录请求 */
export function checkLogin(params) {
    return req.post("/users/checkLogin", params);
}
/* 添加账号请求 */
export function addAccount(params) {
    return req.post("/users/add", params);
}

/* 获取账号列表 */
export function getAccountList(params) {
    return req.get("/users/list", params);
}
/* 删除账户 */
export function delAccount(params) {
    return req.get("/users/del", params);
}
/* 批量删除 */
export function batchDel(params) {
    return req.get("/users/batchdel", params);
}
/* 保存编辑 */
export function saveEditAccount(params) {
    return req.post("/users/edit", params);
}
