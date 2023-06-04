<template>
    <div>
        <v-tabs v-model="activeNote" fixed-tabs>
            <v-tab>Active Tab</v-tab>
            <v-tab>Second Tab</v-tab>
            <v-tab>Third Tab</v-tab>
        </v-tabs>
        <v-divider></v-divider>
    </div>
</template>

<script>

import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const state = reactive({
            activeNote: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>

</style>