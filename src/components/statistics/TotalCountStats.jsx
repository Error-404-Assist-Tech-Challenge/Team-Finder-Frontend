/* eslint-disable react/prop-types */
import { PieChart, Pie, Tooltip } from 'recharts';


export default function TotalCountStats({ stats }) {
    const levelStats = stats.levels[0] / stats.total_department_members * 100;
    const totalStats = (stats.total_department_members - stats.levels[0]) / stats.total_department_members * 100;
    const data01 = [
        { name: `Employees with ${stats.skill_name} outside your dept. (%)`, value: Math.floor(levelStats * 10) / 10 },
        { name: `Employees with ${stats.skill_name} in your dept. (%)`, value: Math.floor(totalStats * 10) / 10 },
    ];
    const data02 = [
        { name: `Employees with ${stats.skill_name} outside your dept. (%)`, value: Math.floor(levelStats * 10) / 10 },
        { name: `Employees with ${stats.skill_name} in your dept. (%)`, value: Math.floor(totalStats * 10) / 10 },
    ];
    return (
        <>
            <PieChart width={300} height={250}>
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#DC143C" />
                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8B0000" label />
                <Tooltip />
            </PieChart>
        </>
    )
}