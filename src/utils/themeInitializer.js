export const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    return theme === 'dark';
};

export const getTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
};

export const setTheme = (isDark) => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};