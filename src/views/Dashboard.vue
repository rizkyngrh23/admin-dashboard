<template>
  <v-container fluid class="dashboard-container">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="dashboard-card">
          <v-card-title class="text-h5">Summary 1</v-card-title>
          <v-card-text>Summary content 1.</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="dashboard-card">
          <v-card-title class="text-h5">Summary 2</v-card-title>
          <v-card-text>Summary content 2.</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="dashboard-card">
          <v-card-title class="text-h5">Summary 3</v-card-title>
          <v-card-text>Summary content 3.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="dashboard-card">
          <v-card-title class="text-h5">Bar Chart</v-card-title>
          <v-card-text>
            <canvas id="barChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="dashboard-card">
          <v-card-title class="text-h5">Pie Chart</v-card-title>
          <v-card-text>
            <canvas id="pieChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="dashboard-card">
          <v-card-title class="text-h5">Line Chart</v-card-title>
          <v-card-text>
            <canvas id="lineChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="dashboard-card">
          <v-card-title class="text-h5">Data Table</v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="items" class="elevation-1"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="dashboard-card">
          <v-card-title class="text-h5">Recent Activities</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(activity, index) in recentActivities" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ activity.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ activity.date }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="dashboard-card">
          <v-card-title class="text-h5">Notifications</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(notification, index) in notifications" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ notification.message }}</v-list-item-title>
                  <v-list-item-subtitle>{{ notification.date }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from 'chart.js';

export default {
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Age', value: 'age' },
        { text: 'Country', value: 'country' }
      ],
      items: [
        { name: 'Zukowi', age: 54, country: 'Indonesia' },
        { name: 'Gibril', age: 33, country: 'Indonesia' },
        { name: 'L. Pandjaitan', age: 60, country: 'Indonesia' }
      ],
      recentActivities: [
        { title: 'Logged in', date: '2024-10-01' },
        { title: 'Updated profile', date: '2024-10-02' },
        { title: 'Added new item', date: '2024-10-03' }
      ],
      notifications: [
        { message: 'New message received', date: '2024-10-01' },
        { message: 'System update available', date: '2024-10-02' },
        { message: 'Password change required', date: '2024-10-03' }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    profilePicture() {
      return this.$store.getters.getProfilePicture || this.defaultProfilePicture;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Login' });
    },
    goToProfile() {
      this.$router.push({ name: 'Profile' });
    },
    goTo(routeName) {
      this.$router.push({ name: routeName });
    }
  },
  mounted() {
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Dataset 1',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39]
          },
          {
            label: 'Dataset 2',
            backgroundColor: '#36a2eb',
            data: [30, 25, 15, 35, 20, 30, 25]
          },
          {
            label: 'Dataset 3',
            backgroundColor: '#ffcd56',
            data: [20, 30, 25, 20, 30, 25, 20]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'Dataset 1',
            backgroundColor: ['#f87979', '#36a2eb', '#ffcd56'],
            data: [300, 50, 100]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Dataset 1',
            borderColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39],
            fill: false
          },
          {
            label: 'Dataset 2',
            borderColor: '#36a2eb',
            data: [30, 25, 15, 35, 20, 30, 25],
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}
#barChart, #pieChart, #lineChart {
  height: 300px;
}
.dashboard-card {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 12px;
  padding: 20px;
}
.gradient-card {
  background: rgba(255, 255, 255, 0.1);
}
.logout-btn, .profile-btn {
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.logout-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
}
.profile-btn:hover {
  background-color: #1976d2;
  transform: translateY(-2px);
}
</style>
