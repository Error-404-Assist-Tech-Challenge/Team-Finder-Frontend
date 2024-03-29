/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Modal, Card, Title, Text, Button, Select, TextInput } from '@mantine/core';
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../App';
import { useDisclosure } from '@mantine/hooks';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function DepartmentCard(props) {

    const [darkMode, setDarkMode] = useContext(Context);
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const currentManager = (props.manager ? props.manager_id : '');
    const currentManagerObject = { label: props.manager, value: props.manager_id };

    const updatedDepartmentManagers = (props.manager
        ? [...props.departmentManagers, currentManagerObject]
        : [...props.departmentManagers]);

    const [departmentManager, setDepartmentManager] = useState(props.manager ? currentManager : null);
    const [departmentName, setDepartmentName] = useState(props.name ? props.name : '');

    const handleEdit = () => {
        setIsEditing(true);
    }
    const handleSave = () => {
        updateDepartment();
        setIsEditing(false);
    }

    const updateDepartment = async () => {
        close();
        props.setVisible(true);
        try {
            const response = await axiosPrivate.put('departments',
                JSON.stringify({
                    dept_id: props.id,
                    name: departmentName,
                    manager_id: departmentManager
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

            props.setDepartments(response.data);

            if (props.manager) {
                const departmentManagersWithOldManager = [...props.departmentManagers, { value: props.manager_id, label: props.manager }];
                const departmentManagersWithoutNewManager = departmentManagersWithOldManager.filter(user => user.value !== departmentManager);
                props.setDepartmentManagers(departmentManagersWithoutNewManager);
            }
            else {
                const departmentManagersWithoutNewManager = props.departmentManagers.filter(user => user.value !== departmentManager)
                props.setDepartmentManagers(departmentManagersWithoutNewManager);
            }

        } catch (error) {
            console.error('Error updating department:', error);
        }
        props.setVisible(false);
    }

    const deleteDepartment = async () => {
        close();
        props.setVisible(true);
        const departmendId = props.id;
        try {
            const response = await axiosPrivate.delete('departments', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    dept_id: departmendId
                },
                withCredentials: true
            });

            // console.log('Response:', response.data);

            props.setDepartments(response.data);

        } catch (error) {
            console.error('Error deleting user skills:', error);
        }
        props.setVisible(false);
    }


    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className="flex flex-wrap">
                    <Modal opened={opened} onClose={() => { setIsEditing(false); close(); }} centered overflow="inside" size={500} className="dark:bg-card_modal text-[white] select-none" zIndex={1000002}>
                        <div className="flex justify-center">
                            {!isEditing && (<h1 className="text-4xl font-bold mb-[30px]">{props.name} Department</h1>)}
                            {isEditing && (
                                <>
                                    <TextInput
                                        placeholder="Department name"
                                        value={departmentName}
                                        onChange={(event) => setDepartmentName(event.currentTarget.value)}
                                        size="lg" />
                                    <h1 className="text-4xl font-bold mb-[30px] ml-3">Department</h1>
                                </>)
                            }
                        </div>
                        <div className="p-4 py-8 flex justify-left text-xl h-[42px]">
                            <p className="font-bold mr-2"> Manager: </p>
                            {!isEditing && props.manager && (
                                <p>{props.manager}</p>)}
                            {!isEditing && !props.manager && (
                                <p>Department has no manager</p>)}
                            {isEditing && <div>
                                <Select
                                    allowDeselect={true}
                                    placeholder="No manager"
                                    data={updatedDepartmentManagers}
                                    value={departmentManager}
                                    onChange={setDepartmentManager}
                                    searchable
                                    size="md"
                                    nothingFoundMessage="Manager does not exist..."
                                    comboboxProps={{ zIndex: 1000000000 }}
                                    className="" />
                            </div>}
                        </div>
                        <div className="p-4 py-8 flex justify-left text-xl">
                            {Object.keys(props.members).length !== 0 && (
                                <p><span className="font-bold text-2">Members: </span>
                                    {Object.keys(props.members).map((key, index) => (
                                        <span key={index}>
                                            {props.members[key].name}
                                            {index !== Object.keys(props.members).length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </p>
                            )}
                            {Object.keys(props.members).length === 0 && (
                                <p>
                                    <span className="font-bold">Members</span>: Department has no members
                                </p>
                            )}
                        </div>
                        <div className="p-[10px]">
                            {!isEditing && (<Button
                                className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded float-left" onClick={handleEdit}>
                                Edit department
                            </Button>)}
                            {isEditing && (<Button
                                className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded  float-left" onClick={handleSave}>
                                Save
                            </Button>)}
                            {props.manager.length == 0
                                ? <Button className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded float-right" onClick={deleteDepartment}>
                                    Remove department
                                </Button>
                                : <Button className="bg-[gray] text-white hover:bg-[gray] font-bold my-[20px] rounded float-right" disabled>
                                    Remove department
                                </Button>
                            }
                        </div>
                    </Modal>
                    <Card onClick={open} className="flex w-[240px] h-[184px] dark:bg-card_modal mx-[40px] my-[20px] rounded-xl text-[white] select-none font-bold"
                        onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        <Card.Section className="dark:bg-[#495256]">
                            <Title className="p-4 flex justify-center  text-3xl">
                                {props.name}
                            </Title>
                        </Card.Section>
                        <div className="flex justify-center items-center flex-col text-center h-full">
                            <div className="p-4">
                                <Text className="text-[16px]">
                                    {!isHovering && props.manager && `Manager: ${props.manager}`}
                                    {!isHovering && !props.manager.length && "No manager"}
                                    {isHovering && <Text className="text-xl">Click to see more!</Text>}
                                </Text>
                            </div>
                        </div>
                    </Card>
                </div >
            </div >
        </>
    )
}