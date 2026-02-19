import { useState } from 'react';
import Headers from '../Ui/Header';
import Main from '../Ui/Main.jsx';
import { HomeContext } from '../ThemeContext';

function Home()
{
    const [ isShowProject, setIsShowProject ] = useState( true );

    return (
        <HomeContext.Provider
            value={ { isShowProject, setIsShowProject } }>
            <Headers />

            <Main />
        </HomeContext.Provider>
    );
}

export default Home;
