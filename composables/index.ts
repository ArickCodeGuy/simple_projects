type AvaliableThemes = 'light' | 'dark'
export const themeState = () => useState<AvaliableThemes>('theme', () => 'light')

export const changeTheme = (theme: AvaliableThemes) => {
    themeState().value = theme
    localStorage.setItem('theme', theme)
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
}