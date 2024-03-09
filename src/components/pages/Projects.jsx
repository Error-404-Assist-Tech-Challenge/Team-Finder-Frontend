/* eslint-disable no-unused-vars */

import '@mantine/dates/styles.css';
import React, { useContext, useEffect, useState } from 'react';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import ProjectCard from '../projectComponents/ProjectCard';
import { Button, Modal, Title, TextInput, Textarea, Select, MultiSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function ProjectsPage() {

    const axiosPrivate = useAxiosPrivate();
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [opened, { open, close }] = useDisclosure(false);
    const [skills, setSkills] = useState([])
    const [roles, setRoles] = useState([])

    useEffect(() => {

    }, [darkMode]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchSkills = async () => {
            try {
                const response = await axiosPrivate.get('organizations/skills/unused/all', {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
                console.log('Skills:', response.data);
                isMounted && setSkills(response.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        }
        fetchSkills();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchRoles = async () => {
            try {
                const response = await axiosPrivate.get('organizations/team_roles/all', {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
                console.log('Roles:', response.data);
                isMounted && setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }
        fetchRoles();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const projects = [
        {
            "name": "E-commerce Platform Dev",
            "period": "Fixed",
            "start_date": "2024-02-01",
            "deadline_date": "2024-08-01",
            "status": "Starting",
            "description": "Building an e-commerce platform for online retail.",
            "tech_stack": ["PHP", "MySQL", "Laravel", "Vue.js"],
            "roles": [
                { "role": "Backend Developer", "members": 3 },
                { "role": "Frontend Developer", "members": 2 },
                { "role": "UI/UX Designer", "members": 1 },
                { "role": "Project Manager", "members": 1 }
            ]
        },
        {
            "name": "Mobile App Dev",
            "period": "Ongoing",
            "start_date": "2023-11-15",
            "status": "In Progress",
            "description": "Creating a mobile app for both iOS and Android platforms.",
            "tech_stack": ["Swift", "Kotlin", "Firebase"],
            "roles": [
                { "role": "iOS Developer", "members": 2 },
                { "role": "Android Developer", "members": 2 },
                { "role": "Backend Developer", "members": 1 },
                { "role": "UI/UX Designer", "members": 1 },
                { "role": "QA Engineer", "members": 1 }
            ]
        },
        {
            "name": "Data Analysis Dashboard",
            "period": "Fixed",
            "start_date": "2023-09-01",
            "deadline_date": "2023-12-15",
            "status": "Closing",
            "description": "Developing a dashboard for analyzing and visualizing data.",
            "tech_stack": ["Python", "Pandas", "Matplotlib", "React"],
            "roles": [
                { "role": "Data Scientist", "members": 2 },
                { "role": "Frontend Developer", "members": 1 },
                { "role": "Backend Developer", "members": 1 },
                { "role": "Project Manager", "members": 1 }
            ]
        },
        {
            "name": "Cloud Migration",
            "period": "Fixed",
            "start_date": "2024-01-10",
            "deadline_date": "2024-05-01",
            "status": "In Progress",
            "description": "Migrating on-premises infrastructure to cloud services.",
            "tech_stack": ["AWS", "Azure", "Docker", "Kubernetes"],
            "roles": [
                { "role": "Cloud Architect", "members": 2 },
                { "role": "DevOps Engineer", "members": 2 },
                { "role": "Project Manager", "members": 1 }
            ]
        },
        {
            "name": "Marketing Automation",
            "period": "Ongoing",
            "start_date": "2024-02-15",
            "status": "Not Started",
            "description": "Automating marketing campaign processes to improve efficiency.",
            "tech_stack": ["Python", "Django", "PostgreSQL"],
            "roles": [
                { "role": "Backend Developer", "members": 2 },
                { "role": "UI/UX Designer", "members": 1 },
                { "role": "Project Manager", "members": 1 }
            ]
        }
    ];

    const handleAddProject = async () => {

        const startDate =
            projectPeriod == 'Fixed'
                ? projectDates[0]
                : projectStartDate
        const deadlineDate =
            projectPeriod == 'Fixed'
                ? projectDates[1]
                : ''
        try {
            const response = await axiosPrivate.post('skills/categories',
                JSON.stringify({
                    name: projectName,
                    period: projectPeriod,
                    start_date: startDate,
                    deadline_date: deadlineDate,
                    status: projectStatus,
                    description: projectDescription,
                    tech_stack: projectTech,
                    // team_roles: 
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            console.log('Response:', response.data);

            // setSkillCategories(response.data);

        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }
    }

    const [projectName, setProjectName] = useState('')
    const [projectPeriod, setProjectPeriod] = useState('')
    const [projectStartDate, setProjectStartDate] = useState(null);
    const [projectDates, setProjectDates] = useState([null, null]);
    const [projectStatus, setProjectStatus] = useState([null, null]);
    const [projectDescription, setProjectDescription] = useState('')
    const [projectTech, setProjectTech] = useState([])
    const [projectRoles, setProjectRoles] = useState([])


    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                <Modal opened={opened} onClose={close} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={250}>
                    <div className="flex justify-center">
                        <Title className="pb-[20px]">Create Project</Title>
                    </div>
                    <TextInput
                        label="Project Name"
                        placeholder="Project name..."
                        size="md"
                        value={projectName}
                        onChange={(event) => setProjectName(event.currentTarget.value)}
                        className=" py-[5px]"
                    />
                    <Select
                        label="Project Period"
                        allowDeselect={false}
                        placeholder="Select a period..."
                        data={['Fixed', 'Ongoing']}
                        value={projectPeriod}
                        onChange={setProjectPeriod}
                        size="sm"
                        className="py-[5px]"
                    />
                    {projectPeriod != 'Fixed' && (
                        <DatePickerInput
                            label="Pick a Start Date"
                            placeholder="Pick a start date"
                            value={projectStartDate}
                            onChange={setProjectStartDate}
                            className=" py-[5px]"
                        />
                    )}
                    {projectPeriod == 'Fixed' && (
                        <DatePickerInput
                            label="Pick a Start and Deadline Date"
                            placeholder="Pick a start and deadline date"
                            type="range"
                            value={projectDates}
                            onChange={setProjectDates}
                            className=" py-[5px]"
                        />
                    )}
                    <Select
                        label="Project Status"
                        allowDeselect={false}
                        placeholder="Select a status..."
                        data={['Not Started', 'Starting']}
                        value={projectStatus}
                        onChange={setProjectStatus}
                        size="sm"
                        className="py-[5px]"
                    />
                    <Textarea
                        label="Project Description"
                        placeholder="Project description..."
                        value={projectDescription}
                        onChange={(event) => setProjectDescription(event.currentTarget.value)}
                        className=" py-[5px]"
                    />
                    <MultiSelect
                        label="Technology Stack"
                        placeholder="Technology..."
                        data={skills}
                        value={projectTech}
                        onChange={setProjectTech}
                        searchable
                        clearable
                        size="sm"
                        nothingFoundMessage="Technology does not exist..."
                        className="py-[5px]"
                    />


                    {projectName && projectPeriod && projectStartDate && (projectPeriod != 'Fixed' || projectDates[1]) && projectStatus && projectDescription && projectTech && projectRoles && (
                        <div className="flex justify-center">
                            <Button
                                size="lg" onClick={handleAddProject}
                                className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mb-[10px] mt-[20px]">
                                Create Project
                            </Button>
                        </div>
                    )}
                </Modal >
                <div className="flex flex-wrap justify-center">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                    <div className="w-[350px] h-[280px] mx-[40px] my-[40px] flex justify-center items-center">
                        <Button variant="outline" onClick={open}
                            className={`relative w-[80px] h-[80px] m-[6px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div >
        </div >
    )
}