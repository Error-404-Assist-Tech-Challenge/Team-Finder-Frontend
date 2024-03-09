/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from 'react';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import ProjectCard from '../projectComponents/ProjectCard';
import { Button, Modal, Title, TextInput, Textarea, Select } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';

export default function ProjectsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {

    }, [darkMode]);

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

    const [projectName, setProjectName] = useState('')
    const [projectPeriod, setProjectPeriod] = useState('')
    const [projectStartDate, setProjectStartDate] = useState(null);
    const [projectDescription, setProjectDescription] = useState('')


    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                <Modal opened={opened} onClose={close} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
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
                        comboboxProps={{ zIndex: 1000000000 }}
                        className="py-[5px]" />

                    <DateInput
                        value={projectStartDate}
                        onChange={setProjectStartDate}
                        label="Start Date"
                        placeholder="Start date..."
                    />

                    <Textarea
                        label="Project Description"
                        placeholder="Project description..."
                        value={projectDescription}
                        onChange={(event) => setProjectDescription(event.currentTarget.value)}
                        className=" py-[15px]"
                    />

                    <Select
                        label="Skill Category"
                        allowDeselect={false}
                        placeholder="Select a category"
                        // data={skillCategories}
                        // value={skillCategory}
                        // onChange={setSkillCategory}
                        searchable
                        size="md"
                        nothingFoundMessage="Category does not exist..."
                        comboboxProps={{ zIndex: 1000000000 }}
                        className="py-[15px]" />
                    {/* {skillName && skillDescription && skillCategory && ( */}
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mb-[10px] mt-[20px]">
                            Create Skill
                        </Button>
                    </div>
                    {/* )} */}
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
            </div>
        </div>
    )
}