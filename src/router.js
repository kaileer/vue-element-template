import Vue from 'vue';
import Router from 'vue-router';

const home = resolve => require(['./components/common/Home.vue'], resolve)

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            hidden: true,
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: home,
            name: '自述文件',
            icon: 'el-icon-message',
            leaf: true,
            children: [
                { path: '/dashboard', component: resolve => require(['./views/Dashboard.vue'], resolve), name: '自述文件'}
            ]
        },
        {
            path: '/',
            component: home,
            name: '表单相关',
            icon: 'el-icon-message',
            children: [
                {
                    path: '/form',
                    component: resolve => require(['./views/BaseForm.vue'], resolve),
                    name: '基本表单'
                },
                { 
                    path: '/BaseForm',
                    component: resolve => require(['./views/BaseForm.vue'], resolve),
                    name: '三级菜单',
                    children: [
                        {
                            path: '/editor',
                            name: '富文本编辑器组件',
                            component: resolve => require(['./views/VueEditor.vue'], resolve)
                        },
                        {
                            path: '/markdown',
                            component: resolve => require(['./views/Markdown.vue'], resolve),
                            name: 'markdown编辑器'   
                        }
                    ]
                },
                {
                    path: '/upload',
                    name: '文件上传',
                    component: resolve => require(['./views/Upload.vue'], resolve)
                }
            ]
        },
        {
            path: '/',
            name: '权限测试',
            component: home,
            leaf: true,
            icon: 'el-icon-message',
            children: [
                {
                    // 权限页面
                    path: '/permission',
                    name: '权限测试1',
                    component: resolve => require(['./views/Permission.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            name: '登录',
            hidden: true,
            component: resolve => require(['./views/Login.vue'], resolve)
        },
        {
            path: '/404',
            name: '404',
            hidden: true,
            component: resolve => require(['./views/404.vue'], resolve)
            
        },
        {
            path: '*',
            name: '404',
            hidden: true,
            redirect: '/404'
        }
    ]
})
