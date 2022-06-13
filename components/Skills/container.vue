<template>
    <ul class="skills-container">
        <SkillsItem
            v-for="(item, i) in items"
            :key="i"
            :title="item.title"
            :img="item.img"
            :link="item.link"
        />
    </ul>
</template>

<script>
export default {
    props: ['items']
}
</script>

<style lang="scss" scoped>
.skills-container {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px var(--column-gap);
}
</style>