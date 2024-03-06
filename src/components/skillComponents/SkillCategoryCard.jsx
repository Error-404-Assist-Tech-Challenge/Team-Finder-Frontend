/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Text, Title, TextInput, Modal, Button } from '@mantine/core';
import { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


export const SkillCategoryCard = ({ name, id, setSkillCategories }) => {
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

        close();
    }

    const deleteCategory = async () => {
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
        close();
    }

    return (
        <>
            <Modal opened={opened} onClose={close} centered overflow="inside" size="sm" className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                <div className="flex justify-center">
                    {!isEditing && (<h1 className="text-4xl font-bold mb-[30px]">{name}</h1>)}
                    {isEditing && (
                        <>
                            <TextInput
                                placeholder="Category name"
                                value={categoryName}
                                onChange={(event) => setCategoryName(event.currentTarget.value)}
                                size="lg" />
                        </>)
                    }
                </div>
                <div className="p-[10px]">
                    {!isEditing && (<Button
                        className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded float-left" onClick={handleEdit}>
                        Edit skill
                    </Button>)}
                    {isEditing && (<Button
                        className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded  float-left" onClick={handleSave}>
                        Save
                    </Button>)}
                    <Button className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded float-right" onClick={deleteCategory}>
                        Remove Department
                    </Button>
                </div>
            </Modal>
            <Card variant="filled" onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className="flex flex-wrap justify-center items-center min-w-[200px] h-[66px] dark:bg-card_modal ml-[30px] mt-[20px] rounded-xl dark:text-darktext text-text select-none font-bold">
                {!isHovering && (<Text className="text-xl">{name}</Text>)}
                {isHovering && <Text className="text-lg">Click to see more!</Text>}
            </Card >
        </>
    )
}
