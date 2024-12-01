<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-5">
          <v-card-title class="headline">Attendance & Time Tracking</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mb-5">
          <v-card-title class="headline">Check-ins and Check-outs</v-card-title>
          <v-card-text>
            <canvas id="checkInOutChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mb-5">
          <v-card-title class="headline">Leave Management</v-card-title>
          <v-card-text>
            <canvas id="leaveChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mb-5">
          <v-card-title class="headline">Overtime Tracking</v-card-title>
          <v-card-text>
            <canvas id="overtimeChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-5">
          <v-card-title class="headline">Summary</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-card class="summary-card">
                  <v-card-title class="summary-title">Total Check-ins</v-card-title>
                  <v-card-text>{{ totalCheckIns }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="summary-card">
                  <v-card-title class="summary-title">Total Check-outs</v-card-title>
                  <v-card-text>{{ totalCheckOuts }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="summary-card">
                  <v-card-title class="summary-title">Total Leaves</v-card-title>
                  <v-card-text>{{ totalLeaves }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="summary-card">
                  <v-card-title class="summary-title">Total Overtime Hours</v-card-title>
                  <v-card-text>{{ totalOvertimeHours }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-5">
          <v-card-title class="headline">Employee Attendance Details</v-card-title>
          <v-card-text>
            <v-data-table :headers="tableHeaders" :items="employees" class="elevation-1">
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.name }}</td>
                  <td>{{ item.checkIns }}</td>
                  <td>{{ item.checkOuts }}</td>
                  <td>{{ item.leaves }}</td>
                  <td>{{ item.overtimeHours }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'AttendanceTracking',
  data() {
    return {
      employees: [
        { name: 'Adam Maulana', checkIns: 20, checkOuts: 18, leaves: 2, overtimeHours: 10 },
        { name: 'Asep Bara', checkIns: 22, checkOuts: 20, leaves: 1, overtimeHours: 15 },
        { name: 'Budi Santoso', checkIns: 18, checkOuts: 17, leaves: 3, overtimeHours: 8 },
        { name: 'Siti Aminah', checkIns: 25, checkOuts: 24, leaves: 0, overtimeHours: 20 },
        { name: 'Agus Salim', checkIns: 19, checkOuts: 18, leaves: 2, overtimeHours: 12 },
        { name: 'Dewi Lestari', checkIns: 21, checkOuts: 20, leaves: 1, overtimeHours: 18 }
      ],
      tableHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Check-ins', value: 'checkIns' },
        { text: 'Check-outs', value: 'checkOuts' },
        { text: 'Leaves', value: 'leaves' },
        { text: 'Overtime Hours', value: 'overtimeHours' }
      ]
    };
  },
  computed: {
    totalCheckIns() {
      return this.employees.reduce((acc, emp) => acc + emp.checkIns, 0);
    },
    totalCheckOuts() {
      return this.employees.reduce((acc, emp) => acc + emp.checkOuts, 0);
    },
    totalLeaves() {
      return this.employees.reduce((acc, emp) => acc + emp.leaves, 0);
    },
    totalOvertimeHours() {
      return this.employees.reduce((acc, emp) => acc + emp.overtimeHours, 0);
    }
  },
  methods: {
    updateCharts() {
      const checkInOutCounts = this.employees.reduce((acc, emp) => {
        acc.checkIns = (acc.checkIns || 0) + emp.checkIns;
        acc.checkOuts = (acc.checkOuts || 0) + emp.checkOuts;
        return acc;
      }, {});

      const leaveCounts = this.employees.reduce((acc, emp) => {
        acc.leaves = (acc.leaves || 0) + emp.leaves;
        return acc;
      }, {});

      const overtimeCounts = this.employees.reduce((acc, emp) => {
        acc.overtimeHours = (acc.overtimeHours || 0) + emp.overtimeHours;
        return acc;
      }, {});

      this.checkInOutChart.data.labels = ['Check Ins', 'Check Outs'];
      this.checkInOutChart.data.datasets[0].data = [checkInOutCounts.checkIns, checkInOutCounts.checkOuts];
      this.checkInOutChart.update();

      this.leaveChart.data.labels = ['Leaves'];
      this.leaveChart.data.datasets[0].data = [leaveCounts.leaves];
      this.leaveChart.update();

      this.overtimeChart.data.labels = ['Overtime Hours'];
      this.overtimeChart.data.datasets[0].data = [overtimeCounts.overtimeHours];
      this.overtimeChart.update();
    }
  },
  mounted() {
    const checkInOutCtx = document.getElementById('checkInOutChart').getContext('2d');
    this.checkInOutChart = new Chart(checkInOutCtx, {
      type: 'bar',
      data: {
        labels: ['Check Ins', 'Check Outs'],
        datasets: [
          {
            label: 'Check-ins and Check-outs',
            backgroundColor: '#36a2eb',
            data: [125, 117, 130, 140, 150, 160]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    const leaveCtx = document.getElementById('leaveChart').getContext('2d');
    this.leaveChart = new Chart(leaveCtx, {
      type: 'pie',
      data: {
        labels: ['Leaves'],
        datasets: [
          {
            label: 'Leave Management',
            backgroundColor: ['#ffcd56'],
            data: [9]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    const overtimeCtx = document.getElementById('overtimeChart').getContext('2d');
    this.overtimeChart = new Chart(overtimeCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Overtime Tracking',
            borderColor: '#f87979',
            data: [20, 30, 40, 50],
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    this.updateCharts();
  }
};
</script>

<style scoped>
#checkInOutChart, #leaveChart, #overtimeChart {
  height: 300px;
}
.mb-5 {
  margin-bottom: 20px;
}
.headline {
  font-weight: bold;
  font-size: 1.25rem;
}
.summary-card {
  text-align: center;
  padding: 20px;
}
.summary-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
