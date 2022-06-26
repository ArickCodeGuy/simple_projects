import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
const PROJECT_PATH = process.env.INIT_CWD

export interface Post {
    file_path: string;
    content: string;
    data: {
        [index: string]: string;
    };
}

export function getPost(path: string): Post {
    const final_url = PROJECT_PATH + path
    const {content, data} = matter(fs.readFileSync(final_url))
    return {
        file_path: path,
        data,
        content
    }
}