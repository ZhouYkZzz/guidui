<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { artCreateRebirthService, artGetResultDetailService } from '@/api/article' // API

// 路由和表单数据
const route = useRoute()
const router = useRouter()

// 表单数据
const form = ref({
  application_id: '',
  customer_name: '', // 违约客户
  default_reason: '', // 违约原因
  severity: '', // 严重程度
  applicant: '', // 认定人
  application_time: '', // 认定申请时间
  external_rating: '', // 最新外部等级
  rebirth_reason: '' // 重生原因
})

// 获取特定违约重生申请详情
const getRebirthDetail = async () => {
  try {
    const { id } = route.params // 从路由参数中获取 id
    
    console.log("id",id)

    const res = await artGetResultDetailService(id)
    const data = res.data.data

    console.log("id2",data)
    form.value = {
      application_id: data.application_id,
      customer_name: data.customer_name,
      default_reason: data.default_reason,
      severity: data.severity,
      reviewer: data.reviewer,
      application_time: data.application_time,
      external_rating: data.external_rating,
      rebirth_reason: '' // 重生原因需要用户选择
    }
  } catch (error) { 
    ElMessage.error('获取违约重生详情失败')
  }
}

onMounted(() => {
  getRebirthDetail()
})

// 提交表单
const submitRebirth = async () => {
  try {
    await artCreateRebirthService(form.value) // 提交表单
    ElMessage.success('违约重生提交成功')
    console.log('form',form.value)
    router.push({ name: 'rebirthReview' }) // 提交成功后返回列表
  } catch (error) {
    ElMessage.error('提交失败，请重试')
  }
}
</script>

<template>
  <page-container title="违约重生详情">
    <!-- 表单区域 -->
    <el-form :model="form" label-width="120px">
      <!-- 违约客户 -->
      <el-form-item label="违约客户">
        <el-input v-model="form.customer_name" disabled></el-input>
      </el-form-item>

      <!-- 认定违约原因 -->
      <el-form-item label="认定违约原因">
        <el-input v-model="form.default_reason" disabled></el-input>
      </el-form-item>

      <!-- 严重程度 -->
      <el-form-item label="严重程度">
        <el-input v-model="form.severity" disabled></el-input>
      </el-form-item>

      <!-- 认定人 -->
      <el-form-item label="认定人">
        <el-input v-model="form.reviewer" disabled></el-input>
      </el-form-item>

      <!-- 认定申请时间 -->
      <el-form-item label="认定申请时间">
        <el-input v-model="form.application_time" disabled></el-input>
      </el-form-item>

      <!-- 最新外部等级 -->
      <el-form-item label="最新外部等级">
        <el-input v-model="form.external_rating" disabled></el-input>
      </el-form-item>

      <!-- 选择重生原因 -->
      <el-form-item label="选择重生原因">
        <el-select v-model="form.rebirth_reason" placeholder="请选择重生原因">
          <el-option label="正常结算后解除" value="正常结算后解除"></el-option>
          <el-option label="在其他金融机构违约解除，或外部评级显示为非违约级别" value="在其他金融机构违约解除"></el-option>
          <el-option label="计提比例小于设置界限" value="计提比例小于设置界限"></el-option>
          <el-option label="连续12个月内按时支付本金和利息" value="连续12个月内按时支付本金和利息"></el-option>
          <el-option label="客户的还款意愿和还款能力明显好转，已偿付各项逾期本金、逾期利息和其他费用（包括罚息等），且连续12个月内按时支付本金、利息" value="客户的还款意愿和还款能力好转"></el-option>
          <el-option label="导致违约的关联集团内其他发生违约的客户已经违约重生，解除关联成员的违约设定" value="关联集团违约重生"></el-option>
        </el-select>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitRebirth()">提交</el-button>
      </el-form-item>
    </el-form>
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
