<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Shift Schedules</v-card-title>
          <v-card-text>
            <v-data-table :headers="shiftHeaders" :items="shifts" class="elevation-1"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Vacation and Leave Planning</v-card-title>
          <v-card-text>
            <v-data-table :headers="leaveHeaders" :items="leaves" class="elevation-1"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Calendar Integration</v-card-title>
          <v-card-text>
            <v-calendar v-model="calendar" color="primary" :events="calendarEvents"></v-calendar>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Shift Coverage</v-card-title>
          <v-card-text>
            <canvas id="shiftCoverageChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Shift Calendar</v-card-title>
          <v-card-text>
            <v-calendar v-model="calendar" color="primary" :events="shiftEvents"></v-calendar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'SchedulingShiftPlanning',
  data() {
    return {
      shiftHeaders: [
        { text: 'Employee', value: 'employee' },
        { text: 'Shift', value: 'shift' },
        { text: 'Date', value: 'date' }
      ],
      shifts: [
        { employee: 'Budi Santoso', shift: 'Morning', date: '2024-10-01' },
        { employee: 'Siti Aminah', shift: 'Evening', date: '2024-10-02' }
      ],
      leaveHeaders: [
        { text: 'Employee', value: 'employee' },
        { text: 'Type', value: 'type' },
        { text: 'Start Date', value: 'startDate' },
        { text: 'End Date', value: 'endDate' }
      ],
      leaves: [
        { employee: 'Budi Santoso', type: 'Vacation', startDate: '2024-10-01', endDate: '2024-10-10' },
        { employee: 'Siti Aminah', type: 'Sick Leave', startDate: '2024-10-05', endDate: '2024-10-07' }
      ],
      calendar: new Date(),
      calendarEvents: [],
      shiftEvents: []
    };
  },
  methods: {
    loadCalendarEvents() {
      this.calendarEvents = this.leaves.map(leave => ({
        name: `${leave.employee} - ${leave.type}`,
        start: leave.startDate,
        end: leave.endDate
      }));
    },
    loadShiftEvents() {
      this.shiftEvents = this.shifts.map(shift => ({
        name: `${shift.employee} - ${shift.shift}`,
        start: shift.date,
        end: shift.date
      }));
    }
  },
  mounted() {
    this.loadCalendarEvents();
    this.loadShiftEvents();

    const shiftCoverageCtx = document.getElementById('shiftCoverageChart').getContext('2d');
    new Chart(shiftCoverageCtx, {
      type: 'bar',
      data: {
        labels: ['Monday Morning', 'Monday Evening', 'Tuesday Morning', 'Tuesday Evening', 'Wednesday Morning', 'Wednesday Evening', 'Thursday Morning', 'Thursday Evening', 'Friday Morning', 'Friday Evening'],
        datasets: [{
          label: 'Shift Coverage',
          data: [10, 5, 8, 6, 7, 4, 9, 3, 6, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
};
</script>

<style scoped>
#shiftCoverageChart {
  height: 300px;
}
</style>