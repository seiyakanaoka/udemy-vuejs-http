import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Register from './views/Register.vue';
import Comments from './views/Comments.vue';
import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Comments,
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/login',
      component: Login,
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: '/register',
      component: Register,
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next('/');
        } else {
          next();
        }
      }
    }
  ]
});
