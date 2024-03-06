/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Text, Title } from '@mantine/core';
import { useState, useEffect } from 'react'


export const SkillCategoryCard = ({ name, id }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div>
            <Card variant="filled" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className="flex flex-wrap justify-center items-center min-w-[200px] h-[66px] dark:bg-card_modal ml-[30px] mt-[20px] rounded-xl dark:text-darktext text-text select-none font-bold">
                {!isHovering && (<Text className="text-xl">{name}</Text>)}
                {isHovering && <Text className="text-lg">Click to see more!</Text>}
            </Card >
        </div >
    )
}
