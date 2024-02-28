/* eslint-disable no-unused-vars */
import { Table } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { useContext, useEffect } from 'react';
import { Context } from '../App';
import organizationSkillsData from './fakedb/organizationSkillsData'

export default function OrganizationSkillsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    useEffect(() => {

    }, [darkMode]);

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas select-none h-auto'>
                <Table className="w-full p-[20px]">
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
                        {organizationSkillsData.map((skill, index) => (
                            <tr key={index} className="text-left">
                                <td className="dark:text-darktext text-text px-[10px] py-[7px]">{skill.category}</td>
                                <td className="dark:text-darktext text-text px-[10px] py-[7px]">{skill.name}</td>
                                <td className="dark:text-darktext text-text px-[10px] py-[7px]">{skill.description}</td>
                                <td className="dark:text-darktext text-text px-[10px] py-[7px]">{skill.author}</td>
                                <td className="dark:text-darktext text-text px-[10px] py-[7px]">{skill.departments.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className='dark:bg-darkcanvas bg-canvas h-screen'></div>
        </div>
    )
}