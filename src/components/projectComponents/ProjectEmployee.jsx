/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Button, Text, Loader, Badge, NumberInput, Divider, Select, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function ProjectEmployee({ employee }) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    return (
        <>
            <Modal opened={opened} onClose={close} centered overflow="inside" size="500" className="bg-graybg text-white select-none" zIndex={1000002}>
                <div className="flex items-center">
                    <Avatar className="m-3 w-[75px] h-[75px] bg-[#E9E5E6] bigavatar">{getInitials(employee.name)}</Avatar>
                    <div className="flex flex-col">
                        <div className="text-3xl font-bold">{employee.name}</div>
                    </div>
                </div>

                <p className="p-4 text-xl font-bold">Currently working {employee.work_hours} / 8 hours</p>
                <p className="p-4 text-xl font-bold">{employee.name}'s Skills:</p>
                {employee.skills.map((skill, index) => (
                    <Badge key={index} className="m-2" color="gray" size="xl" variant="filled">{skill.name}</Badge>
                ))}
                <Divider className="my-5" />

                <Select label="Role"
                    placeholder="Technology..."
                    // data={skills}
                    // value={projectTech}
                    // onChange={setProjectTech}
                    size="sm"
                    nothingFoundMessage="Technology does not exist..."
                    className="py-[5px]"
                />

                <div className="flex items-center py-[5px]">
                    <div className="w-[55px]">
                        <NumberInput
                            label="Hours"
                            placeholder="h"
                            min={0}
                            max={8 - employee.work_hours}
                            className="w-10px"
                        />
                    </div>
                    <p className="mt-[22px] ml-3 text-lg font-bold"> out of {8 - employee.work_hours} available hours</p>
                </div>

                <Textarea
                    label="Comments"
                    placeholder={`Additional information for ${employee.dept_name} department manager...`}
                    className="py-[5px]"
                />

                <div className="flex justify-center">
                    <Button className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded float-right" >
                        Propose Employee
                    </Button>
                </div>
            </Modal>

            <Button className="flex bg-[#878e96] h-[90px] w-[220px] px-0 mx-[10px] my-[10px] rounded-xl text-white select-none font-bold"
                onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="flex items-center justify-center h-full">
                    {!isHovering &&
                        <>
                            <Avatar className="w-[60px] h-[60px] m-3 bg-[#E9E5E6]">{getInitials(employee.name)}</Avatar>
                            <div className="text-xl font-bold text-left">
                                {employee.name.split(' ').slice(0, 2).map((word, index) => (
                                    <div key={index}>{word}</div>
                                ))}
                            </div>
                        </>}
                </div>
                <div className="flex items-center justify-center h-full w-[220px]">
                    {isHovering && <Text className="text-lg font-bold text-center">Click to see more</Text>}
                </div>

                
            </Button >
        </>
    )
}