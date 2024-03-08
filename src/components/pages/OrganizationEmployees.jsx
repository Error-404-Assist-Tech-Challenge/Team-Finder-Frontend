/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { randomId } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import { Context } from '../../App';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrganizationEmployeesComp from '../pageComponents/OrganizationEmployeesComp';
import PaginationComp from '../pageComponents/Pagination';



export default function OrganizationEmployeesPage() {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(7);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = users.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
    }, [darkMode]);


    // Function that gets all the users from the organization

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('organization/users', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Users:', response.data);
                isMounted && setUsers(response.data)
                setVisible(false);
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

    // All the user cards + button to generate signup employee link

    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen'>
                    <div className="flex flex-wrap justify-center">
                        {visible && (
                            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Loader size={30} color="red" />
                            </div>
                        )}
                        {!visible && (
                            <>
                                <OrganizationEmployeesComp users={currentPosts} setUsers={setUsers} visible={visible} setVisible={setVisible} />
                            </>
                        )}
                    </div>
                    <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center'>
                        <PaginationComp totalPosts={users.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </>
    )
}