<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { getIndustryBreachStats, getRegionBreachStats } from '@/api/article' // 假设 API 名称

// 控制当前显示的是“行业统计”还是“区域统计”
const currentStatType = ref('industry') // 默认显示行业统计

const industryChart = ref(null) // 行业违约统计图表 DOM
const regionChart = ref(null) // 区域违约统计图表 DOM

// 渲染行业统计图表
const renderIndustryStats = async () => {
  const data = await getIndustryBreachStats() // API 获取行业违约数据
  const chart = echarts.init(industryChart.value)
  
  const option = {
    title: { text: '行业违约统计' },
    tooltip: {},
    legend: { data: ['违约主体数', '违约重生主体数'] },
    xAxis: { data: data.categories }, // 行业类别
    yAxis: {},
    series: [
      {
        name: '违约主体数',
        type: 'bar',
        data: data.breachCount // 违约主体数
      },
      {
        name: '违约重生主体数',
        type: 'bar',
        data: data.rebirthCount // 违约重生主体数
      }
    ]
  }
  chart.setOption(option)
}

// 渲染区域统计图表
const renderRegionStats = async () => {
  const data = await getRegionBreachStats() // API 获取区域违约数据
  const chart = echarts.init(regionChart.value)

  const option = {
    title: { text: '区域违约统计' },
    tooltip: {},
    legend: { data: ['违约主体数', '违约重生主体数'] },
    xAxis: { data: data.categories }, // 区域类别
    yAxis: {},
    series: [
      {
        name: '违约主体数',
        type: 'line',
        data: data.breachCount // 区域违约主体数
      },
      {
        name: '违约重生主体数',
        type: 'line',
        data: data.rebirthCount // 区域违约重生主体数
      }
    ]
  }
  chart.setOption(option)
}

// 在组件挂载时渲染默认的行业统计
onMounted(() => {
  renderIndustryStats()
})

// 切换统计类型，并重新渲染对应的图表
const switchStatType = (type) => {
  currentStatType.value = type
  if (type === 'industry') {
    renderIndustryStats()
  } else if (type === 'region') {
    renderRegionStats()
  }
}
</script>

<template>
  <page-container title="违约统计">
    <!-- 切换按钮 -->
    <div style="margin-bottom: 20px;">
      <el-button :type="currentStatType === 'industry' ? 'primary' : 'default'" @click="switchStatType('industry')">按行业统计</el-button>
      <el-button :type="currentStatType === 'region' ? 'primary' : 'default'" @click="switchStatType('region')">按区域统计</el-button>
    </div>

    <!-- 行业统计图表 -->
    <div v-if="currentStatType === 'industry'" ref="industryChart" style="width: 100%; height: 400px;"></div>

    <!-- 区域统计图表 -->
    <div v-if="currentStatType === 'region'" ref="regionChart" style="width: 100%; height: 400px;"></div>
  </page-container>
</template>

<style scoped>
.page-container {
  padding: 20px;
}

.el-button {
  margin-right: 10px;
}
</style>
