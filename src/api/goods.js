// 商品相关的

import req from '@/utils/request'


/*  获取分类 */
export function getCate(params) {
    return req.get("/goods/catelist", params);
}

/*  编辑分类 */
export function editCate(params) {
    return req.post("/goods/editcate", params);
}

/*  删除分类 */
export function delCate(params) {
    return req.get("/goods/delcate", params);
}

/*  添加分类 */
export function addCate(params) {
    return req.post("/goods/add", params);
}

/*  查询分类名称 */
export function getCateName() {
    return req.get("/goods/categories");
}

/* 获取商品列表 */
export function getGoodsList(params) {
    return req.get("/goods/list", params);
}

/* 获取商品列表 */
export function delGoods(params) {
    return req.get("/goods/del", params);
}
/* 修改商品 */
export function editGoods(params) {
    return req.post("/goods/edit", params);
}
