import Vue from 'vue';
import Router from 'vue-router';

const home = resolve => require(['./components/common/Home.vue'], resolve)
const empty = resolve => require(['./components/common/Empty.vue'], resolve)

Vue.use(Router);

export const constantRouterMap = [
    {
        path: '/',
        redirect: '/dashboard',
        meta: {
            title: '🐖',
            icon: 'el-icon-message',
            hidden: true,
            leaf: false
        }
    },
    {
        path: '/login',
        component: resolve => require(['@/views/Login.vue'], resolve),
        meta: {
            title: '登录',
            hidden: true,
            roles: ['admin']
        }
    },
    {
        path: '/404',
        component: resolve => require(['@/views/404.vue'], resolve),
        meta: {
            title: '404',
            hidden: true
        }
        
    },
    {
        path: '/',
        component: home,
        meta: {
            title: '自述文件',
            icon: 'iconfont icon-shouji',
            leaf: true
        },
        children: [
            {
                path: '/dashboard',
                component: resolve => require(['@/views/Dashboard.vue'], resolve)
            }
        ]
    }


]

export default new Router({
    // mode:'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [
    
    {
        path: '/',
        component: home,
        meta: {
            title: '销售管理1',
            icon: 'el-icon-message',
        },
        children: [
            { 
                path: '/salesManagement',
                component: empty,
                meta: {
                    title: '销售管理',
                },
                children: [
                    {
                        path: '/salesManagement/list',
                        component: resolve => require(['@/views/salesManagement/list.vue'], resolve),
                        meta: {
                            title: '销售管理'
                        }
                    },
                    {
                        path: '/salesManagement/edit',
                        component: resolve => require(['@/views/salesManagement/edit.vue'], resolve),
                        meta: {
                            title: '销售管理'
                        } 
                    }
                ]
            },
            { 
                path: '/newCarManagement',
                component: resolve => require(['@/views/BaseTable.vue'], resolve),
                meta: {
                    title: '新车采购管理',
                },
                children: [
                    {
                        path: '/newCarManagement/list',
                        component: resolve => require(['@/views/salesManagement/list.vue'], resolve),
                        meta: {
                            title: '销售管理'
                        }
                    },
                    {
                        path: '/newCarManagement/edit',
                        component: resolve => require(['@/views/salesManagement/edit.vue'], resolve),
                        meta: {
                            title: '销售管理'
                        } 
                    }
                ]
            },
            {
                path: '/salesSet',
                component: resolve => require(['@/views/Upload.vue'], resolve),
                meta: {
                    title: '销售流程设置'
                }
            }
        ]
    },
    
    {
        path: '/',
        component: home,
        meta: {
            title: '基础表格',
            icon: 'el-icon-message',
            leaf: true
        },
        children: [
            {
                path: '/table',
                component: resolve => require(['@/views/BaseTable.vue'], resolve)
            }
        ]
    },
    {
        path: '/',
        component: home,
        meta: {
            title: '权限测试',
            icon: 'el-icon-message',
            leaf: true,
            roles: ['adssssmin']
        },
        children: [
            {
                path: '/permission',
                component: resolve => require(['@/views/Permission.vue'], resolve)
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        meta: {
            title: '404',
            hidden: true
        },
    }
]