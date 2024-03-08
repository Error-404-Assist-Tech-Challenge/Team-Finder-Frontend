/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Title, TextInput, Textarea, Select } from '@mantine/core';
import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const SkillCard = ({ skill, skillCategories, setSkills, visible, setVisible }) => {

    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const [name, setName] = useState(`${skill.name}`);
    const [description, setDescription] = useState(`${skill.description}`);
    const [category, setCategory] = useState('');

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateSkill();
        setIsEditing(false);
    };

    const handleAddDepartment = async () => {
        try {
            const response = await axiosPrivate.post('skills/department',
                JSON.stringify({
                    skill_id: skill.id,
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

            setSkills(response.data);

        } catch (error) {
            console.error('Error adding skill to department:', error);
        }
        close();
    }

    const handleRemoveDepartment = async () => {
        try {
            const response = await axiosPrivate.delete('skills/department', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    skill_id: skill.id
                },
                withCredentials: true
            });

            console.log('Response:', response.data);

            setSkills(response.data);

        } catch (error) {
            console.error('Error removing skill from department:', error);
        }
        close();
    }

    const updateSkill = async () => {
        close();
        setVisible(true);
        try {
            const response = await axiosPrivate.put('organizations/skills',
                JSON.stringify({
                    skill_id: skill.id,
                    category_id: category,
                    name: name,
                    description: description,
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

            setSkills(response.data);

        } catch (error) {
            console.error('Error fetching updating skill:', error);
        }
        setVisible(false)
    }

    const deleteSkill = async () => {
        close();
        setVisible(true);
        try {
            const response = await axiosPrivate.delete('organizations/skills', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    id: skill.id
                },
                withCredentials: true
            });

            console.log('Response:', response.data);

            setSkills(response.data);

        } catch (error) {
            console.error('Error deleting skill:', error);
        }
        setVisible(false)
    }

    return (
        <div>
            <Modal opened={opened} onClose={close} centered overflow="inside" size="md" className="bg-.m-1b7284a3.m-b5489c3c text-white rounded-modal select-none" zIndex={1000002}>
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
                    <p className="font-bold mr-1">Category: </p>
                    {!isEditing && (<p>{skill.category_name}</p>)}
                    {isEditing && (<Select
                        allowDeselect={false}
                        placeholder="Select a category"
                        data={skillCategories}
                        value={category}
                        onChange={setCategory}
                        searchable
                        size="md"
                        nothingFoundMessage="Category does not exist..."
                        comboboxProps={{ zIndex: 1000000000 }}
                        className="" />)}
                </div>
                <div className="pt-4 flex justify-left">
                    <p><span className="font-bold">Departments</span>: {skill.dept_name.join(', ')}</p>
                </div>
                <div className="pt-4 flex my-[20px]">
                    <div className="w-[80px]">
                        {skill.is_authored && !isEditing && (<Button
                            className="w-[80px] bg-accent text-white hover:bg-btn_hover font-bold rounded" onClick={handleEdit}>
                            Edit
                        </Button>)}

                        {skill.is_authored && isEditing && (<Button
                            className="w-[80px] bg-accent text-white hover:bg-btn_hover font-bold rounded" onClick={handleSave}>
                            Save
                        </Button>)}
                    </div>

                    <div className="w-full flex justify-center">
                        {skill.is_department_managed && (<Button
                            className="bg-accent text-white hover:bg-btn_hover font-bold rounded" onClick={handleRemoveDepartment}>
                            Remove skill from my dept.
                        </Button>)}
                        {!skill.is_department_managed && (<Button
                            className="bg-accent text-white hover:bg-btn_hover font-bold rounded" onClick={handleAddDepartment}>
                            Add skill to my dept.
                        </Button>)}
                    </div>

                    <div className="w-[80px]">
                        {skill.is_authored && (<Button className="w-[80px] bg-accent text-white hover:bg-btn_hover font-bold rounded" onClick={deleteSkill}>
                            Delete
                        </Button>)}
                    </div>
                </div>
            </Modal>

            <Card variant="filled" onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className="flex w-[240px] h-[184px] dark:bg-card_modal mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none font-bold">
                <Card.Section className="dark:bg-[#495256]">
                    <Title className="p-4 flex justify-center text-3xl">
                        {skill.name}
                    </Title>
                </Card.Section>
                <div className="p-4 flex justify-center items-center h-full">
                    <Text className="text-[22px]">
                        {!isHovering && skill.category_name && `${skill.category_name}`}
                        {!isHovering && !skill.category_name && "Doesn't have skill category"}
                        {isHovering && <Text className="text-xl">Click to see more!</Text>}
                    </Text>
                </div>
            </Card>
        </div>
    )
}
