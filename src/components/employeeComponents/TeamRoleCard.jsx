/* eslint-disable react/prop-types */
import { Title, Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


export default function TeamRoleCard({ id, name, setTeamRoles, used }) {

    const [isEditing, setIsEditing] = useState(false);
    const [roleName, setRoleName] = useState(name);
    const axiosPrivate = useAxiosPrivate();

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = async () => {
        try {
            const response = await axiosPrivate.put('organizations/team_roles',
                JSON.stringify({
                    name: roleName,
                    id: id,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            console.log('Response:', response.data);

            setTeamRoles(response.data);

        } catch (error) {
            console.error('Error adding skill to department:', error);
        }

        setIsEditing(false);
    }

    const handleRemove = async () => {
        try {
            const response = await axiosPrivate.delete('organizations/team_roles', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    id: id
                },
                withCredentials: true
            });

            console.log('Response:', response.data);

            setTeamRoles(response.data);

        } catch (error) {
            console.error('Error removing skill from department:', error);
        }
    }


    return (
        <div className="w-full rounded-lg bg-white p-4 my-2 select-none">
            {!isEditing && (
                <Title className="text-[24px] h-[52px] text-darkcanvas pb-5 text-center">{name}</Title>
            )}
            {isEditing && (
                <TextInput
                    className="h-[52px]"
                    size="lg"
                    value={roleName}
                    onChange={(event) => setRoleName(event.currentTarget.value)}
                />
            )}
            <div className="flex justify-between">
                {!isEditing && (
                    <Button className="w-[170px] mr-[5px] bg-accent mt-[10px] text-[18px]" onClick={handleEdit}>Edit</Button>
                )}
                {isEditing && (
                    <Button className="w-[170px] mr-[5px] bg-accent mt-[10px] text-[18px]" onClick={handleSave}>Save</Button>
                )}
                {!used ?
                    <Button className="w-[170px] ml-[5px] bg-accent mt-[10px] text-[18px]" onClick={handleRemove}>Remove</Button>
                    :
                    <Button className="w-[170px] ml-[5px] bg-[gray] mt-[10px] text-[18px]" disabled>Is being used</Button>
                }
            </div>
        </div >
    )
}
