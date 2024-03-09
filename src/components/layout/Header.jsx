import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, useMantineTheme, rem, Group, Popover, Text, Modal, Button, Avatar, Tabs } from '@mantine/core';
import { useLocalStorage, useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoonStars, IconBell } from '@tabler/icons-react';
import { PieChart, Pie, Legend, Tooltip, } from 'recharts';
import React, { PureComponent } from 'react';
import useLogout from '../../hooks/useLogout';

import { Context } from '../../App';
import useAuth from '../../hooks/useAuth'

export default function GenericHeader() {

    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate('/');
        await logout();
    }

    const [Value, setValue] = useLocalStorage({
        defaultValue: '',
    });

    const [opened, { open, close }] = useDisclosure(false);

    const [darkMode, setDarkMode] = useContext(Context);
    const toogleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const handleMySkills = () => {
        setValue('MySkills')
        navigate('/myskills');
    };
    const handleProjects = () => {
        setValue('Projects')
        navigate('/projects');
    };
    const handleOrganizationEmployees = () => {
        setValue('OrganizationEmployees');
        navigate('/organizationemployees');
    };
    const handleOrganizationDepartments = () => {
        setValue('OrganizationDepartments');
        navigate('/organizationdepartments');
    };
    const handleOrganizationSkills = () => {
        setValue('OrganizationSkills')
        navigate('/organizationskills');
    };
    const handleMyDepartment = () => {
        setValue('MyDepartment')
        navigate('/mydepartment');
    };
    const handleMyProjects = () => {
        setValue('MyProjects')
        navigate('/myprojects');
    };

    const theme = useMantineTheme();
    const sunIcon = (
        <IconSun
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.yellow[4]}
        />
    );
    const moonIcon = (
        <IconMoonStars
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.blue[6]}
        />
    );
    const data_Python = [
        { name: 'Level 1', value: 4 },
        { name: 'Level 2', value: 30 },
        { name: 'Level 3', value: 3 },
        { name: 'Level 4', value: 2 },
        { name: 'Level 5', value: 1 },
    ];
    const data02 = [
        { name: 'Group A', value: 2400 },
        { name: 'Group B', value: 4567 },
        { name: 'Group C', value: 1398 },
        { name: 'Group D', value: 9800 },
        { name: 'Group E', value: 3908 },
        { name: 'Group F', value: 4800 },
    ];

    const formatRoles = () => {
        const roleLabels = {
            admin: "Organization Admin",
            dept_manager: "Department Manager",
            proj_manager: "Project Manager"
        };

        const orderedRoles = ["admin", "dept_manager", "proj_manager"];

        const formattedRoles = orderedRoles
            .filter(role => auth?.roles.includes(role))
            .map(role => roleLabels[role])
            .join(" + ");

        return formattedRoles || "Employee";
    };

    const account = formatRoles();

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className="dark:bg-darkcanvas bg-canvas select-none">
                <div className="p-[20px] flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-darktext text-text">Welcome back, {auth?.name}</h1>
                    </div>
                    <p className="text-2xl font-bold text-[#505A5E] md:text-right">{account} Account</p>
                </div>
                <div className="pl-6 pb-3 flex justify-between items-center">
                    <div className="flex space-x-2 pt-1">
                        <Tabs color="#FF3D2E" radius="xs" defaultValue="" variant="default" value={Value}>
                            <Tabs.List>
                                <Tabs.Tab onClick={handleMySkills} value="MySkills" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                    My Skills
                                </Tabs.Tab>
                                <Tabs.Tab onClick={handleProjects} color="#FF3D2E" value="Projects" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                    Projects
                                </Tabs.Tab>

                                {auth?.roles.includes("admin") &&
                                    (<Tabs.Tab onClick={handleOrganizationEmployees} value="OrganizationEmployees" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        Org. Employees
                                    </Tabs.Tab>)}

                                {auth?.roles.includes("admin") &&
                                    (<Tabs.Tab onClick={handleOrganizationDepartments} value="OrganizationDepartments" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        Org. Departments
                                    </Tabs.Tab>)}


                                <Tabs.Tab onClick={handleOrganizationSkills} value="OrganizationSkills" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                    Org. Skills
                                </Tabs.Tab>

                                {auth?.roles.includes("dept_manager") &&
                                    (<Tabs.Tab onClick={handleMyDepartment} value="MyDepartment" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        My Department
                                    </Tabs.Tab>)}

                                {auth?.roles.includes("proj_manager") &&
                                    (<Tabs.Tab onClick={handleMyProjects} value="MyProjects" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        My Projects
                                    </Tabs.Tab>)}
                            </Tabs.List>
                        </Tabs>
                    </div>
                    <Group justify="center" className='pr-4 pt-1'>
                        <Button className='hover:bg-transparent' onClick={open}>
                            <IconBell
                                style={{ width: rem(35), height: rem(35), color: darkMode ? 'white' : 'black' }}
                                stroke={1.5}
                            />
                        </Button>

                        <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-.m-1b7284a3.m-b5489c3c text-white rounded-modal" withCloseButton={false} zIndex={1000003}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Python</h1>
                            </div>
                            <div className="pt-4" style={{ display: 'flex', justifyContent: 'left', }}>
                                <p style={{ fontWeight: 'bold' }}>Author</p>
                                <p>:  Andrei</p>
                            </div>
                            <div className="pt-4" style={{ display: 'flex', justifyContent: 'left' }}>
                                <p style={{ fontWeight: 'bold' }}>Description</p>
                                <p>:  Python is a versatile, high-level programming language known for its simplicity and readability. Developed by Guido van Rossum and first released in 1991, Python has grown to become one of the most popular programming languages worldwide.</p>
                            </div>
                            <div className="pt-4" style={{ display: 'flex', justifyContent: 'left' }}>
                                <p style={{ fontWeight: 'bold' }}>Category</p>
                                <p>:  programming language</p>
                            </div>
                            <div className="pt-4" style={{ display: 'flex', justifyContent: 'left' }}>
                                <p style={{ fontWeight: 'bold' }}>Departments</p>
                                <p>:  Backend, Frontend, Databases</p>
                            </div>
                            <div className="pt-4" style={{ display: 'flex', justifyContent: 'right' }}>
                                <Button className="bg-accent text-white hover:bg-btn_hover font-bold rounded ">Edit skill</Button>
                            </div>

                            <PieChart width={400} height={300}>
                                <Pie data={data_Python} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                            </PieChart>

                        </Modal>



                        <Popover width={250} position="bottom" withArrow shadow="md" className="custom-popover">
                            <Popover.Target>
                                <Avatar radius="xl" className="dark:bg-darkcanvas bg-gray-100" />
                            </Popover.Target>
                            <Popover.Dropdown style={{ backgroundColor: darkMode ? 'rgba(217, 221, 222, 0.37)' : 'rgba(237, 241, 242, 1)', border: '0' }}>
                                <div>
                                    <Text size="s" className="text-center pt-1 " style={{ color: darkMode ? 'white' : 'black' }}>{auth.name}</Text>
                                    <Text size="s" className="text-center pt-1 " style={{ color: darkMode ? 'white' : 'black' }}>{auth.email}</Text>
                                    <hr className="mt-[10px]"></hr>
                                    <Text size="s" className="text-center pt-1 " style={{ color: darkMode ? 'white' : 'black' }}>{auth.org_name}</Text>
                                    <Text size="s" className="text-center pt-1 " style={{ color: darkMode ? 'white' : 'black' }}>{auth.hq_address}</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Switch className="pt-2" size="lg" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} onClick={toogleDarkMode} />
                                    <Button className="bg-[#FF3D2E] mt-2  hover:bg-btn_hover font-bold text-white" onClick={handleLogout}>Log out</Button>
                                </div>
                            </Popover.Dropdown>
                        </Popover>
                    </Group>
                </div>
            </div>
        </div>
    )
}