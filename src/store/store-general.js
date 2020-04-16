import { axiosInstance } from "boot/axios";
import { date } from "quasar";
const state = {
  backbutton: false,
  searchactive: false
};

const mutations = {
  setAtras(state, payload) {
    state.backbutton = payload;
  },
  setSearch(state, payload) {
    state.searchactive = payload;
  }
};

const actions = {
  iconAtras({ commit }, payload) {
    console.log(payload);
    commit("setAtras", payload);
  },
  searchAction({ commit }, payload) {
    console.log(payload);
    commit("setSearch", payload);
  }
};

const getters = {
  getAtras(state) {
    console.log("getter", state.iconAtras);
    return state.iconAtras;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
