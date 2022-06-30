export interface BlogNavItem {
    text: string;
    link: string;
    level: number;
}

export const useBlogNav = () => useState<BlogNavItem[]>('BlogNav', () => [])

export const setBlogNav = (nav: BlogNavItem[]) : void => {
    useBlogNav().value = nav
}