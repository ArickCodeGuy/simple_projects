import { marked } from 'marked'
export default (md) => {
    return marked.parse(md)
}