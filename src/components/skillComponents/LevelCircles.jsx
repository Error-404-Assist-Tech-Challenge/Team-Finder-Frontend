/* eslint-disable react/prop-types */

import { Button } from '@mantine/core';
import { Context } from '../../App';
import { useContext } from 'react';

export default function LevelCircles(props) {
    const [darkMode, setDarkMode] = useContext(Context);

    function upgradeSkill(id) {
        if (props.skills[id].level < 5) {
            const updatedSkills = [...props.skills];
            updatedSkills[id].level++;
            props.setSkills(updatedSkills);
            return updatedSkills;
        }
    }

    function downgradeSkill(id) {
        if (props.skills[id].level > 0) {
            const updatedSkills = [...props.skills];
            updatedSkills[id].level--;
            props.setSkills(updatedSkills);
            return updatedSkills;
        }
    }

    const filledCircles = Math.min(props.skills[props.id].level, 5);
    const emptyCircles = Math.max(5 - filledCircles, 0);
    return (
        <div className={`${darkMode && 'dark'}`}>
            <Button variant="outline"
                onClick={() => downgradeSkill(props.id)}
                className={`w-[20px] h-[20px] m-[6px] rounded-full p-0 pr-[1px] pb-[1px] text-accent border-accent`}
            >-</Button>

            {Array.from({ length: filledCircles }).map((_, index) => (
                <Button key={`filled-${index}`} variant="filled"
                    className={`w-[20px] h-[20px] m-[6px] rounded-full p-0 pr-[1px] pb-[1px] dark:bg-darktext  bg-text`} />
            ))}

            {Array.from({ length: emptyCircles }).map((_, index) => (
                <Button key={`empty-${index}`} variant="outline"
                    className={`w-[20px] h-[20px] m-[6px] rounded-full p-0 pr-[1px] pb-[1px] dark:border-darktext border-text`} />
            ))}

            <Button variant="outline"
                onClick={() => upgradeSkill(props.id)}
                className={`w-[20px] h-[20px] m-[6px] rounded-full p-0 pr-[1px] pb-[1px] text-accent border-accent`}
            >+</Button>
        </div>
    );
}