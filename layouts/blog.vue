<template>
    <div class="Blog-layout">
        <Header />
        <section class="Blog-content-container container">
            <div class="Blog-content">
                <slot></slot>
                <div class="Blog-bottom">
                    
                </div>
            </div>
        </section>
        <nav class="Blog-nav" :class="{'toggled': nav_show}">
            <div class="Blog-nav__title h3">Page nav</div>
            <ul :class="{'toggled': nav_show}">
                <li
                    v-for="link in blogNav"
                    :class="'link-' + link.level"
                    :key="link.link"
                    :style="'--link-offset:' + link.level + 'px'"
                ><a :href="link.link" @click="nav_show = false">{{link.text}}</a></li>
            </ul>
            <button class="btn" @click="nav_show = !nav_show">Page nav</button>
        </nav>
        <Footer />
    </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
const blogNav = useBlogNav()
const nav_show = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.Blog-layout {
    :deep {
        h1, h2, h3, h4, h5, h6 {
            position: relative;
            .anchor {
                opacity: 0;
                font-size: 30px;
                position: absolute;
                left: -20px;
                &::after {
                    content: '⋮⋮';
                }
            }
            &:hover {
                .anchor {
                    opacity: 1;
                }
            }
        }
    }
}
.Blog-content-container {
    padding-left: 30px;
    padding-right: 30px;
    @media (min-width: 768px) {
        --container-width: var(--container-width-md);
        border-left: 1px solid rgba(var(--rgba-contrast), .4);
        border-right: 1px solid rgba(var(--rgba-contrast), .4);
    }
}
.Blog-content {
    padding-top: var(--section-margin);
    padding-bottom: var(--section-margin);
}
.Blog-nav {
    position: fixed;
    bottom: 10vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    &__title {
        display: none;
    }
    > * {
        pointer-events: auto;
    }
    button {
        width: unset;
    }
    ul {
        width: 80%;
        list-style: none;
        margin: 0;
        background-color: var(--bgc);
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(var(--rgba-contrast), .4);
        display: none;
        &.toggled {
            display: grid;
            grid-gap: 3px;
        }
    }
    @media (min-width: 1200px) {
        width: unset;
        transform: none;
        display: block;
        &__title {
            display: block;
        }
        button {
            display: none;
        }
        ul {
            position: unset;
            padding: 0;
            box-shadow: none;
            display: grid;
        }
        top: 100px;
        left: calc(50% + 357px + 15px);
    }
    li {
        margin: 0;
        padding: 0;
        @media (min-width: 1200px) {
            margin-left: calc(var(--link-offset) * 10);
        }
    }
    a {
        position: relative;
        display: inline-block;
        padding-bottom: 3px;
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: var(--contrast);
            transform: scaleX(0);
            transition: .3s transform;
            transform-origin: right;
        }
        &:hover {
            &::after {
                transform: scaleX(1);
                transform-origin: left;
            }
        }
    }
}
</style>