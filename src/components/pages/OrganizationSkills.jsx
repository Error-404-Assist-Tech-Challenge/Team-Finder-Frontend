/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useHeadroom } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function OrganizationSkillsPage() {

    const axiosPrivate = useAxiosPrivate();
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    useEffect(() => {

    }, [darkMode]);

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getSkills = async () => {
            try {
                const response = await axiosPrivate.get('organizations/skills', {
                    signal: controller.signal
                });
                console.log('Skills:', response.data);
                isMounted && setSkills(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getSkills();

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