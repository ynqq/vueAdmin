<template>
    <div>
        <el-input v-model="obj.name"></el-input>
        <el-input v-model="obj.pass"></el-input>
        <slot :slotScope="obj">

        </slot>
    </div>
</template>

<script>
    export default {
        props: {
            obj: {
                type: Object,
                default: {
                    name: "",
                    pass: "",
                },
                required: true
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>