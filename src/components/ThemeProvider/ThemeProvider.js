import { useEffect } from 'react';
import { initializeTheme } from '../../utils/themeInitializer';

function ThemeProvider({ children }) {
    useEffect(() => {
        // Initialize theme when app loads
        initializeTheme();
    }, []);

    return children;
}

export default ThemeProvider;