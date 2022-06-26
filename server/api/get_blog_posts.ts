import { getPosts } from '~/server/get_posts'
const BLOG_PATH = '/blog/'

export default (e) => {
    return getPosts(BLOG_PATH, useQuery(e))
}