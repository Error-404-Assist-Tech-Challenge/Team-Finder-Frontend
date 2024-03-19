/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Button, Text, Loader, Badge, NumberInput, Divider, MultiSelect, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function NewMemberCard({ setNewMembers, setProposedMembers, project_id, employee }) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    const handleOpen = () => {
        open();
        fetchAvailableRoles();
    }

    const [teamRoles, setTeamRoles] = useState([]);
    const [workHours, setWorkHours] = useState(0);
    const [comment, setComment] = useState('');

    const [availableRoles, setAvailableRoles] = useState([]);

    const handlePropose = async () => {
        try {
            const response = await axiosPrivate.post('projects/assignment_proposal',
                JSON.stringify({
                    user_id: employee.user_id,
                    role_ids: teamRoles,
                    proj_id: project_id,
                    work_hours: workHours,
                    comment: comment
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
            setNewMembers(response.data.new);
            setProposedMembers(response.data.proposed);
            fetchAvailableRoles();
        } catch (error) {
            console.error('Error creating proposal:', error);
        }

        setTeamRoles([]);
        setWorkHours(0);
        setComment('');
        close();
    }

    const fetchAvailableRoles = async () => {
        try {
            const response = await axiosPrivate.get(`projects/project_needed_roles?proj_id=${project_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                withCredentials: true
            });
            // console.log('Available Role', response.data)
            setAvailableRoles(response.data)
        } catch (error) {
            console.error('Error fetching available roles:', error);
        }
    }

    return (
        <>
            <Modal opened={opened} onClose={close} centered overflow="inside" size="500" className="bg-graybg text-white select-none" zIndex={300}>
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

                <MultiSelect
                    label="Role"
                    placeholder="Role..."
                    data={availableRoles}
                    value={teamRoles}
                    onChange={setTeamRoles}
                    size="sm"
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
                            value={workHours}
                            onChange={setWorkHours}
                        />
                    </div>
                    <p className="mt-[22px] ml-3 text-lg font-bold"> out of {8 - employee.work_hours} available hours</p>
                </div>

                <Textarea
                    label="Comments"
                    placeholder={`Additional information for ${employee.dept_name} department manager...`}
                    className="py-[5px]"
                    value={comment}
                    onChange={(event) => setComment(event.currentTarget.value)}
                />

                <div className="flex justify-center">
                    {teamRoles.length != 0 && workHours != 0 && comment.length != 0 &&
                        <Button className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded float-right" onClick={handlePropose} >
                            Propose Employee
                        </Button>
                    }
                </div>
            </Modal>

            <Button className="flex bg-[#878e96] h-[90px] w-[220px] px-0 mx-[10px] my-[10px] rounded-xl text-white select-none font-bold"
                onClick={handleOpen} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
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