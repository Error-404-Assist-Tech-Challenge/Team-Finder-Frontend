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
            <Button
                variant="outline"
                color="#FF3D2E"
                style={{
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    margin: '6px',
                    padding: 0,
                }}
                onClick={() => downgradeSkill(props.id)}
            >-</Button>
           
            {[...Array(filledCircles)].map((_, index) => (
                <Button
                    key={`filled-${index}`}
                    variant="filled"
                    className="dark:bg-darktext bg-text"
                    style={{
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        margin: '6px',
                        padding: 0,
                    }}
                />
            ))}

            {[...Array(emptyCircles)].map((_, index) => (
                <Button
                    key={`empty-${index}`}
                    variant="outline"
                    className="dark:border-darktext border-text"
                    style={{
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        margin: '6px',
                        padding: 0,
                    }}
                />
            ))}

            <Button
                variant="outline"
                color="#FF3D2E"
                style={{
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    margin: '6px',
                    padding: 0,
                }}
                onClick={() => upgradeSkill(props.id)}
            >+</Button>
        </div>
    );
}