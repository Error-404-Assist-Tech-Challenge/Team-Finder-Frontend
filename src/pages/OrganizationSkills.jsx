/* eslint-disable no-unused-vars */
import { useHeadroom } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import { Context } from '../App';
import axios from '../api/axios'

const USER_ID = 'aaf86aa9-c868-4f9b-b5a0-178aff826b5a'

export default function OrganizationSkillsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    useEffect(() => {

    }, [darkMode]);

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get(`/organizations/skills?user_id=${USER_ID}`, {
                    signal: controller.signal
                });
                console.log('Skills:', response.data);
                isMounted && setSkills(response.data);
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
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas select-none h-auto'>
                <Table className="p-[20px]">
                    <thead>
                        <tr className="text-xl text-left">
                            <th className="dark:text-darktext text-text p-[7px]">Category</th>
                            <th className="dark:text-darktext text-text p-[7px]">Name</th>
                            <th className="dark:text-darktext text-text p-[7px]">Description</th>
                            <th className="dark:text-darktext text-text p-[7px]">Author</th>
                            <th className="dark:text-darktext text-text p-[7px]">Departments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill, index) => (
                            <tr key={index} className="text-left">
                                <td className="dark:text-darktext text-text px-[10px] py-[7px]">skill.category_id</td>
                                <td className="dark:text-darktext text-text px-[10px] py-[7px]">{skill.name}</td>
                                <td className="dark:text-darktext text-text px-[10px] py-[7px]">{skill.description}</td>
                                <td className="dark:text-darktext text-text px-[10px] py-[7px]">{skill.author_name}</td>
                                <td className="dark:text-darktext text-text px-[10px] py-[7px]">skill.departments.join(', ')</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className='dark:bg-darkcanvas bg-canvas h-screen'></div>
        </div>
    )
}