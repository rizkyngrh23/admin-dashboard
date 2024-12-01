<template>
  <v-container class="d-flex align-center justify-center fill-height login-container">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="login-card">
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" label="Email" required :rules="[emailRule]" prepend-inner-icon="mdi-email"></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required prepend-inner-icon="mdi-lock"></v-text-field>
              <v-checkbox v-model="rememberMe" label="Remember Me" class="remember-me-checkbox"></v-checkbox>
              <v-btn type="submit" color="primary" class="login-btn" block>Login</v-btn>
              <v-btn @click="goToRegister" class="register-btn" block>Register</v-btn>
              <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
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
      email: '',
      password: '',
      rememberMe: false,
      error: '',
      emailRule: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    };
  },
  methods: {
    async login() {
      this.error = ''; // Clear previous error message
      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        if (this.$store.getters.isAuthenticated) {
          if (this.rememberMe) {
            localStorage.setItem('email', this.email);
          } else {
            localStorage.removeItem('email');
          }
          this.$router.push({ name: 'Dashboard' });
        } else {
          this.error = 'Invalid credentials';
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.error = error.message;
      }
    },
    goToRegister() {
      this.$router.push({ name: 'Register' });
    }
  }
};
</script>

<style scoped>
.login-container {
  background: url('https://demos.creative-tim.com/argon-dashboard/assets/img/theme/login-bg.jpg') no-repeat center center;
  background-size: cover;
  margin-top: -50px;
  padding: 20px;
}
.login-card {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 8px;
  padding: 20px;
}
.login-card .v-card-title {
  font-size: 24px;
  font-weight: bold;
  color: #344675;
}
.login-btn, .register-btn {
  transition: background-color 0.3s ease-in-out;
  margin-bottom: 16px;
}
.login-btn {
  margin-right: 16px;
}
.login-btn:hover {
  background-color: #1976d2;
}
.register-btn:hover {
  background-color: #43a047;
}
.mt-4 {
  margin-top: 16px;
}
.remember-me-checkbox .v-input--selection-controls__ripple {
  background-color: #1976d2 !important;
}
</style>
