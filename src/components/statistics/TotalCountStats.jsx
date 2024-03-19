import { PieChart, Pie, Tooltip } from 'recharts';


export default function TotalCountStats({index, stats})
{
    const levelStats = stats.levels[0]/stats.total_department_members*100;
    const totalStats = (stats.total_department_members-stats.levels[0])/stats.total_department_members*100;
    const data01 = [
        { name: 'Rest of Employees percentage', value: levelStats},
        { name: 'Your Employees percentage', value: totalStats },
    ];
    const data02 = [
        { name: 'Rest of Employees percentage',  value: levelStats},
        { name: 'Your Employees percentage',  value: totalStats},

    ];
    return(
        <>
            <PieChart width={250} height={250   }>
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#DC143C" />
                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8B0000" label />
                <Tooltip />
            </PieChart>
        </>
    )
}