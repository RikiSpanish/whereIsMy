import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {routes} from './router';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';

function App() {
    const acDEekrstu = useSelector(state => state.common.acDEekrstu);

    return (
        <ThemeProvider>
            <div className={acDEekrstu}>
                <BrowserRouter>
                    <Routes>
                        {routes.map(route => <Route key={route.path} path={route.path} element={route.element()} />)}
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
