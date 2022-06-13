<template>
    <ul class="breadcrumbs">
        <li class="item"><NuxtLink to="/">Home</NuxtLink></li>
        <li class="item" v-for="crumb in crumbs"><NuxtLink :to="crumb.link">{{crumb.text}}</NuxtLink></li>
    </ul>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
interface CrumbItem {
    link: string;
    text: string;
}
const props = defineProps({
    crumbs: {
        type: Array as PropType<CrumbItem[]>,
        default: null
    }
})
const crumbs = ref<CrumbItem[]>([])
if (Array.isArray(props.crumbs)) {
    crumbs.value = props.crumbs
}else {
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    const route = useRoute()

    let params = route.path.startsWith('/')
    ? route.path.substring(1).split('/')
    : route.path.split('/');
    params = params.splice(0, params.length - 1)
    let path = ''
    params.forEach((param, index) => {
        path = `${path}/${param}`
        crumbs.value.push({
            link: path,
            text: param
        })
    })
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 10px 0;
    @media (min-width: 1200px) {
        gap: 30px;
    }
}
</style>
