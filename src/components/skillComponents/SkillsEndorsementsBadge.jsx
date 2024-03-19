/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Card, Badge, Modal, Button, Text, Title, TextInput, Textarea, Divider, HoverCard, Select } from '@mantine/core';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function SkillEndorsementBadge({index, endorsement, setEndorsement, editEndorsement, setEditEndorsement, indexToDelete, setIndexToDelete, setIndexToEdit, handleDeleteEndorsement, indexToEdit,
                                                training, setTraining, trainingDescription, setTrainingDescription, setCourse, setCourseDescription}) {

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();

    const handleEditEndorsment = async () => {
        {endorsement.type === 'Training' && (
            setTraining(endorsement.endorsement),
            setTrainingDescription(endorsement.description)
        )}
        {endorsement.type === 'Course' && (
            setCourse(endorsement.endorsement),
            setCourseDescription(endorsement.description)
        )}
        setEditEndorsement(true)
        setIndexToEdit(index)
        setEndorsement(endorsement.type)
    }
    useEffect(() => {
        if (indexToEdit !== null && indexToEdit === index){
        }
    }, [indexToEdit]);
    
    const handleRemove = async () => {
        setIndexToDelete(index);
    };

    useEffect(() => {
        if (indexToDelete !== null && indexToDelete === index){
            handleDeleteEndorsement();
        }
    }, [indexToDelete]);

    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className="flex flex-wrap"> 
                    <HoverCard width={280} shadow="md" zIndex={100000000}>
                        <HoverCard.Target>
                            <Badge color="gray" size="xl" variant="filled" radius="lg" className='text-white my-[20px] mx-[10px]'>
                                {endorsement.type != 'Project' && (
                                    <Button variant="outline" className={`w-[40px] h-[20px] mb-[3px] mr-[10px] rounded-full p-0 text-accent border-accent border-2`} onClick={handleEditEndorsment}>
                                        Edit
                                    </Button>
                                )}
                                {endorsement.type === 'Project' && (
                                    <>
                                        {endorsement.type}:{endorsement.project_name}
                                    </>
                                )}
                                {endorsement.type != 'Project' && (
                                    <>
                                        {endorsement.type}:{endorsement.endorsement}
                                    </>
                                )}
                                <Button variant="outline" className={`w-[20px] h-[20px] mb-[3px] ml-[10px] rounded-full p-0 text-accent border-accent border-2`} onClick={handleRemove}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus w-[12px] h-[12px]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                </Button>
                            </Badge>
                        </HoverCard.Target>
                        {endorsement.type != 'Project' && (
                            <HoverCard.Dropdown>
                                <Text size="sm">
                                    {endorsement.description}
                                </Text>
                            </HoverCard.Dropdown>
                        )}
                    </HoverCard>
                </div>
                
            </div>
        </>
    )
}
