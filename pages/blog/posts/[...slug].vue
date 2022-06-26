<template>
    <div class="Blog-slug">
        <section class="section">
            <div class="container">
                <div class="post-content" v-html="post_html"></div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const path = `/api/get_blog_post?post=${route.params.slug[0]}`
import parseMd from '~/helpers/parseMd'
const post_html = ref(null)
useAsyncData('post', async () => {
    const { data: post } = await useFetch(path)
    post_html.value = parseMd(post.value.content)
})
</script>