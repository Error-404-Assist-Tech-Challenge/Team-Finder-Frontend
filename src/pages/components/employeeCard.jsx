/* eslint-disable react/prop-types */
import { Card, Avatar, Button } from '@mantine/core';


export default function EmployeeCard({ employee }) {

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    return (
        <Card className="flex w-[300px] h-[230px] bg-[#505A5E] mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none">
            <div className="flex items-center">
                <Avatar className="m-3 w-[50px] h-[50px] bg-[#E9E5E6]">{getInitials(employee.name)}</Avatar>
                <div className="flex flex-col">
                    <div className="text-xl font-bold">{employee.name}</div>
                </div>
            </div>
            <div className='ml-3'>{employee.email}</div>
            <div className='mt-1'>
                {employee.user_roles.map((role, index) => (
                    <div key={index} className='flex items-center'>
                        <Button variant="outline"
                            className="w-[20px] h-[20px] m-[6px] rounded-full p-0 pr-[1px] pb-[1px] text-accent border-accent"
                        >-</Button>
                        <div className='font-bold'> {role}</div>
                    </div>
                ))}
            </div>
        </Card>

    )
}