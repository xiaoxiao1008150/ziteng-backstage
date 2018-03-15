import { login, logout, getUserInfo } from 'api/login'
import { getToken, setToken, removeToken } from 'utils/auth'

const user = {
  state: {
    user: '',
    status: 'login',
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
          login(userInfo).then(res => {
            console.log('userres', res)
              let result = res.data
              if(result.code === 'ok') {
                let data = result.data
                // setToken(data.id)
                setToken({id:data.id,name:data.contact_name})
                commit('SET_TOKEN', {id:data.id,name:data.contact_name})
                commit('SET_STATUS', 'login')
              }
              // 数据传到页面中
              resolve(res)
          })
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
