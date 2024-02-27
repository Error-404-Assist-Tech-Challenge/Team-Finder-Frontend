import { useState, useEffect } from "react"
import axios from '../../api/axios'
import EmployeeCard from './employeeCard'

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get('/users', {
                    signal: controller.signal
                });
                console.log('Users:', response.data);
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
            <p>No users to display</p>
        )
    );
}

export default Users;