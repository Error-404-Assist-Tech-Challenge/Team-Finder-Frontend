import { PieChart, Pie, Tooltip } from 'recharts';


export default function LevelStatsComp({index, stats})
{
    const levelList = [0, 0, 0, 0, 0, 0]
    let cnt = 0;
    for(let i = 0; i < stats.length; i++)
    {
        levelList[1] = stats[i].levels[1] + levelList[1]; 
        if(stats[i].levels[1] > 0)
            cnt = cnt + stats[i].levels[1];
        levelList[2] = stats[i].levels[2] + levelList[2]; 
        if(stats[i].levels[2] > 0)
            cnt = cnt + stats[i].levels[2];
        levelList[3] = stats[i].levels[3] + levelList[3]; 
        if(stats[i].levels[3] > 0)
            cnt = cnt + stats[i].levels[3];
        levelList[4] = stats[i].levels[4] + levelList[4]; 
        if(stats[i].levels[4] > 0)
            cnt = cnt + stats[i].levels[4];
        levelList[5] = stats[i].levels[5] + levelList[5]; 
        if(stats[i].levels[5] > 0)
            cnt = cnt + stats[i].levels[5];      
    }
    const data01 = [
        { name: 'Employees at Level 1', value: levelList[1]},
        { name: 'Employees at Level 2', value: levelList[2] },
        { name: 'Employees at Level 3', value: levelList[3] },
        { name: 'Employees at Level 4', value: levelList[4] },
        { name: 'Employees at Level 5', value: levelList[5] },
    ];
    const data02 = [
        { name: 'Employees at Level 1',  value: levelList[1] },
        { name: 'Employees at Level 2',  value: levelList[2] },
        { name: 'Employees at Level 3',  value: levelList[3] },
        { name: 'Employees at Level 4',  value: levelList[4] },
        { name: 'Employees at Level 5',  value: levelList[5] },
    ];
    return(
        <div className='mt-4 flex flex-col items-center'>
    <h1 className='text-white' style={{ fontSize: '2em' }}>Levels in your department:</h1>
    <table style={{ borderCollapse: 'separate', borderSpacing: '10px' }} className='text-white'>
        <thead>
            <tr>
                <th >Level 1</th>
                <th>Level 2</th>
                <th>Level 3</th>
                <th>Level 4</th>
                <th>Level 5</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
        <tr>
            <td style={{ fontWeight: 'bold' }}>{levelList[1]}</td>
            <td style={{ fontWeight: 'bold' }}>{levelList[2]}</td>
            <td style={{ fontWeight: 'bold' }}>{levelList[3]}</td>
            <td style={{ fontWeight: 'bold' }}>{levelList[4]}</td>
            <td style={{ fontWeight: 'bold' }}>{levelList[5]}</td>
            <td style={{ fontWeight: 'bold' }}>{cnt}</td>
        </tr>
    </tbody>
    </table>
    <PieChart width={500} height={500}>
        <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={130} fill="#E74C3C" />
        <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={160} outerRadius={200} fill="#922B21" label />
        <Tooltip />
    </PieChart>
</div>
    )
}