import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'http://localhost:5000'; 

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    registeredUsers: JSON.parse(localStorage.getItem('registeredUsers')) || [],
    profilePicture: localStorage.getItem('profilePicture') || null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user)); 
      if (user && user.profilePicture) {
        state.profilePicture = user.profilePicture;
        localStorage.setItem('profilePicture', user.profilePicture); 
      }
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user'); 
      localStorage.removeItem('profilePicture'); 
    },
    setProfilePicture(state, profilePicture) {
      state.profilePicture = profilePicture;
      localStorage.setItem('profilePicture', profilePicture); 
    }
  },
  actions: {
    async register(_, user) { 
      try {
        await axios.post('/api/users/register', user);
      } catch (error) {
        console.error('User registration failed:', error); 
        throw new Error('User registration failed');
      }
    },
    async login({ commit }, user) {
      try {
        const response = await axios.post('/api/users/login', user);
        commit('setUser', response.data);
      } catch (error) {
        console.error('Invalid credentials:', error); 
        throw new Error('Invalid credentials');
      }
    },
    async updateProfile({ commit }, user) {
      try {
        const response = await axios.put(`/api/users/${user.id}`, user);
        commit('setUser', response.data);
      } catch (error) {
        console.error('Profile update failed:', error); 
        throw new Error('Profile update failed');
      }
    },
    logout({ commit }) {
      commit('clearUser');
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    getUser: state => state.user,
    getProfilePicture: state => state.profilePicture
  }
});