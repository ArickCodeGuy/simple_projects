<template>
    <section class="section">
        <div class="container">
            <h1 class="h1">Blog</h1>
            <div class="posts">
                <nuxt-link
                    v-for="post in posts"
                    class="post"
                    :to="'/blog/posts/' + post.file_name.replace(/\.md/, '')"
                >
                    <div class="post__title h3">{{post.data.title}}</div>
                    <div class="post__desc">{{post.data.description}}</div>
                </nuxt-link>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { buildQueryString } from '~/helpers/index'
const route = useRoute()
const posts = ref([])
const page = computed<number>(() => {
    const current_page = parseInt(route.query.page)
    return current_page ? current_page : 1
})
async function loadPosts() {
    const { data: posts_list } = await useFetch('/api/get_blog_posts' + buildQueryString({page: page.value}))
    posts.value = posts_list.value.posts
}
loadPosts()
</script>

<style lang="scss" scoped>
.posts {
    display: grid;
    grid-gap: var(--column-gap);
}
.post {
    padding: 10px;
    border-radius: 4px;
    background-color: rgba(var(--rgba-bgc), .2);
}
</style>