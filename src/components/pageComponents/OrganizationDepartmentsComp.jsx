/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';
import DepartmentCard from '../departmentComponents/DepartmentCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Button, Modal, TextInput, Loader, Title } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export default function OrganizationDepartmentsComp({ departmentManagers, setDepartmentManagers, departments, setDepartments, visible, setVisible }) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [departmentName, setDepartmentName] = useState('');

    // ADD DEPARTMENT

    const handleAddDepartment = async () => {
        close();
        setVisible(true);
        try {
            const response = await axiosPrivate.post('departments',
                JSON.stringify({
                    name: departmentName,
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

            setDepartments(response.data);

        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }
        setVisible(false);
    }


    return (
        <>
            <div className="flex flex-wrap justify-centerbg-darkcanvas">
                <div className='bg-darkcanvas select-none py-[30px] flex flex-wrap'>
                    {departments.map((department, index) => (
                        <DepartmentCard key={index}
                            id={department.id} manager={department.manager_name} manager_id={department.manager_id} name={department.name} members={department.department_members}
                            departmentManagers={departmentManagers} setDepartmentManagers={setDepartmentManagers}
                            departments={departments} setDepartments={setDepartments} visible={visible} setVisible={setVisible}/>
                    ))}
                    <div className="w-[200px] h-[224px] flex justify-center items-center">
                        <Button variant="outline" onClick={open}
                            className={`relative w-[80px] h-[80px] m-[6px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </Button>
                    </div>
                </div>
                <Modal opened={opened} onClose={close} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                    <div className="flex justify-center">
                        <Title className="pb-[30px]">Create Department</Title>
                    </div>
                    <TextInput
                        label="Department Name"
                        placeholder="Department name"
                        size="lg"
                        value={departmentName}
                        onChange={(event) => setDepartmentName(event.currentTarget.value)}
                        className=" py-[30px]"
                    />
                    {departmentName &&
                        (<Button onClick={handleAddDepartment}
                            className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px]">
                            Create Department
                        </Button>)}
                </Modal>
            </div>

        </>
    )
}