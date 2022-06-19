import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { decomposeUrlParams } from '~/helpers/index.ts'

const PROJECT_PATH = process.env.INIT_CWD
const POSTS_PER_PAGE = 2

export default (url, path) => {
    if (!url) throw 'url is undefined'
    if (!path) throw 'search path is undefined'
    let {page, posts} = decomposeUrlParams(url)
    page = parseInt(page)
    isNaN(page) ? page = 1 : false
    posts ? true : posts = POSTS_PER_PAGE

    const return_data = {
        posts: [],
        pages: 1,
        page: page,
    }
    const final_path = PROJECT_PATH + path
    const files_arr = fs.readdirSync(final_path)
    return_data.pages = Math.ceil(files_arr.length / posts)

    if (page > return_data.pages) return return_data

    let first_file_index = (page - 1) * posts
    let last_file_index =  first_file_index + posts
    // path = /pages/somedir/somefile.md
    // cut_path = /somedir/somefile.md
    const cut_path = path.replace(/\/\w+/, '')
    for (let file_index = first_file_index; file_index < last_file_index; file_index++) {
        const file = files_arr[file_index]
        // case with last page which can be not full
        if (!file) return return_data
        const { data } = matter(fs.readFileSync(final_path + file))
        return_data.posts.push({
            file_name: file,
            file_path: path + file,
            // remove file extension for links
            link: cut_path + file.replace(/\.\w+/, ''),
            data
        })
    }
    return return_data
}