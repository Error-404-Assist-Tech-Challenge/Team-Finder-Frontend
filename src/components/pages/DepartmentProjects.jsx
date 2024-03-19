/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState, useEffect } from 'react';
import DepartmentProjectsComp from '../pageComponents/DepartmentProjects';
import { Loader } from '@mantine/core';
import React, { useContext } from 'react'
import { Context } from '../../App';

export default function DepartmentProjects() {

    const axiosPrivate = useAxiosPrivate();
    const [projects, setProjects] = useState([])
    const [visible, setVisible] = useState(true)
    const [darkMode, setDarkMode] = useContext(Context);

    useEffect(() => {
        setVisible(true);
        let isMounted = true;
        const controller = new AbortController();

        const getDepartmentProjects = async () => {
            try {
                const response = await axiosPrivate.get('department/projects', {
                    signal: controller.signal,
                    withCredentials: true
                });
                // console.log('Department projects:', response.data);
                isMounted && setProjects(response.data)
            } catch (error) {
                console.error('Error fetching department projects:', error);
            }
        }

        getDepartmentProjects();
        setVisible(false);
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                {visible && (
                            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Loader size={30} color="red" />
                            </div>
                        )}

                    {!visible &&
                        <DepartmentProjectsComp projects={projects} setProjects={setProjects} />}
            </div>
        </div>
    )
}