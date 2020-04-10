import { axiosInstance } from "boot/axios";
const state = {
  Credits: [],
  CreditsCrono: []
};

const mutations = {
  setCredit(state, payload) {
    state.Credits = payload;
  },
  setCreditCrono(state, payload) {
    state.CreditsCrono = payload;
  }
};

const actions = {
  async callCredit({ commit }, payload) {
    console.log("callCredit");
    console.log(payload);
    // const response = await axiosInstance.get(`/api/clientes`);
    const response = await axiosInstance.get(`/creditos/${payload.id}`);
    console.log(response.data);
    // console.log("Todos los clientes");
    commit("setCredit", response.data);
    // return response.data;
  },
  async callCreditCrono({ commit }, payload) {
    console.log("callCreditCrono");
    console.log(payload);
    // const response = await axiosInstance.get(`/api/clientes`);
    const response = await axiosInstance.get(`/creditos/cronograma/${payload}`);
    // console.log(response);
    // console.log("Todos los clientes");
    commit("setCreditCrono", response.data);
    // return response.data;
  },
  async addCredit({ commit }, payload) {
    console.log("addCredit");
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
  },
  getCreditsCrono(state) {
    console.log(state.CreditsCrono);
    return state.CreditsCrono;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
