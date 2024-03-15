/* eslint-disable no-unused-vars */

import '@mantine/dates/styles.css';
import React, { useContext, useEffect, useState } from 'react';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import ProjectCard from '../projectComponents/ProjectCard';
import { Loader, Button, Modal, Title, TextInput, Textarea, Select, MultiSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import RoleSelect from '../projectComponents/RoleSelect';
import ProjectsComp from '../pageComponents/ProjectsComp';
import PaginationComp from '../pageComponents/Pagination';

export default function ProjectsPage() {

    const axiosPrivate = useAxiosPrivate();
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [opened, { open, close }] = useDisclosure(false);

    const [skills, setSkills] = useState([])
    const [projects, setProjects] = useState([])

    const [visible, setVisible] = useState(true)

    const [roles, setRoles] = useState([])
    const [teamRoles, setTeamRoles] = useState([]) // FOR SELECT
    const [projectRoles, setProjectRoles] = useState([]) // FOR SELECT

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(5);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = projects.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {

    }, [darkMode]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchProjects = async () => {
            try {
                const response = await axiosPrivate.get('projects', {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
                console.log('Projects:', response.data);
                isMounted && setProjects(response.data);
                setVisible(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }
        fetchProjects();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                {visible && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader size={30} color="red" />
                    </div>
                )}

                {!visible && (
                    <>
                        <div className="flex flex-wrap justify-center">
                            <ProjectsComp projects={currentPosts} setProjects={setProjects} />
                        </div>
                        <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center'>
                            <PaginationComp totalPosts={projects.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} drawer={false} />
                        </div>
                    </>
                )}
            </div >
        </div >
    )
}