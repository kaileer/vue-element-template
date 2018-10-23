// import { loginByUsername, logout, getUserInfo } from '@/api/login'

const user = {
    state: {
        username: '',
        token: localStorage.getItem('token'),
        avatar: '',
        roles: []
    },

    mutations: {
        set_token: (state, token) => {
            state.token = token
        },
        set_username: (state, username) => {
            state.username = username
        },
        set_avatar: (state, avatar) => {
            state.avatar = avatar
        },
        set_roles: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                const data = {
                    token: 'asudfgdsgfjkgsdj'
                }
                commit('set_token', data.token)

                localStorage.setItem('token',data.token)
                resolve()
                /*loginByUsername(username, userInfo.password).then(response => {
                    const data = response.data
                    commit('set_token', data.token)
                    localStorage.setItem('token',data.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })*/
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                const data = {
                    roles: ['admin'],
                    username: 'admin'
                }
                commit('set_roles', data.roles)
                commit('set_username', data.username)
                resolve(data)
                /*getUserInfo(state.token).then(response => {
                    const data = response.data
                    commit('set_roles', data.roles)
                    commit('set_username', data.name)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })*/
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('set_token', '')
                commit('set_roles', [])
                localStorage.clear()
                resolve()
                /*logout(state.token).then(() => {
                    commit('set_token', '')
                    commit('set_roles', [])
                    localStorage.clear()
                    resolve()
                }).catch(error => {
                    reject(error)
                })*/
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('set_token', '')
                localStorage.clear()
                resolve()
            })
        },

        // 动态修改权限
        ChangeRoles({ commit }, role) {
            return new Promise(resolve => {
                commit('set_token', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    commit('set_roles', data.roles)
                    commit('set_username', data.name)
                    commit('set_avatar', data.avatar)
                    resolve()
                })
            })
        }
    }
}

export default user