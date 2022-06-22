<template>
    <header class="header" ref="header">
        <div class="container">
            <div class="header-nav">
                <ul class="header-nav__list">
                    <li class="header-nav__item">
                        <NuxtLink to="/" class="header-nav__link">Home</NuxtLink>
                    </li>
                    <li
                        class="header-nav__item"
                        v-for="item in nav"
                        v-bind:key="item.id"
                    >
                        <NuxtLink :to="item.link" class="header-nav__link">{{item.text}}</NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="theme-switch" @click="switchTheme" title="Change theme"></div>
        </div>
    </header>
    <div class="header-fake" ref="headerFake"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
const nav = ref([
    {text: 'About', link: '/about/'},
    {text: 'Blog', link: '/blog/'},
    {text: 'Simple projects', link: '/sp/'}
])
import { themeState, changeTheme } from '~/composables/index'
let theme = ref(themeState())
function switchTheme() {
    theme.value = theme.value === 'light' ? 'dark': 'light'
    changeTheme(theme.value)
}
const header = ref(null)
const headerFake = ref(null)
function resizeListener() {
    headerFake.value.style.height = header.value.clientHeight + 'px'
}
onMounted(() => {
    resizeListener()
    addEventListener('resize', resizeListener)
})
onUnmounted(() => {
    removeEventListener('resize', resizeListener)
})
</script>

<style lang="scss">
.header {
    z-index: 1000;
    background-color: rgba(var(--rgba-bgc), .4);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    .container {
        display: flex;
        justify-content: flex-end;
    }
    .header-nav {
        display: flex;
        @media (min-width: 1200px) {
            display: flex;
        }
    }
    .theme-switch {
        margin-left: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        &::after {
            content: '';
            display: inline-block;
            border-radius: 50%;
            background-color: var(--color-primary);
            width: 20px;
            height: 20px;
        }
        @media (min-width: 1200px) {
            &::after {
                width: 40px;
                height: 40px;
            }
        }
    }
}
.header-nav {
    align-items: center;
    &__list {
        margin: 0;
        padding: 0;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        list-style: none;
    }
    &__item {
        // font-size: 2em;
        line-height: 1em;
        margin-left: 5px;
        margin-right: 5px;
    }
    &__link {
        text-decoration: none;
        color: var(--color-primary);
        text-transform: capitalize;
        // font-weight: bold;
        &:hover {
            // text-decoration: underline;
            color: var(--color-secondary);
        }
    }
}
</style>