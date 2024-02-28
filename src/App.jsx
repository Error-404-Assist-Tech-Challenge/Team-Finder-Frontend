import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import React, { useState } from 'react';

export const  Context = React.createContext();

export default function App() {

    const [darkMode, setDarkMode] = useState(true);

    return (
        <Context.Provider value={[darkMode, setDarkMode]}>
            <MantineProvider theme={theme}>
                <Router />
            </MantineProvider>
        </Context.Provider>
    )
}