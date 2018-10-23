const getters = {
    collapse: state => state.menu.collapse,
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    roles: state => state.user.roles,
    addRouters: state => state.permission.addRouters,
    permission_routers: state => state.permission.routers
}
export default getters