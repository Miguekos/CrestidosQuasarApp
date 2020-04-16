import { axiosInstance } from "boot/axios";
import { date } from "quasar";
const state = {
  backbutton: false
};

const mutations = {
  setAtras(state, payload) {
    state.backbutton = payload;
  }
};

const actions = {
  iconAtras({ commit }, payload) {
    console.log("deleteAbonos");
    console.log(payload);
    console.log("deleteAbonos");
    // const response = await axiosInstance.get(`/api/clientes`);
    // const response = await axiosInstance.delete(`/abonos/delete/${payload}`);
    // console.log(response.data);
    commit("setAtras", payload);
    // return response.data;
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
