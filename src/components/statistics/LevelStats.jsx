import { PieChart, Pie } from 'recharts';


export default function LevelStatsComp({index, stats})
{
   
    const data01 = [
        { name: 'Level 1', value: stats[index].levels[0]},
        { name: 'Level 2', value: stats[index].levels[1] },
        { name: 'Level 3', value: stats[index].levels[2] },
        { name: 'Level 4', value: stats[index].levels[3] },
        { name: 'Level 5', value: stats[index].levels[4] },
    ];
    const data02 = [
        { name: 'Group A',  value: stats[index].levels[0] },
        { name: 'Group B',  value: stats[index].levels[1] },
        { name: 'Group C',  value: stats[index].levels[2] },
        { name: 'Group D',  value: stats[index].levels[3] },
        { name: 'Group E',  value: stats[index].levels[4] },
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