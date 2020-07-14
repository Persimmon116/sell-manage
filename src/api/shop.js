// 店铺管理相关

import req from '@/utils/request'

/*  获取店铺信息 */
export function getShopInfo() {
    return req.get("/shop/info");
}

/*  店铺内容修改 */
export function shopContentEdit(params) {
    return req.post("/shop/edit", params);
}