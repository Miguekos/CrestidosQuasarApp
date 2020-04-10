import { axiosInstance } from "boot/axios";
const state = {
  Abonos: []
};

const mutations = {
  setAbonos(state, payload) {
    state.Abonos = payload;
  }
};

const actions = {
  async abonarCuotas({ commit }, payload) {
    console.log("abonarCuotas");
    console.log(payload);
    // const response = await axiosInstance.get(`/api/clientes`);
    const response = await axiosInstance.post(`/abonos/add`, payload);
    console.log(response.data);
    // commit("setCredit", response.data);
    return response.data;
  },
  async callAbonos({ commit }) {
    console.log("callAbonos");
    // console.log(payload);
    // const response = await axiosInstance.get(`/api/clientes`);
    const response = await axiosInstance.get(`/abonos`);
    console.log(response.data);
    commit("setAbonos", response.data);
    // return response.data;
  },
  async deleteAbonos({ commit }, payload) {
    console.log("deleteAbonos");
    console.log(payload);
    // const response = await axiosInstance.get(`/api/clientes`);
    const response = await axiosInstance.delete(`/abonos/delete/${payload}`);
    // console.log(response.data);
    // commit("setAbonos", response.data);
    return response.data;
  }
};

const getters = {
  getAbonos(state) {
    console.log(state.Abonos);
    return state.Abonos;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
