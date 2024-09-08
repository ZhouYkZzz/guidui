<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { getOverview, artGetResultService } from '@/api/article'

const industryDefaultChart = ref(null)
const industryRebornChart = ref(null)
const regionDefaultChart = ref(null)
const regionRebornChart = ref(null)

const renderChart = async (chartRef, getDataFunc, titleText, seriesType) => {
  try {
    const data = await getDataFunc()
    const chart = echarts.init(chartRef.value)
    const option = {
      title: { text: titleText, left: 'center' },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        top: 'center',
        left: 'right',
        data: data.categories
      },
      series: [
        {
          name: titleText,
          type: seriesType,
          radius: '50%',
          data: data.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    chart.setOption(option)
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}

const processData = (data, key) => {
  const result = {}
  data.forEach(item => {
    const value = item[key]
    if (value) {
      if (!result[value]) {
        result[value] = 0
      }
      result[value]++
    }
  })
  return {
    categories: Object.keys(result),
    seriesData: Object.keys(result).map(category => ({
      name: category,
      value: result[category]
    }))
  }
}

onMounted(async () => {
  const defaultData = await artGetResultService()
  const rebornData = await getOverview()
  console.log('defaultData', defaultData)
  console.log('rebornData', rebornData)


  const defaultIndustryData = processData(defaultData.data.data, 'industry')
  const rebornIndustryData = processData(rebornData.data.data, 'Industry')
  const defaultRegionData = processData(defaultData.data.data, 'area')
  const rebornRegionData = processData(rebornData.data.data, 'Area')

  renderChart(industryDefaultChart, () => defaultIndustryData, '行业违约统计', 'pie')
  renderChart(industryRebornChart, () => rebornIndustryData, '行业重生统计', 'pie')
  renderChart(regionDefaultChart, () => defaultRegionData, '区域违约统计', 'pie')
  renderChart(regionRebornChart, () => rebornRegionData, '区域重生统计', 'pie')
})
</script>

<template>
  <div style="display: flex; flex-wrap: wrap;">
    <div style="display: flex; width: 100%;">
      <div ref="industryDefaultChart" style="width: 50%; height: 300px;"></div>
      <div ref="industryRebornChart" style="width: 50%; height: 300px;"></div>
    </div>
    <div style="display: flex; width: 100%;">
      <div ref="regionDefaultChart" style="width: 50%; height: 300px;"></div>
      <div ref="regionRebornChart" style="width: 50%; height: 300px;"></div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
}

.el-button {
  margin-right: 10px;
}
</style>
