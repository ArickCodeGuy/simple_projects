<template>
    <li class="projects-item">
        <div class="projects-item__thumb" :style="{backgroundImage: thumb}"></div>
        <!-- <a :href="link" target="_blank" class="projects-item__link"></a> -->
        <div class="projects-item__content" @click="popupVisibility = true">
            <header class="projects-item__title">{{title}}</header>
            <div class="projects-item__text" v-if="text">{{text}}</div>
        </div>
        <Popup v-model:visibility="popupVisibility">
            <div class="h1">{{title}}</div>
        </Popup>
    </li>
</template>

<script lang="ts" setup>
const props = defineProps(['title', 'text', 'link', 'thumb'])
import { ref } from 'vue'
let popupVisibility = ref(false)
</script>

<style lang="scss" scoped>
    .projects-item {
        cursor: pointer;
        list-style: none;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        z-index: 0;
        width: 100%;
        max-width: 100%;
        border-radius: 10px;
        overflow: hidden;
        top: 0;
        left: 0;
        transition: .3s top, .3s left;
        background-color: var(--block-color);
        &:hover {
            top: -5px;
            left: -5px;
        }
        &::after {
            content: '';
            display: block;
            padding-top: 50%;
        }
        &__content {
            position: absolute;
            line-height: 1.3em;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            padding: 20px;
        }
        &__title {
            font-size: 1.5em;
        }
        &__text {
            margin-top: 1em;
        }
        &__thumb {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            opacity: .3;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
        &__link {
            position: absolute;
            z-index: 5;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
        @media (min-width: 768px) {
            &::after {
                padding-top: 90%;
            }
        }
    }
    .project-list-item {
    }
</style>