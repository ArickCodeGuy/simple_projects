import get_posts from '~/server/api/get_posts'
const SIMPLE_PROJECTS_PATH = '/pages/simple_projects/'
export default (e) => {
    return get_posts(e.url, SIMPLE_PROJECTS_PATH)
}