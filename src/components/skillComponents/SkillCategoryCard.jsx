/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Text, Title, TextInput, Modal, Button } from '@mantine/core';
import { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


export const SkillCategoryCard = ({ name, id, setSkillCategories, visible, setVisible }) => {

    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [categoryName, setCategoryName] = useState(name)
    const [opened, { open, close }] = useDisclosure(false);
    const axiosPrivate = useAxiosPrivate();


    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        updateCategory();
        setIsEditing(false);
    }

    const updateCategory = async () => {
        close();
        try {
            const response = await axiosPrivate.put('skills/categories',
                JSON.stringify({
                    id: id,
                    name: categoryName
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            console.log('Response:', response.data);

            setSkillCategories(response.data);

        } catch (error) {
            console.error('Error updating department:', error);
        }
        window.location.reload();
    }

    const deleteCategory = async () => {
        close();
        try {
            const response = await axiosPrivate.delete('skills/categories', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    id: id
                },
                withCredentials: true
            });

            console.log('Response:', response.data);

            setSkillCategories(response.data);

        } catch (error) {
            console.error('Error deleting user skills:', error);
        }
        window.location.reload();
    }

    return (
        <>
            <div className="w-full rounded-lg bg-white p-4 my-2 select-none">
                {!isEditing && (
                    <Title className="text-[24px] h-[52px] text-darkcanvas pb-5 text-center">{name}</Title>
                )}
                {isEditing && (
                    <TextInput
                        className="h-[52px]"
                        size="lg"
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.currentTarget.value)}
                    />
                )}
                <div className="flex justify-between">
                    {!isEditing && (
                        <Button className="w-[170px] mr-[5px] bg-accent mt-[10px] text-[18px]" onClick={handleEdit}>Edit</Button>
                    )}
                    {isEditing && (
                        <Button className="w-[170px] mr-[5px] bg-accent mt-[10px] text-[18px]" onClick={handleSave}>Save</Button>
                    )}
                    <Button className="w-[170px] ml-[5px] bg-accent mt-[10px] text-[18px]" onClick={deleteCategory}>Remove</Button>
                </div>
            </div >
        </>
    )
}
