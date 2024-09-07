<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Check } from '@element-plus/icons-vue' // 导入 Check 图标
import { useRouter } from 'vue-router'
import { artGetRebirthReviewService, artDeleteRebirthReviewService } from '@/api/article' // 获取与删除 API

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
    reviewList.value = res.data.data // 假设返回的数据结构为 res.data
    console.log('review', reviewList.value)
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

// 处理删除违约重生审核的逻辑
const handleRebirth = (row) => {
  ElMessageBox.confirm(
    '确定要重生该条违约记录吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      // 调用删除 API，假设使用 row.id 作为删除记录的标识
      await artDeleteRebirthReviewService(row.id)
      ElMessage.success('重生成功')
      // 删除成功后，重新获取审核列表
      getReviewList()
    } catch (error) {
      ElMessage.error('重生失败')
    }
  }).catch(() => {
    ElMessage.info('已取消重生')
  })
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
      <el-table-column label="违约客户" prop="customer_name" width="150" align="center" />
      <el-table-column label="认定违约原因" prop="default_reason" width="150" align="center" />
      <el-table-column label="严重程度" prop="severity" width="80" align="center" />
      <el-table-column label="认定人" prop="reviewer" width="100" align="center" />
      <el-table-column label="认定申请时间" prop="application_time" width="120" align="center" />
      <el-table-column label="最新外部等级" prop="external_rating" align="center" />
      <el-table-column label="重生原因" prop="rebirth_reason" align="center" />
      <el-table-column label="操作" width="150" align="center">
        <template #default="{ row }">
          <!-- 圆形按钮，带有 Check 图标 -->
          <el-button 
            type="success" 
            :icon="Check" 
            circle 
            @click="handleRebirth(row)">
          </el-button>
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

.el-button {
  color: white;
}
</style>
