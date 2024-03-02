/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Badge, Button, ModalContent } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import orgEmployeeModal from '../modals/orgEmployeeModal';
import RoleCard from './RoleCard';

export default function EmployeeCard({ employee }) {

    const [opened, { open, close }] = useDisclosure(false);
    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    return (
        <>
            <Card className="flex w-[300px] h-[230px] bg-[#505A5E] mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none hover:bg-btn_hover font-bold" onClick={open}>
                <div className="flex items-center">
                    <Avatar className="m-3 w-[50px] h-[50px] bg-[#E9E5E6]">{getInitials(employee.name)}</Avatar>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold">{employee.name}</div>
                    </div>
                </div>
                <div className='ml-3'>{employee.email}</div>
                <div className='mt-1'>
                    {
                        employee.user_roles.includes("admin") && (<RoleCard role={"Organization Admin"} />)
                    }
                    {
                        employee.user_roles.includes("dept_manager") && (<RoleCard role={"Department manager"} />)
                    }
                    {
                        employee.user_roles.includes("proj_manager") && (<RoleCard role={"Project Manager"} />)
                    }
                    {
                        employee.user_roles.length == 0 && (<RoleCard role={"Employee"} />)
                    }
                </div>
            </Card>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-.m-1b7284a3.m-b5489c3c text-white rounded-modal" withCloseButton={false} >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>BOB</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p>BOB@gmail.com</p>
                </div>
                <div className="pt-4" style={{ display: 'flex', justifyContent: 'left',  }}>
                    <p className="ml-[30px]" style={{fontSize: '20px', fontWeight: 'bold' }}>Roles:</p>
                </div>
                <div className="pt-4" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Badge color="gray" size="xl" variant="filled">Organization admin</Badge>
                </div>
                <div className="pt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Badge color="gray" size="xl" variant="filled">Projects Management</Badge>
                        <Badge color="darkgrey" size="xl" variant="filled">of 25H usv</Badge>
                </div>
                <div className="pt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button className="bg-accent text-white hover:bg-btn_hover font-bold rounded ">Make Department manager</Button>
                </div>
            </Modal>
            </>
    )
}