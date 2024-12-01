<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Training Schedules</v-card-title>
          <v-card-text>
            <v-data-table :headers="trainingHeaders" :items="trainings" class="elevation-1"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Course Registrations</v-card-title>
          <v-card-text>
            <v-data-table :headers="courseHeaders" :items="courses" class="elevation-1"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Skill Development Tracking</v-card-title>
          <v-card-text>
            <v-data-table :headers="skillHeaders" :items="skills" class="elevation-1"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Course Completion Rates</v-card-title>
          <v-card-text>
            <canvas id="courseCompletionChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Training Progress</v-card-title>
          <v-card-text>
            <canvas id="trainingProgressChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'TrainingDevelopment',
  data() {
    return {
      trainingHeaders: [
        { text: 'Employee', value: 'employee' },
        { text: 'Training', value: 'training' },
        { text: 'Date', value: 'date' }
      ],
      trainings: [
        { employee: 'Budi Santoso', training: 'Leadership', date: '2024-10-01' },
        { employee: 'Siti Aminah', training: 'Communication', date: '2024-10-02' }
      ],
      courseHeaders: [
        { text: 'Employee', value: 'employee' },
        { text: 'Course', value: 'course' },
        { text: 'Status', value: 'status' }
      ],
      courses: [
        { employee: 'Budi Santoso', course: 'Project Management', status: 'Registered' },
        { employee: 'Siti Aminah', course: 'Data Analysis', status: 'Completed' }
      ],
      skillHeaders: [
        { text: 'Employee', value: 'employee' },
        { text: 'Skill', value: 'skill' },
        { text: 'Level', value: 'level' }
      ],
      skills: [
        { employee: 'Budi Santoso', skill: 'JavaScript', level: 'Advanced' },
        { employee: 'Siti Aminah', skill: 'Python', level: 'Intermediate' }
      ]
    };
  },
  mounted() {
    const courseCtx = document.getElementById('courseCompletionChart').getContext('2d');
    new Chart(courseCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [{
          label: 'Course Completion Rates',
          data: [60, 30, 10],
          backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
          borderColor: ['#36a2eb', '#ff6384', '#ffcd56'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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

    const trainingCtx = document.getElementById('trainingProgressChart').getContext('2d');
    new Chart(trainingCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Training Progress',
          data: [20, 40, 60, 80],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: true
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
/* Add any specific styles for TrainingDevelopment.vue here */
</style>