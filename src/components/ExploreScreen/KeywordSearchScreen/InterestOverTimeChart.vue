<template>
    <div id="chartCanvas">
      <canvas v-if="!loading" ref="chartCanvas"></canvas>
      <ProgressSpinner v-else/>
    </div>
  </template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import { Chart } from 'chart.js/auto';
  import 'chartjs-adapter-date-fns'; 
  import { queryInterestOverTime } from '../../api/TrendsApi';
  import ProgressSpinner from 'primevue/progressspinner';
  
  const props = defineProps(['keyword']);
  const chartCanvas = ref(null);
  const dates = ref([]);
  const values = ref([]);
  const chartData = ref([]);
  
  const fetchChartData = async () => {
    try {
        const response = await queryInterestOverTime(props.keyword);
        chartData.value = response.data;
        
        dates.value = chartData.value.map(item => item.date);
        values.value = chartData.value.map(item => item.value);
        
    } catch (error) {
        response.value = `Error: ${error.message}`;
    }
  }
  
  const createChart = () => {
    const ctx = chartCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates.value,
        datasets: [
          {
            label: 'Searches over time for phrase "' + props.keyword + '":',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
            data: values.value,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
            },
          },
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,
          },
        },
      },
    });
  }

  onMounted(async () => {
    await fetchChartData();
    createChart();
  });
</script>
  
<style scoped>
#chartCanvas {
    width: 100%;
}  
</style>
  