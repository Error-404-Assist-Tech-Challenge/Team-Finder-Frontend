/* eslint-disable react/prop-types */
import { Card } from '@mantine/core';


export const SkillCard = ({ skill }) => {
  return (
    <div>
        <Card variant="filled"  
        className="bg-graybg hover:bg-btn_hover w-[250px] h-[154px] mx-[40px] font-bold text-white">
            <Card.Section className="bg-[#495256] p-3 text-2xl  flex justify-center items-center">
                {skill.name}
            </Card.Section>
        </Card>
     </div>
  )
}
