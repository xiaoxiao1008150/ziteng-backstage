import Vue from 'vue';
import Vuex from 'vuex';
// import app from './modules/app'
// import errorLog from './modules/errorLog'
import permission from './modules/permission';
import lottery from './modules/lottery'
// import user from './modules/user'
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // app,
    // errorLog,
    permission,
    lottery
    // tagsView,
    // user
  },
  getters
});

export default store;
