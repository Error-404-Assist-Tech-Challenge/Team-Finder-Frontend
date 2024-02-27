import { Button, Avatar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Switch, useMantineTheme, rem, Group, Popover, Text } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { Tabs } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Context } from '../../App';
import { IconBell } from '@tabler/icons-react'

// ADMIN EMPLOYEE DP_MANAGER PR_MANAGER
const role = 'ADMIN'

export default function GenericHeader() {

    const [Value, setValue] = useLocalStorage({
        defaultValue: '',
      });

    const [darkMode, setDarkMode] = useContext(Context);
    const toogleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const navigateTo = useNavigate();
    const handleMySkills = () => {
        setValue('MySkills')
        navigateTo('/myskills');
    };
    const handleProjects = () => {
        setValue('Projects')
        navigateTo('/projects');
    };
    const handleOrganizationEmployees = () => {
        setValue('OrganizationEmployees');
        navigateTo('/organizationemployees');
    };
    const handleOrganizationDepartments = () => {
        setValue('OrganizationDepartments');
        navigateTo('/organizationdepartments');
    };
    const handleOrganizationSkills = () => {
        setValue('OrganizationSkills')
        navigateTo('/organizationskills');
    };
    const handleMyDepartment = () => {
        setValue('MyDepartment')
        navigateTo('/mydepartment');
    };
    const handleMyProjects = () => {
        setValue('MyProjects')
        navigateTo('/myprojects');
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


    if (role === 'ADMIN') {
        return (
            <div className={`${darkMode && 'dark'}`}>
                <div className="dark:bg-darkcanvas bg-canvas select-none">
                    <div className="p-[20px] flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold dark:text-darktext text-text">Welcome back, David</h1>
                        </div>
                        <p className="text-2xl font-bold text-[#505A5E] md:text-right">Organization Admin Account</p>
                    </div>

                    <div className="pl-6 pb-3 flex justify-between items-center">
                        <div className="flex space-x-2 pt-1">
                            <Tabs color="#FF3D2E" radius="xs" defaultValue="" variant="default" value={Value}>
                                <Tabs.List>
                                    <Tabs.Tab onClick={handleMySkills} value="MySkills"  className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        My Skills
                                    </Tabs.Tab>
                                    <Tabs.Tab onClick={handleProjects} color="#FF3D2E" value="Projects" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        Projects
                                    </Tabs.Tab>
                                    <Tabs.Tab onClick={handleOrganizationEmployees} value="OrganizationEmployees" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        Org. Employees
                                    </Tabs.Tab>
                                    <Tabs.Tab onClick={handleOrganizationDepartments} value="OrganizationDepartments" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        Org. Departments
                                    </Tabs.Tab>
                                    <Tabs.Tab onClick={handleOrganizationSkills} value="OrganizationSkills"  className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        Org. Skills
                                    </Tabs.Tab>
                                    <Tabs.Tab onClick={handleMyDepartment} value="MyDepartment" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        My Department
                                    </Tabs.Tab>
                                    <Tabs.Tab onClick={handleMyProjects} value="MyProjects" className="hover:text-[#FF3D2E] dark:text-darktext text-text text-xl px-[40px]">
                                        My Projects
                                    </Tabs.Tab>
                                </Tabs.List>
                            </Tabs>
                        </div>
                        <Group justify="center" className='pr-4 pt-1'>
                            {darkMode && (
                               <Button className='hover:bg-transparent'> 
                                    <IconBell
                                        style={{ width: rem(35), height: rem(35) }}
                                        stroke={1.5}
                                        color="white"
                                    />
                                </Button>
                            )}
                            {!darkMode && (
                                <Button className='hover:bg-transparent'> 
                                    <IconBell
                                        style={{ width: rem(35), height: rem(35) }}
                                        stroke={1.5}
                                        color="black"
                                    />
                                </Button>
                            )}
                            <Popover width={250} position="bottom" withArrow shadow="md" className="custom-popover">
                                <Popover.Target>
                                    <Avatar radius="xl" color="rgba(232, 232, 232, 1)" />
                                </Popover.Target>
                                <Popover.Dropdown style={{ backgroundColor: 'rgba(80, 90, 94, 37)', border: '0'}}>
                                    <div>
                                        <Text size="s" className="text-center pt-1 text-white">David the Boss</Text>
                                        <Text size="s" className="text-center pt-1 text-white">davidtheboss@company.com</Text>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Switch className="pt-2" size="lg" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} onClick={toogleDarkMode} />
                                        <Button className="bg-[#FF3D2E] mt-2">Log out</Button>
                                    </div>
                                </Popover.Dropdown>
                            </Popover>
                        </Group>
                    </div>
                </div>
            </div>
        )
    }

    if (role === 'EMPLOYEE') {
        return (
            <div className="bg-[#272F32] border border-grey border-2 rounded">
                <p className="text-1xl font-bold text-[#D3D3D3] text-right px-4 pt-3 pb-0">Organization Employee Account</p>
                <div className="pl-4 pb-4">
                    <h1 className="text-2xl font-bold text-white pl-3">Wellcome back, username</h1>
                </div>
                <div className="pl-6 pb-3 flex justify-between items-center">
                    <div className="flex space-x-2 pt-1">
                        <Tabs color="red" radius="xs" defaultValue="MySkills" variant="default">
                            <Tabs.List>
                                <Tabs.Tab onClick={handleMySkills} value="MySkills" className="hover:text-[#FF3D2E] text-white">
                                    My Skills
                                </Tabs.Tab>
                                <Tabs.Tab onClick={handleMyProjects} value="MyProjects" className="hover:text-[#FF3D2E] text-white">
                                    My Projects
                                </Tabs.Tab>
                            </Tabs.List>
                        </Tabs>
                    </div>
                    <Group justify="center" className='pr-4 pt-1'>
                        <Popover width={250} position="bottom" withArrow shadow="md">
                            <Popover.Target>
                                <Avatar radius="xl" color="rgba(232, 232, 232, 1)" />
                            </Popover.Target>
                            <Popover.Dropdown>
                                <div>
                                    <Text size="s" className="text-center pt-1">Username</Text>
                                    <Text size="s" className="text-center pt-1">username@company.com</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Switch className="pt-2" size="lg" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />
                                    <Button className="bg-[#FF3D2E] mt-2">Log out</Button>
                                </div>
                            </Popover.Dropdown>
                        </Popover>
                    </Group>
                </div>
            </div>
        )
    }
    if (role === 'DP_MANAGER') {
        return (
            <div className="bg-[#272F32] border border-grey border-2 rounded">
                <p className="text-1xl font-bold text-[#D3D3D3] text-right px-4 pt-3 pb-0">Organization Department Manager Account</p>
                <div className="pl-4 pb-4">
                    <h1 className="text-2xl font-bold text-white pl-3">Wellcome back, username</h1>
                </div>
                <div className="pl-6 pb-3 flex justify-between items-center">
                    <div className="flex space-x-2 pt-1">
                        <Tabs color="red" radius="xs" defaultValue="MySkills" variant="default">
                            <Tabs.List>
                                <Tabs.Tab onClick={handleMySkills} value="MySkills" className="hover:text-[#FF3D2E] text-white">
                                    My Skills
                                </Tabs.Tab>
                                <Tabs.Tab onClick={handleMyProjects} value="MyProjects" className="hover:text-[#FF3D2E] text-white">
                                    My Projects
                                </Tabs.Tab>
                                <Tabs.Tab value="Departments" className="hover:text-[#FF3D2E] text-white">
                                    Departments
                                </Tabs.Tab>
                            </Tabs.List>
                        </Tabs>
                    </div>
                    <Group justify="center" className='pr-4 pt-1'>
                        <Popover width={250} position="bottom" withArrow shadow="md">
                            <Popover.Target>
                                <Avatar radius="xl" color="rgba(232, 232, 232, 1)" />
                            </Popover.Target>
                            <Popover.Dropdown>
                                <div>
                                    <Text size="s" className="text-center pt-1">Username</Text>
                                    <Text size="s" className="text-center pt-1">username@company.com</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Switch className="pt-2" size="lg" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />
                                    <Button className="bg-[#FF3D2E] mt-2">Log out</Button>
                                </div>
                            </Popover.Dropdown>
                        </Popover>
                    </Group>
                </div>
            </div>
        )
    }
    if (role === 'PR_MANAGER') {
        return (
            <div className="bg-[#272F32] border border-grey border-2 rounded">
                <p className="text-1xl font-bold text-[#D3D3D3] text-right px-4 pt-3 pb-0">Organization Project Manager Account</p>
                <div className="pl-4 pb-4">
                    <h1 className="text-2xl font-bold text-white pl-3">Wellcome back, username</h1>
                </div>
                <div className="pl-6 pb-3 flex justify-between items-center">
                    <div className="flex space-x-2 pt-1">
                        <Tabs color="red" radius="xs" defaultValue="MySkills" variant="default">
                            <Tabs.List>
                                <Tabs.Tab onClick={handleMySkills} value="MySkills" className="hover:text-[#FF3D2E] text-white">
                                    My Skills
                                </Tabs.Tab>
                                <Tabs.Tab onClick={handleMyProjects} value="MyProjects" className="hover:text-[#FF3D2E] text-white">
                                    My Projects
                                </Tabs.Tab>
                                <Tabs.Tab value="Employees" className="hover:text-[#FF3D2E] text-white">
                                    Employees
                                </Tabs.Tab>
                            </Tabs.List>
                        </Tabs>
                    </div>
                    <Group justify="center" className='pr-4 pt-1'>
                        <Popover width={250} position="bottom" withArrow shadow="md">
                            <Popover.Target>
                                <Avatar radius="xl" color="rgba(232, 232, 232, 1)" />
                            </Popover.Target>
                            <Popover.Dropdown>
                                <div>
                                    <Text size="s" className="text-center pt-1">Username</Text>
                                    <Text size="s" className="text-center pt-1">username@company.com</Text>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Switch className="pt-2" size="lg" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />
                                    <Button className="bg-[#FF3D2E] mt-2">Log out</Button>
                                </div>
                            </Popover.Dropdown>
                        </Popover>
                    </Group>
                </div>
            </div>
        )
    }
}