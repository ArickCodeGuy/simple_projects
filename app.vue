<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
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