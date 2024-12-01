<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Performance Reports</v-card-title>
          <v-card-text>
            <v-data-table :headers="reportHeaders" :items="reports" class="elevation-1"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Feedback and Appraisals</v-card-title>
          <v-card-text>
            <v-data-table :headers="feedbackHeaders" :items="feedbacks" class="elevation-1"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Goals and Objectives Tracking</v-card-title>
          <v-card-text>
            <v-data-table :headers="goalHeaders" :items="goals" class="elevation-1"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Performance Chart</v-card-title>
          <v-card-text>
            <canvas id="performanceChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'PerformanceReview',
  data() {
    return {
      reportHeaders: [
        { text: 'Employee', value: 'employee' },
        { text: 'Period', value: 'period' },
        { text: 'Score', value: 'score' }
      ],
      reports: [
        { employee: 'Budi Santoso', period: 'Q1 2023', score: '85%' },
        { employee: 'Siti Aminah', period: 'Q1 2023', score: '90%' },
        { employee: 'Andi Wijaya', period: 'Q1 2023', score: '75%' },
        { employee: 'Rina Sari', period: 'Q1 2023', score: '80%' }
      ],
      feedbackHeaders: [
        { text: 'Employee', value: 'employee' },
        { text: 'Feedback', value: 'feedback' },
        { text: 'Date', value: 'date' }
      ],
      feedbacks: [
        { employee: 'Budi Santoso', feedback: 'Great job!', date: '2024-10-01' },
        { employee: 'Siti Aminah', feedback: 'Needs improvement.', date: '2024-10-02' },
        { employee: 'Andi Wijaya', feedback: 'Excellent performance.', date: '2024-10-03' },
        { employee: 'Rina Sari', feedback: 'Good effort.', date: '2024-10-04' }
      ],
      goalHeaders: [
        { text: 'Employee', value: 'employee' },
        { text: 'Goal', value: 'goal' },
        { text: 'Status', value: 'status' }
      ],
      goals: [
        { employee: 'Budi Santoso', goal: 'Increase sales by 10%', status: 'In Progress' },
        { employee: 'Siti Aminah', goal: 'Complete project X', status: 'Completed' },
        { employee: 'Andi Wijaya', goal: 'Improve customer satisfaction', status: 'In Progress' },
        { employee: 'Rina Sari', goal: 'Reduce operational costs', status: 'Completed' }
      ]
    };
  },
  mounted() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.reports.map(report => report.employee),
        datasets: [{
          label: 'Performance Score',
          data: this.reports.map(report => parseFloat(report.score)),
          backgroundColor: [
            '#36a2eb',
            '#ff6384',
            '#ffcd56',
            '#4bc0c0'
          ],
          borderColor: [
            '#36a2eb',
            '#ff6384',
            '#ffcd56',
            '#4bc0c0'
          ],
          borderWidth: 1,
          hoverBackgroundColor: [
            '#36a2eb80',
            '#ff638480',
            '#ffcd5680',
            '#4bc0c080'
          ],
          hoverBorderColor: [
            '#36a2eb',
            '#ff6384',
            '#ffcd56',
            '#4bc0c0'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 100
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return `Score: ${tooltipItem.yLabel}%`;
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutBounce'
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            fontColor: '#333',
            fontSize: 14
          }
        }
      }
    });
  }
};
</script>

<style scoped>
#performanceChart {
  height: 300px;
}
</style>