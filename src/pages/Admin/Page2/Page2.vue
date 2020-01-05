<template>
    <div>
        {{rand}}
    </div>
</template>

<script>
    export default {
        name: "Page2",
        data(){
            return{
                rand: Math.random()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>