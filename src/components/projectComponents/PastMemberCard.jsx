/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Button, Text } from '@mantine/core';
import React, { useState } from 'react';

export default function PastMemberCard({ setNewMembers, setProposedMembers, project_id, employee, available_roles }) {

    const [isHovering, setIsHovering] = useState(false);

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    return (
        <>
            <Button className="flex bg-[#878e96] h-[90px] w-[220px] px-0 mx-[10px] my-[10px] rounded-xl text-white select-none font-bold">
                <div className="flex items-center justify-center h-full">
                    <Avatar className="w-[60px] h-[60px] m-3 bg-[#E9E5E6]">{getInitials(employee.name)}</Avatar>
                    <div className="text-xl font-bold text-left">
                        {employee.name.split(' ').slice(0, 2).map((word, index) => (
                            <div key={index}>{word}</div>
                        ))}
                    </div>
                </div>
            </Button >
        </>
    )
}