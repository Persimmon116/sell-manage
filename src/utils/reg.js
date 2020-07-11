/*
    相关正则js
 */
// 用户名正则
export const NameReg = /^[a-zA-Z0-9]{4,16}$/;
// 是否为中文正则
export const Chinese = /^[^\u4e00-\u9fa5]+$/;
// 密码正则
export const PwdReg = /(?=.*\d)[A-Za-z\d$@!%*#?&]{3,}$/;