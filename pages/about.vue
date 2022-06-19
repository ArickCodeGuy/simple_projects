<template>
    <div class="about-page">
        <section class="main-section banner" id="main" style="background-image: linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.8)), url('/mountain.jpg');">
            <div class="main-section__container container">
                <h1 class="h1">Hi! I'm Arkadiy and I'm a frontend developer.</h1>
                <div class="row">
                    <div class="col-xl-6">
                        <p>I've worked as frontend dev for more than two years and have had a lot of experience in building websites. From building a simple landing to building online shops.</p>
                        <p>I'm really passionate about my career so I spend a lot of my free time to learn new things about web.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="about-section banner" id="projects" v-if="projects">
            <div class="container">
                <h2 class="h1">Projects</h2>
                <p>Apart from my full time job I <span style="text-decoration: line-through;">like</span> love to build simple projects from scratch just for fun. These are some of my projects put on public. I use github to store my repos and github pages to make it easier to view them without downloading. Feedback would be really appreciated.</p>
                <Spacer class="spacer-9" />
                <ul class="projects-container">
                    <li v-for="(item, i) in projects" class="projects-item">
                        <div class="projects-item__thumb" :style="{backgroundImage: item.thumb}"></div>
                        <!-- <a :href="item.link" target="_blank" class="projects-item__link"></a> -->
                        <div class="projects-item__content" @click="popupVisibility = true">
                            <header class="projects-item__title">{{item.title}}</header>
                            <div class="projects-item__text" v-if="text">{{item.text}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <section class="skills-section banner" id="skills">
            <div class="container">
                <h2 class="h1">Skills</h2>
                <div class="row">
                    <div class="col-md-12">
                        <h3 class="h3">Things that I know and use</h3>
                        <ul class="skills-container">
                            <li v-for="(item, i) in skills" class="skills-item">
                                <div class="skills-item__img" :style="{'background-image': `url(${item.img})`}"></div>
                                <div class="skills-item__title">{{item.title}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" id="about">
            <div class="container">
                <h2 class="h1">About</h2>
                <p>about</p>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>

import { ref } from "vue"
// const projects = ref([
//     {title: 'Drag&Drop', text: 'Simple library for creating drag and drop for element with vanilla js', link: 'https://github.com/ArickCodeGuy/drag_drop', thumb: ''},
//     {title: 'AOS', text: 'Animate on scroll library ', link: 'https://github.com/ArickCodeGuy/aos', thumb: ''},
//     {title: 'Vue Project', text: 'The project you\'re browsing right now :)', link: '', thumb: ''},
// ])
const skills = ref([
    {title: 'HTML, HTML5', img: '/skills/html.png'},
    {title: 'css, scss', img: '/skills/css.png'},
    {title: 'javascript', img: '/skills/js.png'},
    {title: 'vue.js, vuex, nuxt', img: '/skills/vue.png'},
    {title: 'git', img: '/skills/git.png'},
    {title: 'bootstrap', img: '/skills/bootstrap.png'},
])
</script>

<style lang="scss" scoped>
.main-section {
    min-height: 100vh;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.projects-container {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
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
.skills-container {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px var(--column-gap);
}
.skills-item {
    position: relative;
    background-color: var(--block-color);
    border-radius: 10px;
    padding: 20px 30px;
    padding-left: 60px;
    &:hover {
        background-color: var(--block-color2);
    }
    &__img {
        position: absolute;
        background-color: white;
        width: 30px;
        height: 30px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
    &__title {
        font-size: 1.4em;
    }
}
</style>