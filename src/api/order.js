// 订单相关

import req from '@/utils/request'

/*  获取订单列表 */
export function getOrderList(params) {
    return req.get("/order/list", params);
}

/*  修改订单 */
export function editOrder(params) {
    return req.post("/order/edit", params);
}

/*  获取报表数据 */
export function getChartData() {
    return req.get("/order/totaldata");
}

/*  获取商品统计 */
export function getGoodsTotal(params) {
    return req.get("/order/ordertotal", params);
}