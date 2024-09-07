<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { artGetResultService } from '@/api/article' // 获取违约信息查询 API

const customerList = ref([]) // 违约客户列表
const total = ref(0) // 总条数
const loading = ref(false) // loading 状态
const router = useRouter() // 使用 vue-router

// 定义分页参数
const params = ref({
  pagenum: 1, // 当前页码
  pagesize: 10, // 每页显示的条数
})

// 获取违约信息查询列表的函数
const getCustomerList = async () => {
  loading.value = true
  try {
    const res = await artGetResultService() // API 请求获取数据
    console.log("res",res.data.data)
    if (res.data.status === 0) {
      customerList.value = res.data.data // 假设返回的数据结构为数组
      console.log("asdf",customerList.value)
      total.value = res.data.length
    } else {
      throw new Error('数据格式不正确')
    }
  } catch (error) {
    ElMessage.error('获取违约信息查询列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getCustomerList()
})

// 分页处理
const onSizeChange = (size) => {
  params.value.pagesize = size
  getCustomerList()
}

const onCurrentChange = (page) => {
  params.value.pagenum = page
  getCustomerList()
}

// 跳转到违约重生详情页面
const goToRebirthDetail = (row) => {
  console.log("asdfasdfads",row.application_id)
  console.log(row.customer_name)

  router.push({ name: 'rebirthDetail', params: { id: row.application_id} })
}
</script>

<template>
  <page-container title="违约信息查询列表">
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item>
        <el-input placeholder="输入客户名称搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getCustomerList" type="primary">搜索</el-button>
        <el-button @click="getCustomerList">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="customerList" v-loading="loading">
      <el-table-column label="违约客户" prop="customer_name" width="150" align="center" />
      <el-table-column label="审核状态" prop="review_status" width="100" align="center" />
      <el-table-column label="认定违约原因" prop="default_reason" width="150" align="center" />
      <el-table-column label="严重程度" prop="severity" width="80" align="center" />
      <el-table-column label="认定人" prop="reviewer" width="100" align="center" />
      <el-table-column label="认定审核时间" prop="review_time" width="120" align="center" />
      <el-table-column label="最新外部等级" prop="external_rating" align="center" />
      <el-table-column label="操作" width="150" align="center">
        <template #default="{ row }">
          <el-button type="primary" @click="goToRebirthDetail(row)">查看详情</el-button>
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
