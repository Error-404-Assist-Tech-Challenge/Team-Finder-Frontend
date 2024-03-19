/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Button, Text, Loader, Badge, NumberInput, Divider, MultiSelect, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';



export default function ActiveMemberCard({ project_id, employee, setActiveMembers }) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };
    const [comment, setComment] = useState(employee.deallocate_proposal ? employee.deallocate_comment : '');

    const handleProposeDeallocation = async () => {
        try {
            const response = await axiosPrivate.post('projects/deallocation_proposal',
                JSON.stringify({
                    assignment_id: employee.assignment_id,
                    user_id: employee.user_id,
                    proj_id: project_id,
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
            setActiveMembers(response.data.active);
            setComment('')
        } catch (error) {
            console.error('Error creating proposal:', error);
        }
        close();
    }

    const updateProposeDeallocation = async () => {
        try {
            const response = await axiosPrivate.put('projects/deallocation_proposal',
                JSON.stringify({
                    assignment_id: employee.assignment_id,
                    // user_id: employee.user_id,
                    proj_id: project_id,
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
            setActiveMembers(response.data.active)
        } catch (error) {
            console.error('Error updating proposal:', error);
        }
        close();
    }

    const deleteProposeDeallocation = async () => {
        try {
            const response = await axiosPrivate.delete('projects/deallocation_proposal', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    assignment_id: employee.assignment_id,
                    proj_id: project_id
                },
                withCredentials: true
            });
            // console.log('Response:', response.data);
            setActiveMembers(response.data.active);
            setComment('');
        } catch (error) {
            console.error('Error deleting deallocation proposal proposal:', error);
        }
        close();
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

                <p className="px-4 pt-4 text-xl font-bold">Currently working {employee.work_hours} / 8 hours</p>
                <p className="px-4 pb-4 text-xl font-bold">Out of which { } are on this project</p>
                <p className="p-4 text-xl font-bold">{employee.name}'s Skills:</p>
                {employee.skills.map((skill, index) => (
                    <Badge key={index} className="m-2" color="gray" size="xl" variant="filled">{skill.name}</Badge>
                ))}
                <p className="p-4 text-xl font-bold">Team Roles: </p>
                {employee.roles.map((role) => (
                    <Badge key={role.id} className="mx-3 my-1" color="gray" size="xl">
                        {role.name}
                    </Badge>
                ))}
                <Divider className="my-5" />

                <Textarea
                    label="Comments for deallocation"
                    placeholder={`Additional information for department manager...`}
                    className="py-[5px]"
                    value={comment}
                    onChange={(event) => setComment(event.currentTarget.value)}
                />

                {!employee.deallocate_proposal &&
                    <div className="flex justify-center">
                        {comment != '' &&
                            <>
                                <Button className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded" onClick={handleProposeDeallocation}>
                                    Propose Deallocation
                                </Button>
                            </>
                        }
                    </div>
                }
                {
                    employee.deallocate_proposal &&
                    <div className="flex justify-around">
                        {comment != '' &&
                            <>
                                <Button className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded" onClick={updateProposeDeallocation}>
                                    Update proposal
                                </Button>
                                <Button className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded" onClick={deleteProposeDeallocation}>
                                    Revoke proposal
                                </Button>
                            </>
                        }
                    </div>
                }
            </Modal >

            <Button className="flex bg-[#878e96] h-[150px] w-[220px] px-0 mx-[10px] my-[10px] rounded-xl text-white select-none font-bold"
                onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="flex flex-wrap h-full">
                    {!isHovering &&
                        <>
                            <div className="flex items-center justify-center">
                                <Avatar className="w-[60px] h-[60px] m-3 bg-[#E9E5E6]">{getInitials(employee.name)}</Avatar>
                                <div className="text-xl font-bold text-left">
                                    {employee.name.split(' ').slice(0, 2).map((word, index) => (
                                        <div key={index}>{word}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center flex-wrap">
                                {employee.roles.slice(0, 2).map((role, index) => (
                                    <Badge key={role.id} className="mx-3 my-1 text-[#868e96] bg-[#E9E5E6]" size="sm">
                                        {role.name}
                                    </Badge>
                                ))}
                                {employee.roles.length > 2 && (
                                    <span className="mx-3 my-1">Click to see more...</span>
                                )}
                            </div>
                        </
                        >}
                </div>
                <div className="flex items-center justify-center h-full w-[220px]">
                    {isHovering && <Text className="text-lg font-bold text-center">Click to see more</Text>}
                </div>


            </Button >
        </>
    )
}