<template>
    <div>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
        <div id="popup-target" />
        <Alerts />
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { changeTheme } from '~/composables/index'
onMounted(() => {
    // set default theme
    localStorage.theme ? changeTheme(localStorage.theme): false
})
</script>