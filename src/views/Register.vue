<template>
  <v-container class="d-flex align-center justify-center fill-height register-container">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="register-card">
          <v-card-title class="text-center">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field v-model="name" label="Name" required prepend-inner-icon="mdi-account"></v-text-field>
              <v-text-field v-model="email" label="Email" required :rules="[emailRule]" prepend-inner-icon="mdi-email"></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required prepend-inner-icon="mdi-lock"></v-text-field>
              <v-text-field v-model="phone" label="Phone" prepend-inner-icon="mdi-phone"></v-text-field>
              <v-text-field v-model="address" label="Address" prepend-inner-icon="mdi-home"></v-text-field>
              <v-row>
                <v-col cols="9">
                  <v-text-field
                    v-model="dob"
                    label="Date of Birth"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-btn icon @click="openDobPicker">
                    <v-icon>mdi-calendar</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <flat-pickr
                ref="dobPicker"
                v-model="dob"
                :config="{ dateFormat: 'Y-m-d' }"
                @on-close="dobPickerOpen = false"
              ></flat-pickr>
              <v-select v-model="gender" :items="['Male', 'Female', 'Other']" label="Gender" prepend-inner-icon="mdi-gender-male-female"></v-select>
              <v-btn type="submit" color="primary" class="register-btn" block>Register</v-btn>
              <v-btn @click="goToLogin" class="login-btn" block>Login</v-btn>
              <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
              <v-alert v-if="success" type="success" class="mt-4">{{ success }}</v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'Register',
  components: {
    flatPickr
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      dob: '',
      gender: '',
      dobPickerOpen: false,
      rememberMe: false,
      error: '',
      success: '',
      emailRule: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    };
  },
  methods: {
    async register() {
      this.error = ''; 
      this.success = ''; 
      try {
        await this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone,
          address: this.address,
          dob: this.dob,
          gender: this.gender
        });
        this.success = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.$router.push({ name: 'Login' }); // Redirect to login page after successful registration
        }, 2000);
      } catch (error) {
        console.error('Registration failed:', error);
        this.error = error.message;
      }
    },
    goToLogin() {
      this.$router.push({ name: 'Login' });
    },
    openDobPicker() {
      if (this.$refs.dobPicker && this.$refs.dobPicker.flatpickr) {
        this.$refs.dobPicker.flatpickr.open();
      }
    }
  },
  mounted() {
    if (this.$refs.dobPicker && this.$refs.dobPicker.flatpickr) {
      this.$refs.dobPicker.flatpickr.open();
    }
  }
};
</script>

<style scoped>
.register-container {
  margin-top: -50px;
  padding: 20px;
}
.register-card {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 8px;
  padding: 20px;
}
.register-card .v-card-title {
  font-size: 24px;
  font-weight: bold;
  color: #344675;
}
.register-btn, .login-btn {
  transition: background-color 0.3s ease-in-out;
  margin-bottom: 16px; /* Add margin to create a gap */
}
.register-btn {
  margin-right: 16px; /* Add margin to create a gap */
}
.register-btn:hover {
  background-color: #1976d2;
}
.login-btn:hover {
  background-color: #43a047;
}
.mt-4 {
  margin-top: 16px;
}
.remember-me-checkbox .v-input--selection-controls__ripple {
  background-color: #1976d2 !important;
}
body {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>