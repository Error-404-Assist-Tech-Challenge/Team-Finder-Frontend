/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Select, Loader, Title, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DepartmentEmployee from '../departmentComponents/DepartmentEmployee';

export default function MyDepartmentComp({ members, setMembers, }) {

    // Initialization
    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [avalaible, setAvalaible] = useState([]);
    const [addedEmployee, setAddedEmployee] = useState('');

    const [visible, setVisible] = useState(false);

    const employeeList = []


    // Function that gets all the avalaible members

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAvalaibleMembers = async () => {
            try {
                const response = await axiosPrivate.get('departments/members/available', {
                    signal: controller.signal,
                    withCredentials: true
                });
                // console.log('Avalaible employees:', response.data);
                isMounted && setAvalaible(response.data)
            } catch (error) {
                console.error('Error fetching members without department:', error);
            }
        }

        getAvalaibleMembers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    for (let i = 0; i < avalaible.length; i++) {
        employeeList[i] = {
            value: avalaible[i].id,
            label: avalaible[i].name
        };
    }

    // Add new employee to department

    const handleAddEmployee = async () => {
        close();
        setVisible(true)
        try {
            const response = await axiosPrivate.post('departments/members',
                JSON.stringify({
                    user_id: addedEmployee,
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

            setMembers(response.data);

            const newAvailable = avalaible.filter(employee => employee.id !== addedEmployee)
            setAvalaible(newAvailable)

            setAddedEmployee('');

        } catch (error) {
            console.error('Error adding employees:', error);
        }
        setVisible(false)
    }


    // All the user cards + button to generate signup employee link

    return (
        <div className='dark:bg-darkcanvas bg-canvas h-screen'>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-graybg text-white select-none" zIndex={1000002} closeOnClickOutside={false}>
                <div className="flex justify-center">
                    <Title className="pb-[40px]">Add Employee</Title>
                </div>
                <Select
                    label="Unassigned employees:"
                    placeholder="Pick employee"
                    data={employeeList}
                    value={addedEmployee}
                    onChange={setAddedEmployee}
                    searchable
                    size="lg"
                    allowdeselect={false}
                    nothingFoundMessage="No employees avalaible..."
                    comboboxProps={{ zIndex: 1000000000 }} />
                <div className="flex justify-center">
                    {addedEmployee && (<Button onClick={handleAddEmployee}
                        className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[20px] mt-[40px] ">
                        Add Employee To Your Department
                    </Button>)}
                </div>
            </Modal>
            {visible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader size={30} color="red" />
                </div>
            )}
            {!visible && (
                <div className="flex">
                    <div className=" h-auto min-h-screen">
                        <div className="flex flex-wrap justify-center">
                            {members.map((member, index) => (
                                <DepartmentEmployee key={index} name={member.name} user_id={member.user_id} setMembers={setMembers} visible={visible} setVisible={setVisible} skills={member.skills} endorsements={member.endorsements} />
                            ))}
                            <div className="w-[380px] h-[160px] flex justify-center ">
                                <Button variant="outline" onClick={open}
                                    className={`relative w-[80px] h-[80px] m-[38px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}