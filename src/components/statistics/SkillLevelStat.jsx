/* eslint-disable react/prop-types */

import { PieChart, Pie, Tooltip } from 'recharts';


export default function PiechartComp({ stats }) {
    const data01 = [
        { name: `Employees with ${stats.skill_name} level 1`, value: stats.levels[1] },
        { name: `Employees with ${stats.skill_name} Level 2`, value: stats.levels[2] },
        { name: `Employees with ${stats.skill_name} Level 3`, value: stats.levels[3] },
        { name: `Employees with ${stats.skill_name} Level 4`, value: stats.levels[4] },
        { name: `Employees with ${stats.skill_name} Level 5`, value: stats.levels[5] },
    ];
    const data02 = [
        { name: `Employees with ${stats.skill_name} Level 1`, value: stats.levels[1] },
        { name: `Employees with ${stats.skill_name} Level 2`, value: stats.levels[2] },
        { name: `Employees with ${stats.skill_name} Level 3`, value: stats.levels[3] },
        { name: `Employees with ${stats.skill_name} Level 4`, value: stats.levels[4] },
        { name: `Employees with ${stats.skill_name} Level 5`, value: stats.levels[5] },
    ];
    return (
        <>
            <PieChart width={250} height={250}>
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#F39C12" />
                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#D35400" label />
                <Tooltip />
            </PieChart>
        </>
    )
}