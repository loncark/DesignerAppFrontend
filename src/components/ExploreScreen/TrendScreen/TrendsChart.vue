<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Chart } from 'chart.js/auto';
  import 'chartjs-adapter-date-fns'; // Import the date adapter
  
  const chartCanvas = ref(null);
  
  // Helper function to generate random data
  const generateRandomData = (numPoints) => {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
      data.push(Math.floor(Math.random() * 100) + 1);
    }
    return data;
  };
  
  // Sample dates for the x-axis
  const labels = [
    '2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01', '2024-06-01', '2024-07-01'
  ];
  
  const data = generateRandomData(labels.length);
  
  onMounted(() => {
    const ctx = chartCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Random Data',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
            data: data,
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
  