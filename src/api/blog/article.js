import { request } from "@/api/index";

// 查询分类列表
export function getBlogList(params) {
  return request({
    url: '/api/blog/getBlogList',
    method: 'get',
    params,
  });
}

// 查询分类列表
export function addBlog(data) {
  return request({
    url: '/api/blog/addBlog',
    method: 'post',
    data,
  });
}