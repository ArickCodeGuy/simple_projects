const BLOG_PATH = '/blog/'
import { getPost } from '~/server/get_post'
import { decomposeUrlParams } from '~/helpers/index.ts'

export default (e) => {
    const { post } = decomposeUrlParams(e.url)
    if (!post) throw 'post is not defined'
    const path = BLOG_PATH + post + '.md'
    return getPost(path)
}