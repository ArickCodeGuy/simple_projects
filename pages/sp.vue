<template>
    <div class="SP">
        <section class="section">
            <div class="container">
                <h1 class="h1">Simple projects</h1>
                <p>These are simple projects that keep me occupied when I have nothing important to do. A lot of them are currently not finished.</p>
                <p>I try that kind of projects becasue you can build them fast and always learn something new. It's also a lot of fun</p>
                <div class="projects">
                    <nuxt-link
                        v-for="project in posts"
                        class="project"
                        :to="'/simple_projects/' + project.file_name.replace(/\.vue/, '')"
                    >
                        <div class="project__thumb">
                            <img
                                v-if="project.data.thumb"
                                :src="project.data.thumb"
                            />
                            <i v-else>no image</i>
                        </div>
                        <div class="project__content">
                            <p class="project__title">{{project.data.name}}</p>
                            <p class="project__description">{{project.data.description}}</p>
                        </div>
                    </nuxt-link>
                </div>
                <Pagination
                    v-if="pages > 1"
                    class="Pagination"
                    :page="page"
                    :pages="pages"
                    @update="changePage($event)"
                />
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { buildQueryString } from '~/helpers/index'
const router = useRouter()
const route = useRoute()
const posts = ref([])
const pages = ref<number>(1)
const page = computed<number>(() => {
    const current_page = parseInt(route.query.page)
    return current_page ? current_page : 1
})
watch(page, newval => {
    // posts.value.length = 0
    // @@TODO window is undefined on init
    // window ? window.scrollTo(0,0) : false
    loadPosts(newval)
}, {immediate: true})
async function loadPosts(page_to_load: number): void {
    let final_url = '/api/simple_projects' + buildQueryString({page: page_to_load})
    const { data: posts_data } = await useFetch(final_url)
    posts.value = posts_data.value.posts
    pages.value = posts_data.value.pages
}
function changePage(page_to_chage_to: number):void {
    const query = {}
    page_to_chage_to !== 1 ? query.page = page_to_chage_to : false
    router.push({ query })
}
</script>

<style lang="scss" scoped>
.projects {
    display: grid;
    gap: var(--column-gap);
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    @media (min-width: 1200px) {
        grid-template-columns: 100%;
    }
}
.project {
    text-decoration: none;
    border-radius: 10px;
    background-color: rgba(var(--rgba-bgc), .4);
    min-height: 400px;
    transition: .3s;
    overflow: hidden;
    &:hover {
        box-shadow: 10px 10px 3px var(--contrast);
    }
    @media (min-width: 1200px) {
        display: flex;
        &:nth-child(2n + 1) {
            flex-direction: row-reverse;
        }
    }
    &__content {
        padding: 15px;
        width: 100%;
        @media (min-width: 1200px) {
            padding: 40px;
        }
    }
    &__thumb {
        height: 300px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(var(--rgba-bgc), .5);
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        @media (min-width: 1200px) {
            width: 400px;
            height: unset;
        }
    }
    &__title {
        font-size: 1.2em;
        font-weight: bold;
    }
}
.SP {
    .Pagination {
        margin-top: 20px;
    }
}
</style>