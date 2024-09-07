<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { getIndustryBreachStats, getRegionBreachStats } from '@/api/article'

const currentStatType = ref('industry')
const industryChart = ref(null)
const regionChart = ref(null)

const renderChart = async (chartRef, getDataFunc, titleText, seriesType) => {
  try {
    const data = await getDataFunc()
    const chart = echarts.init(chartRef.value)

    const option = {
      title: { text: titleText },
      tooltip: {},
      legend: { data: ['违约主体数', '违约重生主体数'] },
      xAxis: { data: data.categories },
      yAxis: {},
      series: [
        {
          name: '违约主体数',
          type: seriesType,
          data: data.breachCount
        },
        {
          name: '违约重生主体数',
          type: seriesType,
          data: data.rebirthCount
        }
      ]
    }
    chart.setOption(option)
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}

const renderIndustryStats = () => renderChart(industryChart, getIndustryBreachStats, '行业违约统计', 'bar')
const renderRegionStats = () => renderChart(regionChart, getRegionBreachStats, '区域违约统计', 'line')

onMounted(() => {
  renderIndustryStats()
})

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
    <div style="margin-bottom: 20px;">
      <el-button :type="currentStatType === 'industry' ? 'primary' : 'default'" @click="switchStatType('industry')">按行业统计</el-button>
      <el-button :type="currentStatType === 'region' ? 'primary' : 'default'" @click="switchStatType('region')">按区域统计</el-button>
    </div>

    <div v-show="currentStatType === 'industry'" ref="industryChart" style="width: 100%; height: 400px;"></div>
    <div v-show="currentStatType === 'region'" ref="regionChart" style="width: 100%; height: 400px;"></div>
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
