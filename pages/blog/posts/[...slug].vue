<template>
    <div class="post-content" v-html="post_data.html"></div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const route = useRoute()
import parseMd from '~/helpers/parseMd'
const post_data = ref({})
const { data: fetched_post } = await useFetch(`/api/get_blog_post?post=${route.params.slug[0]}`)
post_data.value = parseMd(fetched_post.value.content)
setBlogNav(post_data.value.headings)
definePageMeta({
  layout: "blog",
});
</script>