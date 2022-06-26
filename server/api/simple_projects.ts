import { getPosts } from '~/server/get_posts'
const SIMPLE_PROJECTS_PATH = '/pages/simple_projects/'

export default (e) => {
    return getPosts('/pages/simple_projects/', useQuery(e))
}