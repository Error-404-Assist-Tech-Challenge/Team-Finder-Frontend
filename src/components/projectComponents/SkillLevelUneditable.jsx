/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button } from '@mantine/core';
import { Context } from '../../App';
import { useContext } from 'react';

export default function SkillLevelUneditable({ level }) {
    const [darkMode, setDarkMode] = useContext(Context);

    const filledCircles = Math.min(level, 5);
    const emptyCircles = Math.max(5 - filledCircles, 0);
    return (
        <div className={`${darkMode && 'dark'}`}>
            {Array.from({ length: filledCircles }).map((_, index) => (
                <Button key={`filled-${index}`} variant="filled"
                    className={`w-[15px] h-[15px] m-[1px] rounded-full p-0 bg-darktext border-[2px] `} />
            ))}
            {Array.from({ length: emptyCircles }).map((_, index) => (
                <Button key={`empty-${index}`} variant="outline"
                    className={`w-[15px] h-[15px] m-[1px] rounded-full p-0 border-darktext border-[2px]`} />
            ))}
        </div>
    );
}