/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '@mantine/core';
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom'

import EmployeeCard from './EmployeeCard'
import useAuth from "../../hooks/useAuth"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const Users = () => {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('organization/users', {
                    signal: controller.signal
                });
                isMounted && setUsers(response.data)
            } catch (error) {
                console.error('Error fetching organization members:', error);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        Object.keys(users).length > 0 ?
            Object.keys(users).map(user_id => (
                <EmployeeCard key={user_id} employee={users[user_id]} />
            )) : (
                <Card className='w-[300px] h-[230px] bg-accent mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none flex justify-center items-center'>
                    <h2 className='text-2xl block'>You have no employees</h2>
                </Card>
            )
    );
}

export default Users;