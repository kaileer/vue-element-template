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
                { path: '/dashboard', component: resolve => require(['./components/page/Dashboard.vue'], resolve), name: '自述文件'}
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
                    component: resolve => require(['./components/page/BaseForm.vue'], resolve),
                    name: '基本表单'
                },
                { 
                    path: '/BaseForm',
                    component: resolve => require(['./components/page/BaseForm.vue'], resolve),
                    name: '三级菜单',
                    children: [
                        {
                            path: '/editor',
                            name: '富文本编辑器组件',
                            component: resolve => require(['./components/page/VueEditor.vue'], resolve)
                        },
                        {
                            path: '/markdown',
                            component: resolve => require(['./components/page/Markdown.vue'], resolve),
                            name: 'markdown编辑器'   
                        }
                    ]
                },
                {
                    path: '/upload',
                    name: '文件上传',
                    component: resolve => require(['./components/page/Upload.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            name: '登录',
            hidden: true,
            component: resolve => require(['./components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            name: '404',
            hidden: true,
            component: resolve => require(['./components/page/404.vue'], resolve)
            
        },
        {
            path: '*',
            name: '404',
            hidden: true,
            redirect: '/404'
        }
    ]
})
