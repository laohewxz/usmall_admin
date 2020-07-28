import { requestSpecList, requestSpecCount } from "../../util/request"

const state = {
    list: [],
    //一页的数量
    size: 2,
    //总页数
    total: 0,
    //当前页码
    page: 1
}
const mutations = {
    //修改数组
    changeList(state, arr) {
        state.list = arr
    },
    //修改总数
    changeTotal(state, num) {
        state.total = num
    },
    //修改当前页码
    changePage(state, page) {
        state.page = page
    }
}

const actions = {
    //获取列表数据
    requestList(context) {
        const params = {
            page: context.state.page,
            size: context.state.size
        }
        requestSpecList(params).then(res => {
            if(res.data.list.length==0&&context.state.page>1){
                context.commit("changePage",context.state.page-1);
                context.dispatch("requestList")
                return;
            }
            context.commit("changeList", res.data.list)
        })
    },
    //获取总数
    requestTotal(context) {
        requestSpecCount().then((res) => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    //页面修改页码数
    changePage(context,page){
        context.commit("changePage",page)
    }
}

const a = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters: a,
    namespaced: true
}