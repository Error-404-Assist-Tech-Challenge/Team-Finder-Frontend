
import { PieChart, Pie } from 'recharts';


export default function PiechartComp({index, stats})
{
    const data01 = [
        { name: 'Level 1', value: stats.levels[1]},
        { name: 'Level 2', value: stats.levels[2] },
        { name: 'Level 3', value: stats.levels[3] },
        { name: 'Level 4', value: stats.levels[4] },
        { name: 'Level 5', value: stats.levels[5] },
    ];
    const data02 = [
        { name: 'Group A',  value: stats.levels[1] },
        { name: 'Group B',  value: stats.levels[2] },
        { name: 'Group C',  value: stats.levels[3] },
        { name: 'Group D',  value: stats.levels[4] },
        { name: 'Group E',  value: stats.levels[5] },
    ];
    return(
        <>
            <PieChart width={400} height={300}>
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
            </PieChart>
        </>
    )
}