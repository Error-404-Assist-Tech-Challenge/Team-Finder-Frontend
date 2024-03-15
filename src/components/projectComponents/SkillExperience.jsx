/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button } from '@mantine/core';
import { Context } from '../../App';
import { useContext } from 'react';

export default function SkillExperience({ currentExperience }) {

    const [darkMode, setDarkMode] = useContext(Context);

    function upgradeSkill() {
        if (currentExperience < 6) {
            const updatedExperience = currentExperience + 1;
            // props.setCurrentExperience(updatedExperience);
        }
    }

    function downgradeSkill() {
        if (currentExperience > 1) {
            const updatedExperience = currentExperience - 1;
            // props.setCurrentExperience(updatedExperience);
        }
    }

    const filledCircles = Math.min(currentExperience, 6);
    const emptyCircles = Math.max(6 - filledCircles, 0);


    return (
        <div className={`${darkMode && 'dark'}`}>
            <Button variant="outline" onClick={downgradeSkill}
                className={`w-[15px] h-[15px] m-[1px] rounded-full p-0 text-accent border-accent border-[2px] hover:text-accent`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus w-[8px] h-[8px]" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                </svg>
            </Button>

            {Array.from({ length: filledCircles }).map((_, index) => (
                <Button key={`filled-${index}`} variant="filled"
                    className={`w-[15px] h-[15px] m-[1px] rounded-full p-0 bg-text border-[2px] `} />
            ))}

            {Array.from({ length: emptyCircles }).map((_, index) => (
                <Button key={`empty-${index}`} variant="outline"
                    className={`w-[15px] h-[15px] m-[1px] rounded-full p-0 border-text border-[2px]`} />
            ))}

            <Button variant="outline" onClick={upgradeSkill}
                className={`w-[15px] h-[15px] m-[1px] rounded-full p-0 text-accent border-accent border-[2px] hover:text-accent`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-[10px] h-[10px]" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                </svg>
            </Button>
        </div>
    );
}