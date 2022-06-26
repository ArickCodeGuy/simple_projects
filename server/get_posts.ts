import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROJECT_PATH = process.env.INIT_CWD

interface Options {
    posts_per_page?: number;
    page?: number;
}

const default_options: Options = {
    posts_per_page: 2,
    page: 1,
}

export function getPosts(path: string, provided_options: Options = {}) {
    const options: Options = Object.assign(default_options, provided_options)

    const return_data = {
        posts: [],
        pages: 1,
        page: options.page,
    }
    const final_path = PROJECT_PATH + path
    const files_arr = fs.readdirSync(final_path)
    return_data.pages = Math.ceil(files_arr.length / options.posts_per_page)

    if (options.page > return_data.pages) return return_data

    let first_file_index = (options.page - 1) * options.posts_per_page
    let last_file_index =  first_file_index + options.posts_per_page
    for (let file_index = first_file_index; file_index < last_file_index; file_index++) {
        const file = files_arr[file_index]

        // case with last page which can be not full
        if (!file) return return_data

        const { data } = matter(fs.readFileSync(final_path + file))
        return_data.posts.push({
            file_name: file,
            data
        })
    }
    return return_data
}