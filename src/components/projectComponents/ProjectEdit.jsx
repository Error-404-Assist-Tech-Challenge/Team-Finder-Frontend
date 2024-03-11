/* eslint-disable react/prop-types */
import { DatePickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import RoleSelect from './RoleSelect';
import { Button, Title, TextInput, Textarea, Select, MultiSelect } from '@mantine/core';
import { useState } from 'react';

export default function ProjectEdit({ project, roles, teamRoles, setTeamRoles, skills }) {
    const [projectName, setProjectName] = useState(project.name)
    const [projectPeriod, setProjectPeriod] = useState(project.period)
    const [projectStartDate, setProjectStartDate] = useState(null);
    const [projectDates, setProjectDates] = useState([null, null]);
    const [projectStatus, setProjectStatus] = useState([project.status]);
    const [projectDescription, setProjectDescription] = useState(project.description)

    const mappedTechStack = project.tech_stack.map(skill => skill.skill_id);
    const [projectTech, setProjectTech] = useState(mappedTechStack)

    const mappedTeamRoles = project.team_role.map(role => ({
        role_id: role.role_id,
        count: role.count
    }));
    const [projectRoles, setProjectRoles] = useState(mappedTeamRoles)

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
            <RoleSelect
                roles={roles}
                teamRoles={teamRoles}
                setTeamRoles={setTeamRoles}
                projectRoles={projectRoles}
                setProjectRoles={setProjectRoles} />

            {projectName && projectPeriod && (projectStartDate || projectDates[0]) && (projectPeriod == 'Ongoing' || projectDates[1]) && projectStatus && projectDescription && projectTech.length != 0 && projectRoles.length != 0 && (
                <div className="flex justify-center">
                    <Button
                        size="lg"
                        className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mb-[10px] mt-[20px]">
                        Update Project
                    </Button>
                </div>
            )}

        </>
    )

}