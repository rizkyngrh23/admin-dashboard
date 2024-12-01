import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    const profilePicture = localStorage.getItem('profilePicture');
    if (user) {
      this.$store.commit('setUser', user);
    }
    if (profilePicture) {
      this.$store.commit('setProfilePicture', profilePicture);
    }
  }
}).$mount('#app');