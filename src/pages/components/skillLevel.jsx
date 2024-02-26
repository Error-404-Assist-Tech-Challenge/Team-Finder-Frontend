/* eslint-disable react/prop-types */
import { Button } from '@mantine/core';

export default function LevelCircles(props) {

    function upgradeSkill(id) {
        if (props.skillLevels[id] < 5) {
            props.setSkillLevels(prevSkillLevels => {
                const updatedSkillLevels = [...prevSkillLevels];
                updatedSkillLevels[id]++;
                return updatedSkillLevels;
            });
        }
    }

    function downgradeSkill(id) {
        if (props.skillLevels[id] > 0) {
            props.setSkillLevels(prevSkillLevels => {
                const updatedSkillLevels = [...prevSkillLevels];
                updatedSkillLevels[id]--;
                return updatedSkillLevels;
            });
        }
    }

    const filledCircles = Math.min(props.skillLevels[props.id], 5);
    const emptyCircles = Math.max(5 - filledCircles, 0);
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