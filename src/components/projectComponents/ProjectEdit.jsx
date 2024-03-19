/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DatePickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import RoleSelect from './RoleSelect';
import { Button, Title, TextInput, Textarea, Select, TagsInput } from '@mantine/core';
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { SkillSelect } from './SkillSelect';

export default function ProjectEdit({ project, setProjects, roles, teamRoles, setTeamRoles, closeEdit, setSkills, skills }) {
    const [projectName, setProjectName] = useState(project.name)
    const [projectPeriod, setProjectPeriod] = useState(project.period)
    const startDate = new Date(project.start_date);
    const deadlineDate = new Date(project.deadline_date);
    const [projectStartDate, setProjectStartDate] = useState(startDate);
    const [projectDates, setProjectDates] = useState([startDate, deadlineDate]);
    const [projectStatus, setProjectStatus] = useState(project.status);
    const [projectDescription, setProjectDescription] = useState(project.description)
    const [projectTech, setProjectTech] = useState(project.tech_stack)

    const mappedTeamRoles = project.team_role.map(role => ({
        role_id: role.role_id,
        count: role.count
    }));
    const [projectRoles, setProjectRoles] = useState(mappedTeamRoles)

    const mappedRequiredSkills = project.required_skills.map(skill => ({
        id: skill.skill_id,
        name: skill.name,
        minimum_level: skill.minimum_level
    }));
    const [chosenSkills, setChosenSkills] = useState(mappedRequiredSkills);
    const [value, setValue] = useState([]); // FOR SKILL SELECT


    const axiosPrivate = useAxiosPrivate();

    const handleUpdateProject = async () => {

        const startDate =
            projectPeriod == 'Fixed'
                ? projectDates[0]
                : projectStartDate
        const deadlineDate =
            projectPeriod == 'Fixed'
                ? projectDates[1]
                : null

        const projectRequirements = chosenSkills.map(modifiedSkill => {
            const originalSkill = project.required_skills.find(skill => skill.skill_id === modifiedSkill.id);
            if (originalSkill) {
                return { ...modifiedSkill, skill_id: modifiedSkill.id, required: true };
            } else {
                return { ...modifiedSkill, skill_id: modifiedSkill.id, required: true };
            }
        }).concat(project.required_skills.filter(originalSkill => {
            return !chosenSkills.some(modifiedSkill => modifiedSkill.id === originalSkill.skill_id);
        }).map(skill => ({ ...skill, skill_id: skill.skill_id, required: false })));

        try {
            const response = await axiosPrivate.put('/project',
                JSON.stringify({
                    proj_id: project.id,
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
        closeEdit();
    }

    return (
        <>
            <div className="flex justify-center">
                <Title className="pb-[20px]">{project.name}</Title>
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
                data={['Not Started', 'Starting', 'In Progress', 'Closing', 'Closed']}
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
                    <Button onClick={handleUpdateProject}
                        size="lg"
                        className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mb-[10px] mt-[20px]">
                        Update Project
                    </Button>
                </div>
            )}

        </>
    )

}