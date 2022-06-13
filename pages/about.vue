<template>
    <div class="about-page">
        <section class="main-section banner" id="main" style="background-image: linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.8)), url('/mountain.jpg');">
            <div class="main-section__container container">
                <!-- <div @click="counterAdd()">{{ref1}}</div> -->
                <h1 class="h1">Hi! I'm Arkadiy and I'm a frontend developer.</h1>
                <div class="row">
                    <div class="col-xl-6">
                        <p>I've worked as frontend dev for more than two years and have had a lot of experience in building websites. From building a simple landing to building online shops.</p>
                        <p>I'm really passionate about my career so I spend a lot of my free time to learn new things about web.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="about-section banner" id="projects">
            <div class="container">
                <h2 class="h1">Projects</h2>
                <p>Apart from my full time job I <span style="text-decoration: line-through;">like</span> love to build simple projects from scratch just for fun. These are some of my projects put on public. I use github to store my repos and github pages to make it easier to view them without downloading. Feedback would be really appreciated.</p>
                <Spacer class="spacer-9" />
                <ProjectsContainer
                    :items="projects"
                />
            </div>
        </section>
        <section class="skills-section banner" id="skills">
            <div class="container">
                <h2 class="h1">Skills</h2>
                <div class="row">
                    <div class="col-md-12">
                        <h3 class="h3">Things that I know and use</h3>
                        <SkillsContainer
                            :items="skills"
                        />
                    </div>
                    <div class="col-md-12">
                        <h3 class="h3">Things I'm planning to learn</h3>
                        <SkillsContainer
                            :items="plans"
                        />
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
const projects = ref([
    {title: 'Drag&Drop', text: 'Simple library for creating drag and drop for element with vanilla js', link: 'https://github.com/ArickCodeGuy/drag_drop', thumb: ''},
    {title: 'AOS', text: 'Animate on scroll library ', link: 'https://github.com/ArickCodeGuy/aos', thumb: ''},
    {title: 'Vue Project', text: 'The project you\'re browsing right now :)', link: '', thumb: ''},
])
const skills = ref([
    {title: 'HTML, HTML5', img: 'img-html'},
    {title: 'css, scss', img: 'img-css'},
    {title: 'javascript', img: 'img-js'},
    {title: 'vue.js, vuex, nuxt', img: 'img-vue'},
    {title: 'git', img: 'img-git'},
    {title: 'bootstrap', img: 'img-bootstrap'},
])
const plans = ref([
    {title: 'tree.js', img: ''}
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
</style>