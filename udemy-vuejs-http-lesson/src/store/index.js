import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
import axiosRefresh from '../axios-refresh';

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    idToken: state => state.idToken
  },
  state: {
    idToken: null
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    }
  },
  actions: {
    login({ commit, dispatch }, authData) {
      axios.post('/accounts:signInWithPassword?key=AIzaSyAmWMfTCTwzhuicfziSXdpmC6grxsSAJKY',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response =>  {
        commit('updateIdToken', response.data.idToken);
        setTimeout(() => {
          dispatch('refreshIdToken', response.data.refreshIdToken);
        }, response.data.expiresIn * 1000);
        router.push('/')
        console.log(response)
      });
    },
    refreshIdToken({ commit }, refreshToken) {
      axiosRefresh.post(
        '/token?key=AIzaSyAmWMfTCTwzhuicfziSXdpmC6grxsSAJKY',
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
      ).then(response => {
        commit('updateIdToken', response.data.id_token);
        setTimeout(() => {
          this.dispatch('refreshIdToken', response.data.refresh_token);
        }, response.data.expires_in * 1000);
      });
    },
    register({ commit }, authData) {
      axios.post('/accounts:signUp?key=AIzaSyAmWMfTCTwzhuicfziSXdpmC6grxsSAJKY',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response =>  {
        commit('updateIdToken', response.data.idToken);
        router.push('/')
        console.log(response)
      });
    }
  }
});