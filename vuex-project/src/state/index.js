import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    numb: 3
  },
  mutations: {
    //mutations定义状态改变函数
    //mutations内函数传参是state，即直接对状态进行操作
    addnumb: function (state) {
      state.numb++
    },
    lessnumb(state) {//ES6写法，可以省略 :function
      state.numb--
    }
  },
  actions: {
    //context
    fn1: function (context) {
      setTimeout(function () {
        context.commit('lessnumb')
      }, 1000)
    }
  },
  getters: {
    getfn: function (state) {
      return state.numb > 0 ? state.numb:0
    }
  }
})

