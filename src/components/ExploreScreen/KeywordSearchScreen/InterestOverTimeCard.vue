<template>
  <div class="interestOverTimeCard">
    <Line v-if="!loading" :data="chartData" :options="chartOptions" />
    <ProgressSpinner v-else />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { queryInterestOverTime } from '../../../api/TrendsApi';
import ProgressSpinner from 'primevue/progressspinner';
import { useStore } from '../../../store/Store';
import eventBus from '../../../utils/EventBus';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const store = useStore();
const loading = ref(false);

const chartData = computed(() => store.raw_chart_data? ({
  labels: store.raw_chart_data.map(item => item.date),
  datasets: [
    {
      label: `Searches over time for phrase "${store.keyword_search_keyword}":`,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
      hoverBorderColor: 'rgba(75, 192, 192, 1)',
      data: store.raw_chart_data.map(item => item.value),
      fill: false,
    },
  ],
}) : ({labels: [], datasets: []}));

const chartOptions = {
  responsive: true,
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
};

const fetchChartData = async () => {
  try {
    loading.value = true;
    const response = await queryInterestOverTime(store.keyword_search_keyword);
    store.raw_chart_data = response.data;

  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  eventBus.on('execute-queries', fetchChartData);
});

onUnmounted(() => {
  eventBus.off('execute-queries', fetchChartData);
});
</script>

<style scoped>
.interestOverTimeCard {
  width: 830px;
  height: 430px;
  padding: 20px;
}

.p-progress-spinner {
  margin-left: 45%;
  margin-top: 20%;
}
</style>