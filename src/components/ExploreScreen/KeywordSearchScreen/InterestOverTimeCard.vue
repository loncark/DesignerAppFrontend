<template>
  <div class="interestOverTimeCard">
    <canvas v-if="!loading" ref="chartCanvas"></canvas>
    <ProgressSpinner v-else />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { queryInterestOverTime } from '../../../api/TrendsApi';
import ProgressSpinner from 'primevue/progressspinner';
import { useStore } from '../../../store/Store';

const store = useStore();
const loading = ref(true);

const chartCanvas = ref(null);
const chartData = ref([]);
const dates = computed(() => chartData.value.length > 0? chartData.value.map(item => item.date) : []);
const values = computed(() => chartData.value.length > 0? chartData.value.map(item => item.value) : []);

const fetchChartData = async () => {
  try {
    loading.value = true;

    const response = await queryInterestOverTime(store.keyword_search_keyword);
    chartData.value = response.data;

  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
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
          label: 'Searches over time for phrase "' + store.keyword_search_keyword + '":',
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
.interestOverTimeCard {
  width: 830px;
  height: 430px;
}

.p-progress-spinner {
  margin-left: 45%;
  margin-top: 20%;
}
</style>