/* eslint-disable no-unused-vars */
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import SignUpAdminPage from "./pages/SignUpAdmin";
import LoginPage from "./pages/Login";
import MySkillsPage from "./pages/MySkills";
import ProjectsPage from "./pages/Projects";
import OrganizationSkillsPage from "./pages/OrganizationSkills";
import OrganizationEmployeesPage from './pages/OrganizationEmployees';
import OrganizationDepartmentsPage from './pages/OrganizationDepartments';
import MyDepartment from './pages/MyDepartment';
import MyProjects from './pages/MyProjects'
import MainPage from './pages/MainPage'
import requireAuth from './pages/components/requireAuth'
import RequireAuth from './pages/components/requireAuth';

export const Context = React.createContext();

export default function App() {

    const [darkMode, setDarkMode] = useState(true);

    return (
        <Context.Provider value={[darkMode, setDarkMode]}>
            <MantineProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignUpAdminPage />} />

                        <Route element={<RequireAuth />}>
                            <Route path='/myskills' element={<MainPage Content={MySkillsPage} />} />
                            <Route path='/projects' element={<MainPage Content={ProjectsPage} />} />
                            <Route path='/organizationemployees' element={<MainPage Content={OrganizationEmployeesPage} />} />
                            <Route path='/organizationdepartments' element={<MainPage Content={OrganizationDepartmentsPage} />} />
                            <Route path='/organizationskills' element={<MainPage Content={OrganizationSkillsPage} />} />
                            <Route path='/mydepartment' element={<MainPage Content={MyDepartment} />} />
                            <Route path='/myprojects' element={<MainPage Content={MyProjects} />} />
                        </Route>
                    </Route>
                </Routes>
            </MantineProvider>
        </Context.Provider>
    )
}