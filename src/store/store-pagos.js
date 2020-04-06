import { axiosInstance } from "boot/axios";
const state = {
  Abono: []
};

const mutations = {
  setCredit(state, payload) {
    state.Credits = payload;
  }
};

const actions = {
  async addCredit({ commit }, payload) {
    console.log("abonarCuotas");
    console.log(payload);
    // const response = await axiosInstance.get(`/api/clientes`);
    const response = await axiosInstance.post(`/creditos/add/${payload.idcliente}`, payload);
    console.log(response);
    // commit("setCredit", response.data);
    return response.data;
  }
};

const getters = {
  getCredits(state) {
    console.log(state.Credits);
    return state.Credits;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
