/* eslint-disable no-unused-vars */
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Notifications } from '@mantine/notifications';

import Layout from './components/authentification/Layout';
import SignUpAdminPage from "./components/authentification/SignUpAdmin";
import LoginPage from "./components/authentification/Login";
import MySkillsPage from "./components/employee/MySkills";
import ProjectsPage from "./components/employee/Projects";
import OrganizationSkillsPage from "./components/department_manager/OrganizationSkills";
import OrganizationEmployeesPage from './components/admin/OrganizationEmployees';
import OrganizationDepartmentsPage from './components/admin/OrganizationDepartments';
import MyDepartment from './components/department_manager/MyDepartment';
import MyProjects from './components/project_manager/MyProjects'
import MainPage from './components/default_pages/MainPage'
import requireAuth from './components/authentification/RequireAuth'
import RequireAuth from './components/authentification/RequireAuth';
import Welcome from './components/default_pages/Welcome';
import Missing from './components/default_pages/Missing'
import Unauthorized from './components/default_pages/Unauthorized'

export const Context = React.createContext();

export default function App() {

    const [darkMode, setDarkMode] = useState(true);

    return (
        <Context.Provider value={[darkMode, setDarkMode]}>
            <MantineProvider theme={theme}>
            <Notifications />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Welcome />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignUpAdminPage />} />
                        <Route path="unauthorized" element={<Unauthorized />} />
                        <Route element={<RequireAuth />}>
                            <Route path='/myskills' element={<MainPage Content={MySkillsPage} />} />
                            <Route path='/projects' element={<MainPage Content={ProjectsPage} />} />
                            <Route path='/organizationemployees' element={<MainPage Content={OrganizationEmployeesPage} />} />
                            <Route path='/organizationdepartments' element={<MainPage Content={OrganizationDepartmentsPage} />} />
                            <Route path='/organizationskills' element={<MainPage Content={OrganizationSkillsPage} />} />
                            <Route path='/mydepartment' element={<MainPage Content={MyDepartment} />} />
                            <Route path='/myprojects' element={<MainPage Content={MyProjects} />} />
                        </Route>
                        <Route path="*" element={<Missing />} />
                    </Route>
                </Routes>
            </MantineProvider>
        </Context.Provider>
    )
}