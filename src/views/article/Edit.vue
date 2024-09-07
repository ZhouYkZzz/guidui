<template>
  <page-container title="审核认定">
    <div>
      <!-- 搜索功能 -->
      <div style="margin-bottom: 20px;">
        <el-input v-model="searchCustomerName" placeholder="请输入客户名称" style="width: 200px; margin-right: 10px;" @input="handleSearch" />
        <el-select v-model="searchAuditStatus" placeholder="请选择审核状态" style="width: 150px;" @change="handleSearch">
          <el-option label="全部" value="" />
          <el-option label="未审核" value="未审核" />
          <el-option label="同意" value="同意" />
          <el-option label="拒绝" value="拒绝" />
        </el-select>
      </div>

      <el-table :data="filteredBreachList" style="width: 100%">
        <el-table-column prop="CustomerName" label="客户名称" />
        <el-table-column label="违约原因">
          <template #default="scope">
            {{ getReason(scope.row.ReasonID) }}
          </template>
        </el-table-column>
        <el-table-column prop="ExternalRating" label="外部评级" />
        <el-table-column prop="Severity" label="严重程度" />
        <el-table-column prop="Remarks" label="备注" />
        <el-table-column prop="Attachment" label="附件" />
        <!-- 新增审核状态列 -->
        <el-table-column label="审核状态">
          <template #default="scope">
            <el-select v-model="scope.row.AuditStatus" @change="UpdateState(scope.row)">
              <el-option label="未审核" value="未审核" />
              <el-option label="同意" value="同意" />
              <el-option label="拒绝" value="拒绝" />
            </el-select>
          </template>
        </el-table-column>
        <!-- 新增删除按钮列 -->
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" @click="deleteBreach(scope.row.ID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </page-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElSelect, ElOption, ElInput, ElButton } from 'element-plus'
import { artGetBreachService, artGetReasonService, artDelService,artGetReviewDetailService } from '@/api/article.js'
import {useUserStore} from '@/stores'

const userStore = useUserStore()
const breachList = ref([]) // 违约信息列表
const reasonsList = ref([]) // 违约原因列表
const searchCustomerName = ref('') // 搜索客户名称
const searchAuditStatus = ref('') // 搜索审核状态

onMounted(async () => {
    await fetchReasonsList();
    await fetchBreachList();
});

async function fetchBreachList() {
    try {
        const breachResponse = await artGetBreachService();  
        if (breachResponse && breachResponse.data) {  
            console.log('成功获取违约信息列表:', breachResponse.data);
            // 初始化审核状态为“未审核”
            breachList.value = breachResponse.data.data.map(item => ({
                ...item,
                AuditStatus: '未审核'
            }));
        } else {
            throw new Error('无效的响应格式');  
        }  
    } catch (error) {  
        console.error('API 调用失败:', error);
        handleApiError(error);
    }
}

async function fetchReasonsList() {
    try {
        const reasonResponse = await artGetReasonService();  
        if (reasonResponse && reasonResponse.data) {  
            console.log('成功获取违约原因列表:', reasonResponse.data);
            reasonsList.value = reasonResponse.data;  
        } else {
            throw new Error('无效的响应格式');  
        }  
    } catch (error) {  
        console.error('API 调用失败:', error);
        handleApiError(error);
    }
}

// 处理 API 请求错误
function handleApiError(error) {
    if (error.response) {  
        console.error('响应数据:', error.response.data);  
        console.error('响应状态:', error.response.status);  
        console.error('响应头:', error.response.headers);  
    } else if (error.request) {  
        console.error('请求数据:', error.request);  
    } else {  
        console.error('错误信息:', error.message);  
    }  
    const errorMessage = error?.message || '未知错误';  
    ElMessage.error('获取数据失败: ' + errorMessage);  
}

// 获取 ReasonID 对应的 Reason 名称
function getReason(reasonID) {
  const reason = reasonsList.value.find(item => item.ID === reasonID)
  return reason ? reason.Reason : '未知理由'
}

// 更新审核状态的函数
async function UpdateState(row) {
    console.log('更新审核状态:', row.AuditStatus);
    try {
        // 构建请求数据
        const data = {
            application_id: row.ID, // 假设 row.ID 是 application_id
            reviewer_id: userStore.user.userID, // 从 userStore 中获取 reviewer_id
            status: row.AuditStatus, // 当前审核状态
        };

        // 调用 API 服务
        const response = await artGetReviewDetailService(data);
        console.log('审核状态更新成功:', response);

        // 成功信息提示
        ElMessage.success('审核状态更新成功！');
    } catch (error) {
        console.error('审核状态更新失败:', error);
        const errorMessage = error?.message || '未知错误';
        ElMessage.error('审核状态更新失败: ' + errorMessage);
    }
}

// 处理搜索
function handleSearch() {
    // 过滤 breachList
    filteredBreachList.value = breachList.value.filter(item => {
        const nameMatch = item.CustomerName.includes(searchCustomerName.value);
        const statusMatch = searchAuditStatus.value === '' || item.AuditStatus === searchAuditStatus.value;
        return nameMatch && statusMatch;
    });
}

// 计算属性：过滤后的 breachList
const filteredBreachList = computed(() => {
    return breachList.value.filter(item => {
        const nameMatch = item.CustomerName.includes(searchCustomerName.value);
        const statusMatch = searchAuditStatus.value === '' || item.AuditStatus === searchAuditStatus.value;
        return nameMatch && statusMatch;
    });
});

// 删除违约信息的函数
async function deleteBreach(id) {
    try {
        await artDelService(id);
        ElMessage.success('删除成功');
        // 重新获取违约信息列表
        await fetchBreachList();
    } catch (error) {
        console.error('删除失败:', error);
        const errorMessage = error?.message || '未知错误';
        ElMessage.error('删除失败: ' + errorMessage);
    }
}
</script>

<style lang="scss" scoped>
.table-container {
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
