/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import { Card, Title } from '@mantine/core';

export default function DepartmentProjectsComp({projects, setProjects}) {

    const [darkMode, setDarkMode] = useContext(Context);
    const [visible, setVisible] = useState(true)
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                <div className="flex flex-wrap justify-center">
                    {projects.map((project, index) => (
                            <Card className="flex w-[350px] h-[300px] dark:bg-card_modal mx-[40px] my-[40px] rounded-xl dark:text-darktext text-text select-none"
                            onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                            <Card.Section className="dark:bg-[#495256]">
                                <Title className="py-6 px-2 flex justify-center text-center text-[28px]">
                                    {project.project_name}
                                </Title>
                            </Card.Section>
                            <div className="h-[250px]">
                                {!isHovering && (
                                    <div className="text-[18px] pt-4 pl-4">
                                        <p className="py-1"><span className="font-bold">Period</span>: </p>
                                        <p className="py-1"><span className="font-bold">Start Date</span>: {}</p>
                                        {project.deadline_date && (
                                            < p className="py-1"><span className="font-bold">Deadline Date</span>: {}</p>
                                        )}
                                        <p className="pt-1"><span className="font-bold">Status</span>: {}</p>
                                    </div>
                                )}
                                {isHovering && (
                                    <div className="flex h-full w-full justify-center text-center items-center">
                                        <p className="text-xl text-center">Click to see more!</p>
                                    </div>
                                )}
                            </div>
                        </Card >
                    ))}
                </div>
            </div>
        </div>
    )
}