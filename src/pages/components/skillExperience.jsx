/* eslint-disable react/prop-types */
import { Button } from '@mantine/core';

export default function ExperienceCircles(props) {

    function upgradeSkill(id) {
        if (props.skillExperience[id] < 6) {
            props.setSkillExperience(prevSkillExperience => {
                const updatedSkillExperience = [...prevSkillExperience];
                updatedSkillExperience[id]++;
                return updatedSkillExperience;
            });
        }
    }
    
    function downgradeSkill(id) {
        if (props.skillExperience[id] > 0) {
            props.setSkillExperience(prevSkillExperience => {
                const updatedSkillExperience = [...prevSkillExperience];
                updatedSkillExperience[id]--;
                return updatedSkillExperience;
            });
        }
    }
    
    const filledCircles = Math.min(props.skillExperience[props.id], 6);
    const emptyCircles = Math.max(6 - filledCircles, 0);
    return (
        <div>
            <Button variant="outline" onClick={() => downgradeSkill(props.id)}
                className="w-[20px] h-[20px] m-[6px] rounded-full p-0 pr-[1px] pb-[1px] text-accent border-accent"
            >-</Button>

            {[...Array(filledCircles)].map((_, index) => (
                <Button key={`filled-${index}`} variant="filled"
                    className="w-[20px] h-[20px] m-[6px] rounded-full p-0 pr-[1px] pb-[1px] dark:bg-darktext bg-text"/>
            ))}

            {[...Array(emptyCircles)].map((_, index) => (
                <Button key={`empty-${index}`} variant="outline"
                    className="w-[20px] h-[20px] m-[6px] rounded-full p-0 pr-[1px] pb-[1px] dark:border-darktext border-text"/>
            ))}

            <Button variant="outline" onClick={() => upgradeSkill(props.id)}
                className="w-[20px] h-[20px] m-[6px] rounded-full p-0 pr-[1px] pb-[1px] text-accent border-accent"
            >+</Button>
        </div>
    );
}