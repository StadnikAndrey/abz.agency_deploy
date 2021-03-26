import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import global from './modules/global.js';
import users from './modules/users.js';

export default new Vuex.Store({   
  modules: {
    global,
    users
  },
  strict: process.env.NODE_ENV !== 'production'
}) 