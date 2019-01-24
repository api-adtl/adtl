const state = {
  main: 0,
  now_open: '',
  content_list: {},
  group_list: [],
  api_list: {},
  api_num: 0,
}
const getters = {
  getcontent_list: state => {
    return state.content_list
  },
  fruitsCount (state) {
    return state.content_list.length
  },
  now_open (state) {
    return state.now_open
  },

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
  },
  add_api (state, api) {
    state.api_num++
    api.number = state.api_num
    state.api_list[state.api_num] = api
    return state.api_num
  },
  add_group (state, group) {
    return state.group_list.push(group)
  }

}

const actions = {
  someAsyncTask ({commit}) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  set_now (context, reload) {
    context.commit('set_now', reload.content)
  },
  content_add (context, reload) {
    console.log('content_add,action')
    context.commit('content_add', reload.content)
  },

  content_empty (context) {
    context.commit('content_empty')
  },
  add_api (context, reload) {
    context.commit('add_api', reload.data)
  },
  add_group (context, reload) {
    context.commit('add_group', reload.data)
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
