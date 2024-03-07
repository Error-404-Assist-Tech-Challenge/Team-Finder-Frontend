/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button } from '@mantine/core';
import { Context } from '../../App';
import { useContext } from 'react';

export default function ProposalLevel(props) {
    const [darkMode, setDarkMode] = useContext(Context);

    const filledCircles = Math.min(props.level, 5);
    const emptyCircles = Math.max(5 - filledCircles, 0);

    return (
        <div className={'flex justify-center items-center'}>
            <p className="text-[18px]">Level: </p>
            {Array.from({ length: filledCircles }).map((_, index) => (
                <Button key={`filled-${index}`} variant="filled"
                    className={`w-[20px] h-[20px] m-[6px] rounded-full p-0 dark:bg-text bg-text border-2`} />
            ))}

            {Array.from({ length: emptyCircles }).map((_, index) => (
                <Button key={`empty-${index}`} variant="outline"
                    className={`w-[20px] h-[20px] m-[6px] rounded-full p-0 dark:border-text border-text border-2`} />
            ))}
            <p className="text-[18px] text-white">Level: </p>
        </div >
    );
}