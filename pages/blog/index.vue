<template>
    <section class="section">
        <div class="container">
            <h1 class="h1">Blog</h1>
            <div v-for="post in posts">
                <nuxt-link :to="'/blog/posts/' + post.file_name.replace(/\.md/, '')">{{post.data.title}}</nuxt-link>
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