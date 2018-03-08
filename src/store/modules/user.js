import { login, logout, getUserInfo } from 'api/login'
import { getToken, setToken, removeToken } from 'utils/auth'

const user = {
  state: {
    user: '',
    status: '未注册',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: ['admin'],
    setting: {
      articlePlatform: []
    },
    flag: true,
    info:{}
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_FLAG: (state, flag) => {
      state.flag = flag
    }
  },

  actions: {
    setFlag({ commit }, flag) {
      commit('SET_FLAG', flag)
    },
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
          let data = {
              "id": "7317106a-b6f6-4193-81a3-bf5b1b3aa081",
              "login_name": "13029499224",
              "mobile_number": "13029499224",
              "contract_name": "天津支行",
              "contact_name": "杰杰",
              "status": "1",
              "password": "",
              "start_time": "2018-03-03 14:38:30",
              "expired_time": "2018-03-14 00:00:00",
              "authorities": [
                  {
                      "authority": "AUTHORITY_DEFAULT"
                  }
              ]
          };
          //首先获取id ,缓存到本地 在用户进入路由之前拉取用户信息
            // setToken(data.id)
            setToken({id:data.id,name:data.contact_name})
            commit('SET_TOKEN', {id:data.id,name:data.contact_name})
            resolve()
        // login(userInfo).then(res => {
        //   const data = res.data
        //   commit('SET_TOKEN', data.id)
        //   setToken(res.data.id)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      });
    },

    // // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(response => {
    //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('error')
    //       }
    //       const data = response.data
    //       // commit('SET_ROLES', data.roles)
    //       // commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       //处理role 数据格式
    //       let initRole = data.authorities.authority && data.authorities.authority.toLowerCase()
    //       let roleArr = initRole.split('_')
    //       let roles
    //       if(roleArr.length > 1) {
    //         roles = roleArr.slice(-1)
    //       }
    //       commit('SET_ROLES',roles)
    //       commit('SET_NAME', data.name)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
