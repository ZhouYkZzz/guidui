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
//1.1: 获取违约原因
export const artGetReasonService = () =>   
  request.get('/reasons/default');  
// 2.1：获取违约申请列表
export const artGetBreachService = () => request.get('/applications')

// 2.2：创建新的违约申请
export const artCreateBreachService = (data) =>
  request.post('/applications/create', data)

// 2.3：获取特定违约申请详情
export const artGetDetailService = (id) =>
  request.get('/applications', {
    params: { id }
  })

// 2.4更新违约申请
export const artEditService = (id, data) =>
  request.put('/applications', data, {
    params: { id }
  })

// 2.5：删除违约接口
export const artDelService = (id) => request.delete('/applications/'+ id)

//3.1获取违约认定审核列表
export const artGetReviewService = () => request.get('/reviews')

//3.2创建新的违约认定审核
export const artCreateReviewService = (data) => request.post('/reviews', data)

//3.3获取特定违约认定审核详情
export const artGetReviewDetailService = (id) =>
  request.get('/reviews', {
    params: { id }
  })

//3.4更新违约认定审核
export const artEditReviewService = (id, data) =>
  request.put('/reviews', data, {
    params: { id }
  })
//3.5删除违约认定审核
export const artDelReviewService = (id) => request.delete('/reviews' + id)

//4.1取所有违约信息查询列表
export const artGetResultService = () => request.get('/queries')

//4.2获取特定违约认定结果详情
export const artGetResultDetailService = (id) =>
  request.get('/queries/'+id);


//5.1获取违约重生申请列表`
export const artGetRebirthService = () => request.get('/rebirth/')

//5.2创建新的违约重生申请
export const artCreateRebirthService = (data) =>
  request.post('/rebirth/create', data)

// //5.3获取特定违约重生申请详情
// export const artGetRebirthDetailService = (id) =>
//   request.get('/rebirth', {
//     params: { id }
//   })

// //5.4更新违约重生申请
// export const artEditRebirthService = (id, data) =>
//   request.put('/rebirth', data, {
//     params: { id }
//   })

//5.5删除违约重生申请
export const artDelRebirthService = (id) =>
  request.delete(`/rebirth/${id}`)


//6.1获取违约重生审核列表
export const artGetRebirthReviewService = () => request.get('/rebirth/review')

//6.2创建新的违约重生审核
export const artCreateRebirthReviewService = (data) =>
  request.post('/rebirth', data)

//6.3违约重生
export const artDeleteRebirthReviewService = (id) =>
  request.delete('/rebirth/'+id)

// //6.3获取特定违约重生审核详情
// export const artGetRebirthReviewDetailService = (id) =>
//   request.get('/rebirth-reviews', {
//     params: { id }
//   })

// //6.4更新违约重生审核
// export const artEditRebirthReviewService = (id, data) =>
//   request.put('/rebirth-reviews', data, {
//     params: { id }
//   })





//7.1获取行业违约统计数据
export const getIndustryBreachStats = (params) =>
  request.get('/stats/industry/breach', { params })

//7.2获取区域违约统计数据
export const getRegionBreachStats = (params) =>
  request.get('/stats/region/breach', { params })






// 文章1：获取文章列表
export const artGetListService = () => request.get('/article')

// 文章1：生成文章
export const artPublishService = (data) =>
  request.post('/aigc/finalArticle', data)

//保存文章接口
export const artSave = (data) => request.post('/article/save', data)
//生成大纲
  export const artOutlineService = (data) => request.post('/aigc/outline', data)

  //登录
  export const registerService = (data) => request.post('/register', data)
