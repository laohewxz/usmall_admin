import {requestSeckillList} from "../../util/request"


const state = {
    list: []
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}

const actions = {
    requestList(context) {
        requestSeckillList().then(res => {
            // console.log(res)
            context.commit("changeList", res.data.list)
        })
    }
}

const a = {
   list(state){
       return state.list
   }
}

export default {
    state,
    mutations,
    actions,
    getters:a,
    namespaced: true
}