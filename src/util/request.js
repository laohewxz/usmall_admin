import axios from "axios"
import qs from "qs"

//响应拦截
axios.interceptors.response.use(res => {
    console.group("本次路径：" + res.config.url)
    console.log(res)
    return res
})

const baseUrl = "/api"

//菜单添加 
export const requestMenuAdd=(params)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:'post',
        data:qs.stringify(params)
    })
}

//菜单列表
export const requestMenuList=(params)=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:params
    })
}

//请求一条数据
export const requestMenuDetail=(params)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:params
    })
}

//菜单修改
export const requestMenuUpdate = params=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data: qs.stringify(params)
    }) 
}

//删除
export const requestMenuDelete = params=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data: qs.stringify(params)
    })
}


// ========================角色===============================

//角色添加
export const requestRoleAdd = (params)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data: qs.stringify(params)
    })
}

//角色列表
export const requestRoleList = ()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get",
    })
}

//角色获取  一条
export const requestRoleDetail = (params)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params
    })
}


//角色修改
export const requestRoleUpdate = (params)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data: qs.stringify(params)
    })
}


//角色删除
export const requestRoleDelete = (params)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data: qs.stringify(params)
    })
}

//===============================管理员=================================

//管理员添加
export const requestManageAdd = (params)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data: qs.stringify(params)
    })
}

//管理员列表
export const requestManageList = (params)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params
    })
}

//管理员获取  一条
export const requestManageDetail = (params) => axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params
})


//管理员修改
export const requestManageUpdate = (params)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data: qs.stringify(params)
    })
}


//管理员删除
export const requestManageDelete = (params)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data: qs.stringify(params)
    })
}

//管理员总数
export const requestManageCount = () => axios({
    url: baseUrl + "/api/usercount",
    method: "get",
})

//管理员登录
export const requestLogin = (params)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data: qs.stringify(params)
    })
}

//=======================================会员管理===================================================
//会员列表
export const requestMemberList = () => axios({
    url: baseUrl + "/api/memberlist",
    method: "get",
})

//会获取  一条
export const requestMemberDetail = (params) => axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params
})

//会员修改
export const requestMemberUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:qs.stringify(params)
    })
}

//========================================商品分类===============================================
//商品分类添加
export const requestCateAdd = (params)=>{
    var formData = new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data: formData
    })
}

//商品分类列表
export const requestCateList = (params)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params
    })
}

//商品分类获取  一条
export const requestCateDetail = (params)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params
    })
}


//商品分类修改
export const requestCateUpdate = (params)=>{
    var formData = new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data: formData
    })
}


//商品分类删除
export const requestCateDelete = (params)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data: qs.stringify(params)
    })
}

//====================================商品规格========================================
//商品规格添加
export const requestSpecAdd = (params)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data: qs.stringify(params)
    })
}

//商品规格列表
export const requestSpecList = (params)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params
    })
}

//商品规格获取  一条
export const requestSpecDetail = (params) => axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params
})


//商品规格修改
export const requestSpecUpdate = (params)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data: qs.stringify(params)
    })
}


//商品规格删除
export const requestSpecDelete = (params)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data: qs.stringify(params)
    })
}

//商品规格总数
export const requestSpecCount = () => axios({
    url: baseUrl + "/api/specscount",
    method: "get",
})