<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="settings-card">
          <v-card-title>Settings</v-card-title>
          <v-card-text>
            <v-form>
              <v-select v-model="settings.theme" :items="themes" label="Theme"></v-select>
              <v-select v-model="settings.fontSize" :items="fontSizes" label="Font Size"></v-select>
              <v-switch v-model="settings.notifications" label="Enable Notifications"></v-switch>
              <v-switch v-model="settings.autoSave" label="Enable Auto Save"></v-switch>
              <v-select v-model="settings.language" :items="languages" label="Language"></v-select>
              <v-select v-model="settings.timeZone" :items="timeZones" label="Time Zone"></v-select>
              <v-select v-model="settings.role" :items="roles" label="Role"></v-select>
              <v-select v-model="settings.department" :items="departments" label="Department"></v-select>
              <v-btn @click="saveSettings" color="primary" class="save-btn">Save Settings</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        theme: 'Light',
        fontSize: 'Medium',
        notifications: false,
        autoSave: false,
        language: '',
        timeZone: '',
        role: '',
        department: ''
      },
      themes: ['Light', 'Dark', 'System Default'],
      fontSizes: ['Small', 'Medium', 'Large'],
      languages: ['English', 'Spanish', 'French', 'German', 'Chinese'],
      timeZones: ['UTC', 'GMT', 'EST', 'CST', 'MST', 'PST'],
      roles: ['Admin', 'Manager', 'Employee'],
      departments: ['HR', 'Finance', 'Engineering', 'Sales', 'Marketing']
    };
  },
  methods: {
    saveSettings() {
      console.log('Settings saved:', this.settings);
      this.applySettings();
    },
    applySettings() {
      if (this.settings.theme === 'Dark') {
        this.$vuetify.theme.dark = true;
      } else if (this.settings.theme === 'Light') {
        this.$vuetify.theme.dark = false;
      } else {
        this.$vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      if (this.settings.notifications) {
        console.log('Notifications enabled');
      } else {
        console.log('Notifications disabled');
      }
      if (this.settings.autoSave) {
        console.log('Auto Save enabled');
      } else {
        console.log('Auto Save disabled');
      }
      console.log('Language set to:', this.settings.language);
      console.log('Time Zone set to:', this.settings.timeZone);
      console.log('Role set to:', this.settings.role);
      console.log('Department set to:', this.settings.department);
    }
  },
  mounted() {
    // Load settings from local storage or API
    const savedSettings = JSON.parse(localStorage.getItem('settings')) || {};
    this.settings = { ...this.settings, ...savedSettings };
    this.applySettings();
  },
  watch: {
    settings: {
      handler(newSettings) {
        localStorage.setItem('settings', JSON.stringify(newSettings));
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.settings-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}
.save-btn {
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.save-btn:hover {
  background-color: #1976d2;
  transform: translateY(-2px);
}
</style>
