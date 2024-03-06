/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Title, TextInput, Textarea } from '@mantine/core';
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const SkillCard = ({ skill }) => {

    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(`${skill.name}`);
    const [description, setDescription] = useState(`${skill.description}`);
    const axiosPrivate = useAxiosPrivate();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        skill.name = name;
        skill.description = description;

        console.log(JSON.stringify({
            skill_id: name,
            dept_id: skill.dept_id,
            category_id: skill.category_id,
            org_id: skill.org_id,
            name: skill.name,
            description: skill.description,
            author_id: skill.author_id,
            created_at: skill.created_at
        }))

        // const updateSkill = async () => {
        //     try {
        //         const response = await axiosPrivate.put('organizations/skills',
        //             JSON.stringify({
        //                 skill_id: name,
        //                 dept_id: skill.dept_id,
        //                 category_id: skill.category_id,
        //                 org_id: skill.org_id,
        //                 name: skill.name,
        //                 description: skill.description,
        //                 author_id: skill.author_id,
        //                 created_at: skill.created_at
        //             }),
        //             {
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Access-Control-Allow-Origin': '*',
        //                     'Access-Control-Allow-Credentials': 'true'
        //                 },
        //                 withCredentials: true
        //             });
        //         console.log('Response:', response.data);
        //     } catch (error) {
        //         console.error('Error fetching unused skills:', error);
        //     }
        // }

        setIsEditing(false);
    };


    return (
        <div>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-.m-1b7284a3.m-b5489c3c text-white rounded-modal select-none" zIndex={1000002}>
                <div className="flex justify-center justify-center h-[50px]">
                    {!isEditing && <h1 className="text-3xl font-bold">{skill.name}</h1>}
                    {isEditing && <TextInput
                        placeholder="Skill name"
                        value={name}
                        onChange={(event) => setName(event.currentTarget.value)}
                        size="lg"
                    />}
                </div>
                <div className="pt-4 flex justify-left">
                    <p className="font-bold">Author</p>
                    <p>: {skill.author_name}</p>
                </div>
                <div className="pt-4 flex justify-left">
                    {!isEditing && (<p className="text-[15px]"><span className="font-bold">Description</span>: {skill.description}</p>)}
                    {isEditing && <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.currentTarget.value)}
                        autosize
                        className="w-full text-[12px]"
                    />}
                </div>
                <div className="pt-4 flex justify-left">
                    <p><span className="font-bold">Category</span>: {skill.category_name}</p>
                </div>
                <div className="pt-4 flex justify-left">
                    <p><span className="font-bold">Departments</span>: {skill.dept_name.join(', ')}</p>
                </div>
                <div className="pt-4 flex justify-left">
                    {!isEditing && (<Button
                        className="bg-accent text-white hover:bg-btn_hover font-bold rounded" onClick={handleEdit}>
                        Edit skill
                    </Button>)}
                    {isEditing && (<Button
                        className="bg-accent text-white hover:bg-btn_hover font-bold rounded" onClick={handleSave}>
                        Save
                    </Button>)}
                </div>
            </Modal>

            <Card variant="filled" onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className="flex w-[240px] h-[184px] dark:bg-card_modal mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none font-bold">
                <Card.Section className="dark:bg-[#495256]">
                    <Title className="p-4 flex justify-center text-3xl">
                        {skill.name}
                    </Title>
                </Card.Section>
                <div className="p-4">
                    <Text className="text-[16px]">
                        {!isHovering && skill.dept_name && `Departments: ${skill.dept_name.join(', ')}`}
                        {!isHovering && !skill.dept_name.length && "Not used in any departments"}
                        {isHovering && <Text className="text-xl">Click to see more!</Text>}
                    </Text>
                </div>
            </Card>
        </div>
    )
}
