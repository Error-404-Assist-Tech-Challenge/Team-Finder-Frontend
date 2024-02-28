import { useState, useEffect } from "react"
import axios from '../../api/axios'
import EmployeeCard from './employeeCard'
import { Card } from '@mantine/core';

const USER_ID = 'aaf86aa9-c868-4f9b-b5a0-178aff826b5a'

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get(`/users?user_id=${USER_ID}`, {
                    signal: controller.signal
                });
                isMounted && setUsers(response.data)
            } catch (error) {
                console.log(error);
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