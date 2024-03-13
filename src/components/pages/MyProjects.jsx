/* eslint-disable no-unused-vars */
import { Pagination, Text } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react';
import { useHeadroom } from '@mantine/hooks';
import { randomId } from '@mantine/hooks';
import { Context } from '../../App';
import ProjectEmployeeCard from '../projectComponents/EmployeeProject';
import { Tabs, rem } from '@mantine/core';


export default function MyProjects() {

    const [darkMode, setDarkMode] = useContext(Context);


    useEffect(() => {

    }, [darkMode]); 

    return (
        <>
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
                    <div className=' dark:bg-darkcanvas bg-canvas mt-[40px]'>
                      <ProjectEmployeeCard />
                    </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="PastMembers">
                    <div className=' dark:bg-darkcanvas bg-canvas mt-[40px]'>
                      <ProjectEmployeeCard />
                    </div>
                    </Tabs.Panel>
                </Tabs>
              </div>
            </div >
          </div >
        </>
    )
}