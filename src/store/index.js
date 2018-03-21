import Vue from 'vue';
import Vuex from 'vuex';
// import app from './modules/app'
// import errorLog from './modules/errorLog'
import permission from './modules/permission';
import lottery from './modules/lottery'
import user from './modules/user'
import globalSave from './modules/globalSave'
import clientList from './modules/clientList'
import manageList from './modules/manageList'
import activityList from './modules/activityList'
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // app,
    // errorLog,
    permission,
    lottery,
    // tagsView,
    user,
    globalSave,
    clientList,
    manageList,
    activityList
  },
  getters
});

export default store;
