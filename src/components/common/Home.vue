<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <!-- <v-tags></v-tags> -->
            <div class="content">
                <div class="clearfix">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{$route.meta.title}}</strong>
                        <el-breadcrumb separator="/" class="pull-right">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.meta.title }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <keep-alive :include="tagsList">
                                <router-view></router-view>
                            </keep-alive>
                        </transition>
                    </el-col>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        data(){
            return {
                tagsList: []
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        computed:{
            ...mapGetters([
                'collapse'
            ])
        },
        created(){
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>

<style type="scss" scoped>
    .breadcrumb-container{
        padding:10px 0;
    }
</style>
