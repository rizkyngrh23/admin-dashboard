<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-app-bar app color="primary" dark class="app-bar">
      <v-toolbar-title>Admin Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text v-if="!isAuthenticated" @click="goTo('Login')" class="nav-btn">Login</v-btn>
      <v-btn text v-if="!isAuthenticated" @click="goTo('Register')" class="nav-btn">Register</v-btn>
      <v-spacer v-if="isAuthenticated"></v-spacer>
      <div v-if="isAuthenticated" class="user-info">
        <span class="welcome-message">Welcome, {{ currentUser.email }}</span>
        <v-btn text @click="logout" color="error" class="logout-btn">Logout</v-btn>
        <v-avatar size="32" class="nav-avatar" @click="goTo('Profile')">
          <img :src="profilePicture" alt="Profile Picture">
        </v-avatar>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-if="isAuthenticated" app :dark="$vuetify.theme.dark" class="nav-drawer">
      <v-list>
        <v-list-item-group v-model="selectedItem">
          <v-list-item @click="goTo('Dashboard')" :class="{'nav-item': true, 'nav-item--active': selectedItem === 'Dashboard'}">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goTo('EmployeeManagement')" :class="{'nav-item': true, 'nav-item--active': selectedItem === 'EmployeeManagement'}">
            <v-list-item-title>Employee Management</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goTo('AttendanceTracking')" :class="{'nav-item': true, 'nav-item--active': selectedItem === 'AttendanceTracking'}">
            <v-list-item-title>Attendance</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goTo('Payroll')" :class="{'nav-item': true, 'nav-item--active': selectedItem === 'Payroll'}">
            <v-list-item-title>Payroll</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goTo('PerformanceReview')" :class="{'nav-item': true, 'nav-item--active': selectedItem === 'PerformanceReview'}">
            <v-list-item-title>Performance</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goTo('SchedulingShiftPlanning')" :class="{'nav-item': true, 'nav-item--active': selectedItem === 'SchedulingShiftPlanning'}">
            <v-list-item-title>Scheduling & Shift Planning</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goTo('TrainingDevelopment')" :class="{'nav-item': true, 'nav-item--active': selectedItem === 'TrainingDevelopment'}">
            <v-list-item-title>Training & Development</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goTo('Settings')" :class="{'nav-item': true, 'nav-item--active': selectedItem === 'Settings'}">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-divider></v-divider>
      </v-list>
      <div class="bottom-items">
        <v-list>
          <v-list-item-group v-model="selectedItem">
            <v-list-item @click="goTo('FAQs')" :class="{'nav-item': true, 'nav-item--active': selectedItem === 'FAQs'}">
              <v-list-item-title>FAQs</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('Support')" :class="{'nav-item': true, 'nav-item--active': selectedItem === 'Support'}">
              <v-list-item-title>Contact IT Support</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import defaultProfilePicture from '@/assets/default_pfp.jpeg';

export default {
  name: 'App',
  data() {
    return {
      selectedItem: null,
      defaultProfilePicture
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    currentUser() {
      return this.$store.getters.getUser;
    },
    profilePicture() {
      return this.$store.getters.getProfilePicture || this.defaultProfilePicture;
    },
    settings() {
      return this.$store.getters.getSettings || { fontSize: 'Medium' }; 
    }
  },
  methods: {
    goTo(routeName) {
      this.$router.push({ name: routeName });
      this.selectedItem = routeName;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Login' });
    },
    applyFontSize() {
      document.documentElement.style.fontSize = this.settings.fontSize === 'Small' ? '13px' : this.settings.fontSize === 'Medium' ? '15px' : '17px';
    }
  },
  mounted() {
    document.title = "Admin Dashboard";
    this.applyFontSize();
  },
  watch: {
    settings: {
      handler() {
        this.applyFontSize();
      },
      deep: true
    }
  }
};
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';

.app-bar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.nav-btn {
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.nav-btn:hover {
  color: #ffeb3b;
  transform: translateY(-2px);
}
.nav-drawer {
  background: #ffffff;
}
.nav-item {
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.nav-item--active {
  background-color: #667eea;
  border-radius: 20px; 
  transform: none; 
}
.nav-avatar {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}
.nav-avatar:hover {
  transform: scale(1.1);
}
.user-info {
  display: flex;
  align-items: center;
}
.welcome-message {
  margin-right: 16px;
  color: #fff;
}
.logout-btn {
  margin-right: 16px;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.logout-btn:hover {
  color: #ffeb3b;
  transform: translateY(-2px);
}
.bottom-items {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>