<template>
    <div class="error-page">
        <div @click="transmit">{{uname}}</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            bbb: '山东矿机发还是肯德基'
        }
    },
    props:{
        uname:{
            type: String,
            default: '123'
        }
    },
    mounted(){
        // this.$emit('ontransmit', this.bbb)
    },
    methods: {
        transmit() {
            // this.$router.go(-1);
            this.$emit('ontransmit', this.bbb)
        }
    }
}
</script>
<style scoped>
</style>