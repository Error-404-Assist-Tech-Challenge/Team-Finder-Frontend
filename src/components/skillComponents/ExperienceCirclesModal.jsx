/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button } from '@mantine/core';
import { Context } from '../../App';
import { useContext } from 'react';

export default function ExperienceCirclesModal(props) {

    const [darkMode, setDarkMode] = useContext(Context);

    function upgradeSkill(id) {
        if (props.skills[id].experience < 6) {
            const updatedSkills = [...props.skills];
            updatedSkills[id].experience++;
            props.setSkills(updatedSkills);
            return updatedSkills;
        }
    }

    function downgradeSkill(id) {
        if (props.skills[id].experience > 1) {
            const updatedSkills = [...props.skills];
            updatedSkills[id].experience--;
            props.setSkills(updatedSkills);
            return updatedSkills;
        }
    }


    const filledCircles = Math.min(props.skills[props.id].experience, 6);
    const emptyCircles = Math.max(6 - filledCircles, 0);


    return (
        <div className={`${darkMode && 'dark'}`}>
            <Button variant="outline" onClick={() => downgradeSkill(props.id)}
                className={`w-[35px] h-[35px] m-[6px] rounded-full p-0 text-accent border-accent border-[4px]`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus w-[25px] h-[25px]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                </svg>
            </Button>

            {Array.from({ length: filledCircles }).map((_, index) => (
                <Button key={`filled-${index}`} variant="filled"
                    className={`w-[35px] h-[35px] m-[6px] rounded-full p-0 dark:bg-darktext bg-text border-[3px]`} />
            ))}

            {Array.from({ length: emptyCircles }).map((_, index) => (
                <Button key={`empty-${index}`} variant="outline"
                    className={`w-[35px] h-[35px] m-[6px] rounded-full p-0 dark:border-darktext border-text border-[3px]`} />
            ))}

            <Button variant="outline" onClick={() => upgradeSkill(props.id)}
                className={`w-[35px] h-[35px] m-[6px] rounded-full p-0 text-accent border-accent border-[4px]`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-[30px] h-[30px]" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                </svg>
            </Button>
        </div>
    );
}