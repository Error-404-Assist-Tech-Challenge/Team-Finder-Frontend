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

    const [departmentManager, setDepartmentManager] = useState(currentManager);
    const [departmentName, setDepartmentName] = useState(props.name);

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        updatedDepartment();
        setIsEditing(false);
    }

    const getManagerName = (managerId) => {
        const manager = updatedDepartmentManagers.find(user => user.value === managerId);
        return manager ? manager.label : 'Unknown';
    };

    const updateDepartment = (departmentId, newName, newManagerId) => {

        const departmentManagersWithAdded = [...props.departmentManagers, { value: props.manager_id, label: props.manager }]
        props.setDepartmentManagers(departmentManagersWithAdded);

        const departmentManagersWithRemoved = props.departmentManagers.filter(user => user.value !== newManagerId)
        props.setDepartmentManagers(departmentManagersWithAdded);

        const newManagerName = getManagerName(newManagerId);

        const updatedDepartments = props.departments.map(department => {
            if (department.id === departmentId) {
                return { ...department, name: newName, manager_name: newManagerName };
            }
            return department;
        });

        props.setDepartments(updatedDepartments);
    };


    const updatedDepartment = async () => {

        // console.log(JSON.stringify({
        //     dept_id: props.id,
        //     name: departmentName,
        //     manager_id: departmentManager
        // }))

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

            console.log('Response:', response.data);

            updateDepartment(props.id, departmentName, departmentManager);

        } catch (error) {
            console.error('Error updating department:', error);
        }

        close();
    }

    const deleteDepartment = (idToDelete) => {
        const updatedDepartments = props.departments.filter(dept => dept.id !== idToDelete);
        props.setDepartments(updatedDepartments);
    };

    const handleRemoveDepartment = async () => {
        const departmendId = props.id;
        // try {
        //     const response = await axiosPrivate.delete('skills/user', {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Credentials': 'true'
        //         },
        //         data: {
        //             dept_id: departmendId
        //         },
        //         withCredentials: true
        //     });
        //     console.log('Response:', response.data);

        // } catch (error) {
        //     console.error('Error deleting user skills:', error);
        // }

        deleteDepartment(departmendId);
        close();
    }


    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className="flex flex-wrap">
                    <Modal opened={opened} onClose={close} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
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
                                            {props.members[key].user_name}
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
                                Edit skill
                            </Button>)}
                            {isEditing && (<Button
                                className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded  float-left" onClick={handleSave}>
                                Save
                            </Button>)}
                            <Button className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded float-right" onClick={handleRemoveDepartment}>
                                Remove Department
                            </Button>
                        </div>
                    </Modal>
                    <Card onClick={open} className="flex w-[240px] h-[184px] dark:bg-card_modal mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none font-bold"
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