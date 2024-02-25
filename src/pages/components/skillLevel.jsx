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
            <Button
                variant="outline"
                color="#FF3D2E"
                style={{
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    margin: '4px',
                    padding: 0,
                }}
                onClick={() => downgradeSkill(props.id)}
            >-</Button>
           
            {[...Array(filledCircles)].map((_, index) => (
                <Button
                    key={`filled-${index}`}
                    variant="filled"
                    className="bg-white"
                    style={{
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        margin: '4px',
                        padding: 0,
                    }}
                />
            ))}

            {[...Array(emptyCircles)].map((_, index) => (
                <Button
                    key={`empty-${index}`}
                    variant="outline"
                    color="#FFFFFF"
                    style={{
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        margin: '4px',
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
                    margin: '4px',
                    padding: 0,
                }}
                onClick={() => upgradeSkill(props.id)}
            >+</Button>
        </div>
    );
}