<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Chart } from 'chart.js/auto';
  import 'chartjs-adapter-date-fns'; // Import the date adapter
  import { queryInterestOverTime } from '../../../api/TrendsApi';
  
  const chartCanvas = ref(null);
  const dates = ref([]);
  const values = ref([]);
  const loading = ref(false);
  const chartData = ref([]);
  
  const fetchChartData = async () => {
    try {
        loading.value = true;

        const response = await queryInterestOverTime('whatever');
        chartData.value = response.data;
        console.log(chartData.value);
        
        dates.value = chartData.value.map(item => item.date);
        values.value = chartData.value.map(item => item.value);
        
    } catch (error) {
        response.value = `Error: ${error.message}`;
    }
    finally {
        loading.value = false;
    }
  }
  
  onMounted( async () => {
    await fetchChartData();
    const ctx = chartCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates.value,
        datasets: [
          {
            label: 'Random Data',
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
  });
  </script>
  
  <style scoped>
  /* Optional: Add some styling */
  </style>
  