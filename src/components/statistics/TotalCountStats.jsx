
import { PieChart, Pie } from 'recharts';


export default function TotalCountStats({index, stats})
{
    const data01 = [
        { name: 'Total', value: stats.levels[0]},
        { name: 'Employee', value: stats.total_department_members },
    ];
    const data02 = [
        { name: 'Group A',  value: stats.levels[0] },
        { name: 'Group B',  value: stats.total_department_members },

    ];
    return(
        <>
            <PieChart width={250} height={250   }>
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#DC143C" />
                <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8B0000" label />
            </PieChart>
        </>
    )
}