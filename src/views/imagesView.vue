<template>
    <div class="error-page">
        <div v-for="item in urls">
            <img :src="item" large="https://826327700.github.io/vue-photo-preview/demo/1.jpg" preview="1" preview-text="描述文字" @click="transmit">
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            bbb: '山东矿机发还是肯德基',
            urlsa: [
                    './img/img.jpg',
                    './img/img.jpg'
                ]
        }
    },
    props:{
        urls:{
            type: Array
        }
    },
    mounted(){
        // this.$emit('ontransmit', this.bbb)
this.$preview.on('close',()=>{//close只是众多事件名的其中一个，更多请查看文档
    console.log('图片查看器被关闭')
    this.$emit('evloading', false)
})

    },
    methods: {
        transmit() {
            // this.$router.go(-1);
            this.$emit('evloading', true)
        }
    }
}
</script>
<style scoped>
</style>