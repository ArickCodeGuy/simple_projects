
// output { [index: string]: string }
export function decomposeUrlParams(string) {
    const result = {}
    const [_, query] = string.split('?');
    if (!query) return result
    const params = query.split('&');
    params.forEach(param => {
        const [key, value] = param.split('=')
        if (value === undefined) return
        result[key] = value
    })
    return result
}