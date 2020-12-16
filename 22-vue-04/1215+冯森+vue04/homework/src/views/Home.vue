<template>
    <div>
        <h2>home 页面</h2>
        <!-- <router-link to = "/login">go login</router-link> -->
        <p><button @click="goLogin">go login</button></p>
    </div>
</template>

<script>
    export default {
        methods: {
            goLogin() {
                this.$router.push({
                    path:"/login"
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>