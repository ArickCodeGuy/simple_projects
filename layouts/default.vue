<template>
    <div id="default-layout">
        <Header/>
        <main class="default-layout__main"><slot/></main>
        <Footer/>
        <div id="popup-target"/>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { changeTheme } from '~/composables/index'
onMounted(() => {
    // set default theme
    localStorage.theme ? changeTheme(localStorage.theme): false
})
</script>