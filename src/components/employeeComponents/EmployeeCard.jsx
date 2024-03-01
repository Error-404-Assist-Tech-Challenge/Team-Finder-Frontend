/* eslint-disable react/prop-types */

import { Card, Avatar } from '@mantine/core';

import RoleCard from './RoleCard';

export default function EmployeeCard({ employee }) {

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    return (
        <Card className="flex w-[300px] h-[230px] bg-[#505A5E] mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none hover:bg-btn_hover font-bold">
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
    )
}