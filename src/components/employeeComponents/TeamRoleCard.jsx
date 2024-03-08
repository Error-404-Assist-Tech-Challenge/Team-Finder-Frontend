/* eslint-disable react/prop-types */
import { Title, Button } from '@mantine/core';

export default function TeamRoleCard({ id, name }) {
    return (
        <div className="w-full rounded-lg bg-white p-4 my-2 select-none">
            <Title className="text-[24px] text-darkcanvas pb-5 text-center">{name}</Title>
            <Button className="w-[170px] mr-[5px] bg-accent mt-[10px] text-[18px]">Edit</Button>
            <Button className="w-[170px] ml-[5px] bg-accent mt-[10px] text-[18px]">Remove</Button>
        </div >
    )
}
