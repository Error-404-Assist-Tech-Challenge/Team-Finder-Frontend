/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import '@mantine/dates/styles.css';
import React, { useContext, useEffect, useState } from 'react';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import ProjectCard from '../projectComponents/ProjectCard';
import { Button, Modal, Title, TextInput, Textarea, Select, TagsInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import RoleSelect from '../projectComponents/RoleSelect';
import { SkillSelect } from '../projectComponents/SkillSelect';

export default function ProjectsComp({ projects, setProjects }) {

    const axiosPrivate = useAxiosPrivate();
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [opened, { open, close }] = useDisclosure(false);
    const [skills, setSkills] = useState([])
    const [chosenSkills, setChosenSkills] = useState([]); // FOR SKILL SELECT
    const [value, setValue] = useState([]); // FOR SKILL SELECT
    const [roles, setRoles] = useState([])
    const [teamRoles, setTeamRoles] = useState([]) // FOR ROLE SELECT
    const [projectRoles, setProjectRoles] = useState([]) // FOR ROLE SELECT

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
                // console.log('Skills:', response.data);
                if (isMounted) {
                    const mappedSkills = response.data.map(skill => ({
                        id: skill.value,
                        name: skill.label.trim(),
                        minimum_level: 1,
                    }));
                    setSkills(mappedSkills);
                    // console.log(mappedSkills);
                }
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
                // console.log('Roles:', response.data);
                if (isMounted) {
                    setRoles(response.data);
                    const mappedRoles = response.data.map(role => ({
                        role_id: role.value,
                        count: 1
                    }));
                    setTeamRoles(mappedRoles);
                }
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

    const handleAddProject = async () => {
        const startDate =
            projectPeriod == 'Fixed'
                ? projectDates[0]
                : projectStartDate
        const deadlineDate =
            projectPeriod == 'Fixed'
                ? projectDates[1]
                : null

        const projectRequirements = chosenSkills.map(skill => ({
            skill_id: skill.id,
            minimum_level: skill.minimum_level
        }));
        try {
            const response = await axiosPrivate.post('/project',
                JSON.stringify({
                    name: projectName,
                    period: projectPeriod,
                    start_date: startDate,
                    deadline_date: deadlineDate,
                    status: projectStatus,
                    description: projectDescription,
                    tech_stack: projectTech,
                    team_roles: projectRoles,
                    required_skills: projectRequirements
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
            // console.log('Response:', response.data);
            setProjects(response.data);
            setProjectName('')
            setProjectPeriod('')
            setProjectStartDate(null);
            setProjectDates([null, null]);
            setProjectStatus([null]);
            setProjectDescription('');
            setProjectTech([]);

            const mappedRoles = roles.map(role => ({
                role_id: role.value,
                count: 1
            }));
            setTeamRoles(mappedRoles);
            setProjectRoles([]);
            setValue([])

            const mappedSkills = skills.map(skill => ({
                id: skill.id,
                name: skill.name,
                minimum_level: 1,
            }));
            setSkills(mappedSkills);
            setChosenSkills([]);

        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }
        close();
    }

    const [projectName, setProjectName] = useState('')
    const [projectPeriod, setProjectPeriod] = useState('')
    const [projectStartDate, setProjectStartDate] = useState(null);
    const [projectDates, setProjectDates] = useState([null, null]);
    const [projectStatus, setProjectStatus] = useState([null]);
    const [projectDescription, setProjectDescription] = useState('')
    const [projectTech, setProjectTech] = useState([])
    const [periodFilter, setPeriodFilter] = useState(null)
    const [statusFilter, setStatusFilter] = useState(null)

    const filteredProjects = projects.filter(project => {
        const isPeriodFiltered = periodFilter == null || periodFilter == project.period;
        const isStatusFiltered = statusFilter == null || statusFilter == project.status;
        return isPeriodFiltered && isStatusFiltered;
    });

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
                            valueFormat="YYYY-MM-DD"
                            label="Pick a Start Date"
                            placeholder="Pick a start date"
                            value={projectStartDate}
                            onChange={setProjectStartDate}
                            className=" py-[5px]"
                        />
                    )}
                    {projectPeriod == 'Fixed' && (
                        <DatePickerInput
                            valueFormat="YYYY-MM-DD"
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
                    <TagsInput
                        label="Technology Stack"
                        placeholder="Technology..."
                        data={[]}
                        value={projectTech}
                        onChange={setProjectTech}
                        clearable
                        size="sm"
                        className="py-[5px]"
                    />
                    <RoleSelect
                        roles={roles}
                        teamRoles={teamRoles}
                        setTeamRoles={setTeamRoles}
                        projectRoles={projectRoles}
                        setProjectRoles={setProjectRoles}
                        value={value}
                        setValue={setValue}
                    />
                    <SkillSelect
                        skills={skills}
                        value={chosenSkills}
                        setValue={setChosenSkills}
                    />

                    {projectName && projectPeriod && (projectStartDate || projectDates[0]) && (projectPeriod == 'Ongoing' || projectDates[1]) && projectStatus && projectDescription && projectTech.length != 0 && projectRoles.length != 0 && (
                        <div className="flex justify-center">
                            <Button
                                size="lg" onClick={handleAddProject}
                                className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mb-[10px] mt-[20px]">
                                Create Project
                            </Button>
                        </div>
                    )}
                </Modal >
                <div className="flex flex-wrap justify-center w-full">
                    <div className="flex w-full justify-around">
                        <Select
                            placeholder="Filter by period..."
                            data={['Fixed', 'Ongoing']}
                            value={periodFilter}
                            onChange={setPeriodFilter}
                            size="sm"
                            className="py-[20px] px-[40px]"
                        />
                        <Select
                            placeholder="Filter by status..."
                            data={['Not Started', 'Starting', 'In Progress', 'Closing', 'Closed']}
                            value={statusFilter}
                            onChange={setStatusFilter}
                            size="sm"
                            className="py-[20px] px-[40px]"
                        />
                    </div>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} setProjects={setProjects} roles={roles} teamRoles={teamRoles} setTeamRoles={setTeamRoles} skills={skills} setSkills={setSkills} />
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