import {request} from "@/api/index";

// 查询分类列表
export function getCategoryList(params) {
  return request({
    url: '/api/category/getCategoryList',
    method: 'get',
    params,
  });
}

// 增加分类
export function addCategory(data) {
  return request({
    url: '/api/category/addCategory',
    method: 'post',
    data,
  });
}

// 修改分类名称
export function updateCategory(data) {
  return request({
    url: '/api/category/updateCategory',
    method: 'post',
    data,
  });
}


// 删除分类
export function delCategory(params) {
  return request({
    url: '/api/category/delCategory',
    method: 'get',
    params,
  });
}

