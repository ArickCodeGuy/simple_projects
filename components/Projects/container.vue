<template>
    <ul class="projects-container">
        <ProjectsItem
            v-for="(item, i) in items"
            :key="i"
            :title="item.title"
            :link="item.link"
            :thumb="item.thumb"
            :text="item.text"
        />
    </ul>
</template>

<script>
export default {
    props: ['items']
}
</script>

<style lang="scss" scoped>
.projects-container {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>