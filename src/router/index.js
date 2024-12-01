import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Profile from '../views/Profile.vue';
import Settings from '../views/Settings.vue';
import EmployeeManagement from '../views/EmployeeManagement.vue';
import AttendanceTracking from '../views/AttendanceTracking.vue';
import Payroll from '../views/Payroll.vue';
import PerformanceReview from '../views/PerformanceReview.vue';
import SchedulingShiftPlanning from '@/views/SchedulingShiftPlanning.vue';
import TrainingDevelopment from '@/views/TrainingDevelopment.vue';
import Faq from '@/views/Faq.vue';
import ContactItSupport from '@/views/ContactItSupport.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/employee-management',
    name: 'EmployeeManagement',
    component: EmployeeManagement,
    meta: { requiresAuth: true }
  },
  {
    path: '/attendance-tracking',
    name: 'AttendanceTracking',
    component: AttendanceTracking,
    meta: { requiresAuth: true }
  },
  {
    path: '/payroll',
    name: 'Payroll',
    component: Payroll,
    meta: { requiresAuth: true }
  },
  {
    path: '/performance-review',
    name: 'PerformanceReview',
    component: PerformanceReview,
    meta: { requiresAuth: true }
  },
  {
    path: '/scheduling-shift-planning',
    name: 'SchedulingShiftPlanning',
    component: SchedulingShiftPlanning
  },
  {
    path: '/training-development',
    name: 'TrainingDevelopment',
    component: TrainingDevelopment
  },
  {
    path: '/faqs',
    name: 'FAQs',
    component: Faq,
    meta: { requiresAuth: true }
  },
  {
    path: '/support',
    name: 'Support',
    component: ContactItSupport,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if (to.name === 'Login' && store.getters.isAuthenticated) {
    next({ name: 'Dashboard' });
  } else if (to.name === 'Register' && store.getters.isAuthenticated) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

router.onError(error => {
  console.error(error);
});

export default router;