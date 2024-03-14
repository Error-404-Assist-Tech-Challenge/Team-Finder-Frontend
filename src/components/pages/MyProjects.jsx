/* eslint-disable no-unused-vars */
import { Pagination, Text } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHeadroom } from '@mantine/hooks';
import { randomId } from '@mantine/hooks';
import { Context } from '../../App';
import ProjectEmployeeCard from '../projectComponents/EmployeeProject';
import { Tabs, rem } from '@mantine/core';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


export default function MyProjects() {

    const axiosPrivate = useAxiosPrivate();
    const [darkMode, setDarkMode] = useContext(Context);
    const [userProjects, setUserProjects] = useState({});
    const [visible, setVisible] = useState(true);

    useEffect(() => {

    }, [darkMode]);

    // GET user projects
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUserProjects = async () => {
            try {
                const response = await axiosPrivate.get('projects/user', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Users projects:', response.data);
                isMounted && setUserProjects(response.data)
                setVisible(false)
            } catch (error) {
                console.error('Error fetching department members:', error);
            }
        }

        getUserProjects();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    return (
        <>
            {!visible && (
                <div className={`${darkMode && 'dark'}`}>
                    <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                        <div className='text-white'>
                            <Tabs defaultValue="ActiveMembers" color="#FF3D2E">
                                <Tabs.List grow>
                                    <Tabs.Tab value="ActiveMembers" className="  text-xl px-[40px]" >
                                        Project projects
                                    </Tabs.Tab>
                                    <Tabs.Tab value="PastMembers" className=" text-xl px-[40px]">
                                        Past projects
                                    </Tabs.Tab>
                                </Tabs.List>


                                <Tabs.Panel value="ActiveMembers">
                                    <div className=' dark:bg-darkcanvas bg-canvas mt-[40px] flex flex-wrap'>
                                        {userProjects.active.map((userProject, index) => (
                                            <>
                                                <ProjectEmployeeCard key={index} name={userProject.project_name} roles={userProject.role_names} />
                                            </>
                                        ))}
                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="PastMembers">
                                    <p>{userProjects.active.length}</p>
                                    <div className=' dark:bg-darkcanvas bg-canvas mt-[40px]'>
                                        <ProjectEmployeeCard />
                                    </div>
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    </div >
                </div >
            )}
        </>
    )
}