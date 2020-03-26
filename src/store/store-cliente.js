import { axiosInstance } from "boot/axios";
const state = {
  Clientes: []
};

const mutations = {
  setClientes(state, payload) {
    state.Clientes = payload;
  }
};

const actions = {
  async callCliente({ commit }) {
    console.log("callCliente");
    // const response = await axiosInstance.get(`/api/clientes`);
    const response = await axiosInstance.get(`/clientes`);
    // console.log(response);
    // console.log("Todos los clientes");
    commit("setClientes", response.data);
    // return response.data;
  },
  async addCliente({ commit }, payload) {
    console.log("addCliente");
    console.log(payload);
    // const response = await axiosInstance.get(`/api/clientes`);
    const response = await axiosInstance.post(`/cliente/add`, payload);
    console.log(response);
    // commit("setClientes", response.data);
    return response.data;
  }
};

const getters = {
  getClientes(state) {
    console.log(state.Clientes);
    return state.Clientes;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
