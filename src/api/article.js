import request from '@/utils/request'
// 分类：获取文章分类
export const artGetChannelsService = () => request.get('/my/cate/list')
// 分类：添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
// 分类：编辑文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
// 分类：删除文章分类
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章1：获取文章列表
export const artGetListService = () => request.get('/list')

// 文章1：添加文章
// 注意：data需要是一个formData格式的对象
export const artPublishService = (data) => request.post('/create', data)

// 文章1：获取文章详情
export const artGetDetailService = (id) =>
  request.get('/sort', {
    params: { id }
  })

// 文章1：编辑文章接口
export const artEditService = (id, data) =>
  request.put('/save', data, {
    params: { id }
  })

// 文章：删除文章接口
export const artDelService = (id) =>
  request.delete('/my/article/info', { params: { id } })
  export const artOutlineService = (data) => request.post('/createoutline', data)