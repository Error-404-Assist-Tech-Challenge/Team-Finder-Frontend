/* eslint-disable no-unused-vars */

import { theme } from './theme';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';

import Layout from './components/layout/Layout';
import SignUpAdminPage from "./components/auth/SignUpAdmin";
import LoginPage from "./components/auth/Login";
import MySkillsPage from "./components/pages/MySkills";
import ProjectsPage from "./components/pages/Projects";
import OrganizationSkillsPage from "./components/pages/OrganizationSkills";
import OrganizationEmployeesPage from './components/pages/OrganizationEmployees';
import OrganizationDepartmentsPage from './components/pages/OrganizationDepartments';
import MyDepartment from './components/pages/MyDepartment';
import MyProjects from './components/pages/MyProjects'
import MainPage from './components/pages/MainPage'
import RequireAuth from './components/auth/RequireAuth';
import Welcome from './components/pages/Welcome';
import Missing from './components/pages/Missing'
import Unauthorized from './components/pages/Unauthorized'
import PersistLogin from './components/auth/PersistLogin';
import SignUpEmployeePage from './components/auth/SignUpEmployee';
import Invalid from './components/pages/Invalid';

export const Context = React.createContext();

export default function App() {

    const [darkMode, setDarkMode] = useState(true);

    return (
        <Context.Provider value={[darkMode, setDarkMode]}>
            <MantineProvider theme={theme}>
                <Notifications />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* ANYONE CAN SEE THESE PAGES */}
                        <Route path="/" element={<Welcome />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignUpAdminPage />} />
                        <Route path="signup/:ref_id" element={<SignUpEmployeePage />} />
                        <Route path="unauthorized" element={<Unauthorized />} />
                        <Route path="invalid" element={<Invalid />} />

                        <Route element={<PersistLogin />}>
                            <Route element={<RequireAuth />}>
                                {/* YOU HAVE TO BE LOGGED IN TO SEE THESE PAGES */}
                                <Route path='/myskills' element={<MainPage Content={MySkillsPage} />} />
                                <Route path='/projects' element={<MainPage Content={ProjectsPage} />} />
                                <Route path='/organizationemployees' element={<MainPage Content={OrganizationEmployeesPage} />} />
                                <Route path='/organizationdepartments' element={<MainPage Content={OrganizationDepartmentsPage} />} />
                                <Route path='/organizationskills' element={<MainPage Content={OrganizationSkillsPage} />} />
                                <Route path='/mydepartment' element={<MainPage Content={MyDepartment} />} />
                                <Route path='/myprojects' element={<MainPage Content={MyProjects} />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<Missing />} />
                    </Route>
                </Routes>
            </MantineProvider>
        </Context.Provider>
    )
}