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
export const artGetListService = () => request.get('/article')

// 文章1：生成文章
export const artPublishService = (data) => request.post('/aigc/finalArticle', data)

// 文章1：获取文章详情
export const artGetDetailService = (id) =>
  request.get('/sort', {
    params: { id }
  })

// 文章1：编辑文章接口
export const artEditService = (id, data) =>
  request.put('/article/save', data, {
    params: { id }
  })
//保存文章接口
export const artSave = (data) =>
  request.post('/article/save', data)

// 文章：删除文章接口
export const artDelService = (id) =>
  request.delete('/article/delete/'+id)

//生成大纲
  export const artOutlineService = (data) => request.post('/aigc/outline', data)

  //登录
  export const registerService = (data) => request.post('/register', data)
