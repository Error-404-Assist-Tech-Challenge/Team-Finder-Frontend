import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, useMantineTheme, rem, Group, Popover, Text, Modal, Button, Avatar, Tabs, Title } from '@mantine/core';
import { useLocalStorage, useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoonStars, IconBell } from '@tabler/icons-react';
import useLogout from '../../hooks/useLogout';

import { Context } from '../../App';
import useAuth from '../../hooks/useAuth'
import { NotificationCard } from './NotificationCard';

export default function GenericHeader() {

    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.clear();
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

    const notifications = [
        {
            proposal_id: "9746bb10-1f98-41f8-8575-f3a58785403f",
            user_name: "William Clark",
            skill_id: "56773271-6e37-42c3-8148-367f6649feb4",
            skill_name: "SQL",
            proposal: "False",
            project_name: null,
            type: "put"
        },
        {
            proposal_id: "e5c0f2a1-72bf-4a9a-bf7d-9e0892c485d3",
            user_name: "Emily Johnson",
            skill_id: "None",
            skill_name: "Python",
            proposal: "True",
            project_name: "Data Analysis Project",
            type: "post"
        },
        {
            proposal_id: "3d8f6132-e1df-46c6-89ee-021f8603a9b2",
            user_name: "Michael Smith",
            skill_id: "c1e180c8-847b-4561-9444-01522497551e",
            skill_name: "Java",
            proposal: "True",
            project_name: "Enterprise Application Development",
            type: "post"
        },
        {
            proposal_id: "f04978a4-7d78-4e22-80b6-5d32e7f1c0d1",
            user_name: "Sophia Brown",
            skill_id: "None",
            skill_name: "JavaScript",
            proposal: "False",
            project_name: "Enterprise Application Development",
            type: "put"
        },
        {
            proposal_id: "82ff843b-92d8-4fe1-85c0-1fc413ae7fae",
            user_name: "Daniel Miller",
            skill_id: "62b243fe-2e30-4d2d-bdf9-48e78a163d03",
            skill_name: "React",
            proposal: "True",
            project_name: "Frontend Development",
        }
    ]

    return (
        <div className={`${darkMode && 'dark'}`} >
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

                        <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-.m-1b7284a3.m-b5489c3c text-white rounded-modal" withCloseButton={false} zIndex={300}>

                            <div className="flex text-center">
                                <Title>Notifications ({notifications.length})</Title>
                            </div>
                            {notifications.map(notification => (
                                <NotificationCard key={notification.proposal_id} notification={notification} />)
                            )}

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
        </div >
    )
}