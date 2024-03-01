/* eslint-disable react/prop-types */

import { Button } from '@mantine/core';


export default function RoleCard(props) {
    return (
        <div className='flex items-center'>
            <Button variant="outline"
                className="w-[20px] h-[20px] m-[6px] rounded-full p-0 pr-[1px] pb-[1px] text-accent border-accent"
            >-</Button>
            <div className='font-bold'> {props.role}</div>
        </div>
    )
}