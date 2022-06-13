<template>
    <li class="skills-item">
        <div class="skills-item__img" :class="img"></div>
        <div class="skills-item__title">{{title}}</div>
    </li>
</template>

<script>
export default {
    props: ['title', 'img']
}
</script>

<style lang="scss" scoped>
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
.img-html {background-image: url('/skills/html.png');}
.img-js {background-image: url('/skills/js.png');}
.img-git {background-image: url('/skills/git.png');}
.img-css {background-image: url('/skills/css.png');}
.img-bootstrap {background-image: url('/skills/bootstrap.png');}
.img-vue {background-image: url('/skills/vue.png');}
</style>