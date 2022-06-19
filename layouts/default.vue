<template>
    <div id="default-layout">
        <Header/>
        <main class="default-layout__main"><slot/></main>
        <Footer/>
        <div id="popup-target"/>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { changeTheme } from '~/composables/index'
onBeforeMount(() => {
    // set default theme
    const theme = localStorage.getItem('theme')
    theme ? changeTheme(theme): false
})
</script>