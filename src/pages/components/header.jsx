import { Button, Avatar, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

// ADMIN EMPLOYEE DP_MANAGER PR_MANAGER
const role = 'ADMIN'

export default function GenericHeader() {

    const navigateTo = useNavigate();

    const handleMyProjects = () => {
        navigateTo('/projects');
    };

    const handleMySkills = () => {
        navigateTo('/skills');
    };

    if( role === 'ADMIN'){
        return(
            <div className="bg-[#272F32] border border-grey border-2 rounded">
                <p className="text-1xl font-bold text-[#D3D3D3] text-right px-4 pt-3 pb-0">Organization Admin Account</p>
                <div className="flex items-center pl-4 pb-4">
                    <Avatar radius="xl" color="rgba(232, 232, 232, 1)" />
                    <h1 className="text-2xl font-bold text-white pl-2">
                        Hello, username
                    </h1>
                </div>
                <div className="pl-6 pb-3">
                    <Button onClick={handleMySkills}
                            className="hover:text-[#FF3D2E]"
                            >
                        My Skills
                    </Button>
                    <Button onClick={handleMyProjects}
                            className="hover:text-[#FF3D2E]"
                            >
                        My projects
                    </Button>
                    <Button className="hover:text-[#FF3D2E]"
                            >
                        Employees
                    </Button>
                    <Button className="hover:text-[#FF3D2E]"
                            >
                        Departments
                    </Button>
                    <Button className="hover:text-[#FF3D2E]"
                            >
                        Skills
                    </Button>
                </div>
            </div>
        )
    }

    if( role === 'EMPLOYEE'){
        return(
            <div className="bg-[#272F32] border border-grey border-4 rounded">
                <p className="text-1xl font-bold text-[#D3D3D3] text-right px-4 pt-3 pb-0">Organization Employee Account</p>
                <div className="flex items-center pl-4 pb-4">
                    <Avatar radius="xl" color="rgba(232, 232, 232, 1)" />
                    <h1 className="text-2xl font-bold text-white pl-2">
                        Hello, username
                    </h1>
                </div>
                <div className="pl-6 pb-3">
                    <Button onClick={handleMySkills}
                            className="hover:text-[#FF3D2E]"
                            >
                        My Skills
                    </Button>
                    <Button onClick={handleMyProjects}
                            className="hover:text-[#FF3D2E]"
                            >
                        My projects
                    </Button>
                </div>
            </div>
        )
    }
    if( role === 'DP_MANAGER'){
        return(
            <div className="bg-[#272F32] border border-grey border-4 rounded">
                <p className="text-1xl font-bold text-[#D3D3D3] text-right px-4 pt-3 pb-0">Organization Department Manager Account</p>
                <div className="flex items-center pl-4 pb-4">
                    <Avatar radius="xl" color="rgba(232, 232, 232, 1)" />
                    <h1 className="text-2xl font-bold text-white pl-2">
                        Hello, username
                    </h1>
                </div>
                <div className="pl-6 pb-3">
                    <Button onClick={handleMySkills}
                            className="hover:text-[#FF3D2E]"
                            >
                        My Skills
                    </Button>
                    <Button onClick={handleMyProjects}
                            className="hover:text-[#FF3D2E]"
                            >
                        My projects
                    </Button>
                    <Button className="hover:text-[#FF3D2E]"
                            >
                        Departments
                    </Button>

                </div>
            </div>
        )
    }
    if( role === 'PR_MANAGER'){
        return(
            <div className="bg-[#272F32] border border-grey border-4 rounded">
                <p className="text-1xl font-bold text-[#D3D3D3] text-right px-4 pt-3 pb-0">Organization Project Manager Account</p>
                <div className="flex items-center pl-4 pb-4">
                    <Avatar radius="xl" color="rgba(232, 232, 232, 1)" />
                    <h1 className="text-2xl font-bold text-white pl-2">
                        Hello, username
                    </h1>
                </div>
                <div className="pl-6 pb-3">
                    <Button onClick={handleMySkills}
                            className="hover:text-[#FF3D2E]"
                            >
                        My Skills
                    </Button>
                    <Button onClick={handleMyProjects}
                            className="hover:text-[#FF3D2E]"
                            >
                        My projects
                    </Button>
                    <Button className="hover:text-[#FF3D2E]"
                            >
                        Employees
                    </Button>
                </div>
            </div>
        )
    }
}