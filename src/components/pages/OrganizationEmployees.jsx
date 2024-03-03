/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react';
import { Button, Loader, Card, rem } from '@mantine/core';

import { Context } from '../../App';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EmployeeCard from '../employeeComponents/EmployeeCard'
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

export default function OrganizationEmployeesPage() {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
    }, [darkMode]);


    // Function that gets all the users from the organization

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('organization/users', {
                    signal: controller.signal
                });
                console.log('Users:', response.data);
                isMounted && setUsers(response.data)
            } catch (error) {
                console.error('Error fetching organization members:', error);
            }
            finally {
                const timeout = 200;
                setTimeout(() => {
                    setVisible(true);
                }, timeout);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    // Function that generates a signup employee link and copies it to clipboard

    function handleSignUpLink() {

        let isMounted = true;
        const controller = new AbortController();

        const getSignUpLink = async () => {
            try {
                const response = await axiosPrivate.post('organizations/signup_token', {
                    signal: controller.signal
                });

                const id = response.data.id;
                const baseUrl = window.location.origin;
                const urlWithId = `${baseUrl}/signup/${id}`;

                navigator.clipboard.writeText(urlWithId)
                    .then(() => {
                        console.log('URL with ID copied to clipboard:', urlWithId);
                    })
                    .catch(err => {
                        console.error('Could not copy URL with ID: ', err);
                    });
                // isMounted &&
            } catch (error) {
                console.error('Error fetching organization members:', error);
            }
        }

        getSignUpLink();
        const ild = notifications.show({
            title: 'Invite link copied',
            message: 'You can share your link now.',
            icon: <IconCheck style={{ width: rem(35), height: rem(35) }} />,
            color: "teal",
        });

        return () => {
            isMounted = false;
            controller.abort();
        }
    }



    // All the user cards + button to generate signup employee link

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-screen flex flex-wrap'>
                {!visible && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader size={30} color="red" />
                    </div>
                )}
                {visible && (
                    <>
                        <div className='flex flex-wrap gap-6'>
                            {Object.keys(users).length > 0 ? (
                                Object.keys(users).map(user_id => (
                                    <EmployeeCard key={user_id} employee={users[user_id]} />
                                ))
                            ) : (
                                <Card className='w-[300px] h-[230px] bg-accent mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none flex justify-center items-center'>
                                    <h2 className='text-2xl block'>You have no employees</h2>
                                </Card>
                            )}
                            <Button className='w-[300px] h-[230px] mx-[40px] my-[20px] rounded-xl select-none bg-accent text-white text-2xl hover:bg-btn_hover font-bold text-white'
                                onClick={handleSignUpLink}>
                                Need more employees
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}