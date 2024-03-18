/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import { Card, Title, Badge, Select } from '@mantine/core';

export default function DepartmentProjectsComp({ projects, setProjects }) {

    const [darkMode, setDarkMode] = useContext(Context);
    const [visible, setVisible] = useState(true)
    const [statusFilter, setStatusFilter] = useState(null)
    const filteredProjects = projects.filter(project => {
        return statusFilter == null || statusFilter == project.status;
    });

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                <div className="flex flex-wrap justify-center">
                    <div className="flex w-full justify-center">
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
                        <Card className="flex w-[350px] h-[300px] dark:bg-card_modal mx-[40px] my-[40px] rounded-xl text-[white] select-none" key={index}>
                            <Card.Section className="dark:bg-[#495256]">
                                <Title className="py-6 px-2 flex justify-center text-center text-[28px]">
                                    {project.project_name}
                                </Title>
                            </Card.Section>
                            <div className="h-[250px]">
                                <div className="text-[18px] pt-4 pl-4">
                                    {project.deadline_date && (
                                        < p className="py-1"><span className="font-bold">Deadline Date</span>: {project.deadline_date.substring(0, 10)}</p>
                                    )}
                                    <p className="pt-1"><span className="font-bold">Status</span>: {project.status}</p>
                                    <p className="pt-1"><span className="font-bold">Members</span>: {project.team_members.map((member, index) => (
                                        <Badge key={index} className="m-1" color="gray" size="lg" variant="filled">{member}</Badge>
                                    ))}</p>
                                </div>
                            </div>
                        </Card >
                    ))}
                </div>
            </div>
        </div>
    )
}