<template>
    <ul class="Pagination">
        <li
            v-for="link in links"
            @click="handleClick(link)"
            :class="{'current': link === props.page}"
        >{{link}}</li>
    </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
interface Props {
    page: number;
    pages: number;
    range?: number;
}

const links = computed<number[]>(() => {
    const arr = []
    if (props.pages <= props.range) {
        for (let i = 1; i <= props.pages; i++) {
            arr.push(i)
        }
        return arr
    }
    arr.push(1)
    const start = (props.page - props.range) <= 1 ? 2 : props.page - props.range
    const end = (props.page + props.range) >= props.pages ? props.pages - 1 : props.page + props.range
    for (let i = start; i <= end; i++) {
        arr.push(i)
    }
    arr.push(props.pages)
    return arr
})
function handleClick(link: number):void {
    if (props.page === link) return
    emit('update', link)
}
const props = withDefaults(defineProps<Props>(), {
    range: 1
})
const emit = defineEmits(['update'])
</script>

<style lang="scss" scoped>
.Pagination {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 5px;
    li {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--block-color2);
        border-radius: 5px;
        width: 40px;
        height: 40px;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
        &.current {
            font-weight: normal;
            cursor: auto;
        }
    }
}
</style>