import { axiosInstance } from "boot/axios";
const state = {
  iconAtras: "map"
};

const mutations = {
  setAtras(state, payload) {
    state.iconAtras = payload;
  }
};

const actions = {
  async iconAtras({ commit }, payload) {
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
