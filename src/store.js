import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    n: 1,
  },
  mutations: {
    n: (state, value) => state.n = Number(value),
  },
  actions: {
    //
  },
})
