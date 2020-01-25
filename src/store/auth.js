/* global localStorage */

import User from "@/models/User";
import * as MutationTypes from "./mutation-types";

const state = {
  user: User.from(localStorage.token, localStorage.username, localStorage.email)
};

const mutations = {
  [MutationTypes.LOGIN](state) {
    state.user = User.from(
      localStorage.token,
      localStorage.username,
      localStorage.email
    );
  },
  [MutationTypes.LOGOUT](state) {
    state.user = null;
  }
};

const getters = {
  currentUser(state) {
    return state.user;
  }
};

const actions = {
  login({ commit }) {
    commit(MutationTypes.LOGIN);
  },

  logout({ commit }) {
    commit(MutationTypes.LOGOUT);
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
