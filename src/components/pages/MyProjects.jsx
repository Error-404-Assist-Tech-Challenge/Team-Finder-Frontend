/* eslint-disable no-unused-vars */
import { Pagination, Text } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHeadroom } from '@mantine/hooks';
import { randomId } from '@mantine/hooks';
import { Context } from '../../App';
import ProjectEmployeeCard from '../projectComponents/EmployeeProject';
import { Tabs, rem, Loader } from '@mantine/core';
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
      <div className={`${darkMode && 'dark'}`}>
        <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
            {visible && (
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Loader size={30} color="red" />
                  </div>
            )}
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
                                                <ProjectEmployeeCard key={index} name={userProject.project_name} roles={userProject.role_names} status={userProject.status} tech_stack={userProject.technology_stack}
                                                                      start={userProject.start_date} deadline={userProject.deadline_date} description={userProject.description} project_id={userProject.proj_id}/>
                                            </>
                                        ))}
                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="PastMembers">
                                  <div className=' dark:bg-darkcanvas bg-canvas mt-[40px] flex flex-wrap'>
                                        {userProjects.past.map((userProject, index) => (
                                            <>
                                                <ProjectEmployeeCard key={index} name={userProject.project_name} roles={userProject.role_names} status={userProject.status} tech_stack={userProject.technology_stack}/>
                                            </>
                                        ))}
                                    </div>
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    </div >
                </div >
            )}
          </div>
        </div>
    )
}