// Limitation: multiple query params with same key
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
export function buildQueryString(obj: Record<string, string | number>): string {
    const arr = []
    for (let param in obj) {
        const value = obj[param]
        if (!value) continue
        arr.push(param + '=' + value)
    }
    if (!arr.length) return ''
    return '?' + arr.join('&')
}