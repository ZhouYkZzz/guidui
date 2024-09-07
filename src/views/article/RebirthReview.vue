<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { artGetRebirthReviewService } from '@/api/article' // 获取违约重生审核 API

const reviewList = ref([]) // 违约重生审核列表
const total = ref(0) // 总条数
const loading = ref(false) // loading 状态
const router = useRouter()

// 定义请求参数对象
const params = ref({
  pagenum: 1, // 当前页
  pagesize: 5, // 每页条数
})

// 获取违约重生审核列表的函数
const getReviewList = async () => {
  loading.value = true
  try {
    const res = await artGetRebirthReviewService() // API 请求获取数据
    reviewList.value = res.data // 假设返回的数据结构为 res.data
    total.value = reviewList.value.length
  } catch (error) {
    ElMessage.error('获取违约重生审核列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getReviewList()
})

// 分页处理
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getReviewList()
}

const onCurrentChange = (page) => {
  params.value.pagenum = page
  getReviewList()
}

// 跳转到违约重生审核详情页面
const goToReviewDetail = (row) => {
  router.push({ name: 'rebirthReviewDetail', params: { id: row.id } }) // 跳转到审核详情页
}
</script>

<template>
  <page-container title="违约重生审核列表">
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item>
        <el-input placeholder="输入客户名称搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getReviewList" type="primary">搜索</el-button>
        <el-button @click="getReviewList">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="reviewList" v-loading="loading">
      <el-table-column label="违约客户" prop="customer_name" width="150" align="center">
        <template #default="{ row }">{{ row.customer_name }}</template>
      </el-table-column>
      <el-table-column label="审核状态" prop="status" width="100" align="center">
        <template #default="{ row }">{{ row.status }}</template>
      </el-table-column>
      <el-table-column label="认定违约原因" prop="default_reason" width="150" align="center">
        <template #default="{ row }">{{ row.default_reason }}</template>
      </el-table-column>
      <el-table-column label="严重程度" prop="severity" width="80" align="center">
        <template #default="{ row }">{{ row.severity }}</template>
      </el-table-column>
      <el-table-column label="认定人" prop="identified_by" width="100" align="center">
        <template #default="{ row }">{{ row.identified_by }}</template>
      </el-table-column>
      <el-table-column label="认定申请时间" prop="application_time" width="120" align="center">
        <template #default="{ row }">{{ row.application_time }}</template>
      </el-table-column>
      <el-table-column label="重生原因" prop="rebirth_reason" align="center">
        <template #default="{ row }">{{ row.rebirth_reason }}</template>
      </el-table-column>
      <el-table-column label="最新外部等级" prop="latest_external_rating" width="120" align="center">
        <template #default="{ row }">{{ row.latest_external_rating }}</template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="150" align="center">
        <template #default="{ row }">
          <el-button type="primary" @click="goToReviewDetail(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[5, 10, 20]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
</template>

<style scoped>
.page-container {
  padding: 20px;
}

.el-form-item {
  margin-bottom: 15px;
}
</style>
