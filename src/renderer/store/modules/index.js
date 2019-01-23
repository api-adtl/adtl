const state = {
  main: 0,
  now_open: '',
  content_list: {}
}
const getters = {
  getcontent_list: state => {
    return state.content_list
  },
  fruitsCount (state) {
    return state.content_list.length
  },
  now_open(state){
    return state.now_open;
  }

}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  set_now (state, now) {
    state.now_open = now
  },
  content_add (state, content) {
    console.log('content_add')
    state.main++
    let temp = state.content_list
    temp[state.main] = content
    state.content_list = temp
  },
  content_delete (state, main) {
    delete state.content_list[main]
  },
  content_empty (state) {
    console.log('content_empty')
    state.content_list = {}
  }

}

const actions = {
  someAsyncTask ({commit}) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  set_now (context,reload) {
    context.commit('set_now', reload.content)
  },
  content_add (context, reload) {
    console.log('content_add,action')
    context.commit('content_add', reload.content)
  },
  content_empty (context) {
    context.commit('content_empty')
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
