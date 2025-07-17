import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useRef, useState, useEffect} from 'react';

import spbw from '../../utils/spbw';
import { initializeTheme, getTheme, setTheme } from '../../utils/themeInitializer';
import cls from './header.module.css';

function Header({ href, label }) {
    const clct = useRef(0);
    const dispatch = useDispatch();
    
    // Initialize theme using the utility function
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return initializeTheme();
    });
    
    const clhd = () => {
        if (++clct.current === 10) dispatch({type: "EN_ACDEEKRSTU"});
    }

    const toggleTheme = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        setTheme(newIsDarkMode);
    };

    return (
        <header className={cls.header}>
            <div className={spbw('container', cls.container)}>
                <div className={cls.leftSection}>
                    <div className={cls.label}>
                        <Link to={href}>{label}</Link>
                    </div>
                </div>
                
                <div className={cls.centerSection}>
                    <p className={cls.logo} onClick={clhd}>WhereIsMy </p>
                </div>
                
                <div className={cls.rightSection}>
                    <div className={cls.themeToggle}>
                        <span className={cls.toggleText}>
                            {isDarkMode ? 'Dark' : 'Light'} Mode
                        </span>
                        <label className={cls.switch}>
                            <input 
                                type="checkbox" 
                                checked={!isDarkMode} 
                                onChange={toggleTheme}
                            />
                            <span className={cls.slider}></span>
                        </label>
                    </div>
                </div>
            </div>
        </header>
    );
}
Header.propTypes = {
    href: PropTypes.string,
    label: PropTypes.string
};
Header.defaultProps = {
    href: '#',
    label: ''
};

export default Header;
