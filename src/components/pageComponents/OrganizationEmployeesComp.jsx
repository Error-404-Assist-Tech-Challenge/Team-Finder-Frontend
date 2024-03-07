import { Card, Button, rem } from '@mantine/core';
import EmployeeCard from '../employeeComponents/EmployeeCard';
import React, { useState } from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export default function OrganizationEmployeesComp({ users, setUsers }) {

    const [generatedLink, generateLink] = useState('');
    const axiosPrivate = useAxiosPrivate();

    // Function that generates a signup employee link and copies it to clipboard

    function handleSignUpLink() {

        let isMounted = true;
        const controller = new AbortController();

        const getSignUpLink = async () => {
            try {
                const response = await axiosPrivate.post('organizations/signup_token', {
                    signal: controller.signal,
                    withCredentials: true
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

                isMounted && generateLink(urlWithId)

                const ild = notifications.show({
                    title: 'Employee Sign Up Link copied to clipboard',
                    message: `${urlWithId}`,
                    icon: <IconCheck style={{ width: rem(35), height: rem(35) }} />,
                    color: "teal",
                    style: { width: 455 },
                });
            } catch (error) {
                console.error('Error fetching organization members:', error);
            }
        }

        getSignUpLink();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }


    return (
        <>
            {Object.keys(users).length > 0 ? (
                Object.keys(users).map(user_id => (
                    <EmployeeCard key={user_id} employee={users[user_id]} setUsers={setUsers} />
                ))
            ) : (
                <Card className='w-[300px] h-[230px] bg-accent mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none flex justify-center items-center'>
                    <h2 className='text-2xl block'>You have no employees</h2>
                </Card>
            )}
            <div className='flex flex-wrap gap-6'>                 
                <div className="flex justify-center items-center h-[340px] w-[380px]">
                    <Button variant="outline" onClick={handleSignUpLink}
                        className={`relative w-[80px] h-[80px] m-[6px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </Button>
                </div>
            </div>
        </>
    )
}