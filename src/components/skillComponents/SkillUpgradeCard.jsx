/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Card, Title, Button, Divider } from '@mantine/core';
import ProposalLevel from '../departmentComponents/ProposalLevel';
import ProposalExperience from '../departmentComponents/ProposalExperience';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function SkillUpgradeCard({ skill_name, setSkillUpgrades, id, level, experience }) {

    const axiosPrivate = useAxiosPrivate();

    const handleConfirm = async () => {
        try {
            const response = await axiosPrivate.post('skills/employee_proposals',
                JSON.stringify({
                    id: id,
                    level: level,
                    experience: experience
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
            // console.log('Upgrade response:', response.data);
            setSkillUpgrades(response.data)
        } catch (error) {
            console.error('Error fetching upgrading skill:', error);
        }
    }

    const handleReject = async () => {
        try {
            const response = await axiosPrivate.delete('skills/employee_proposals', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    id: id
                },
                withCredentials: true
            });
            // console.log('Response:', response.data);
            setSkillUpgrades(response.data)
        } catch (error) {
            console.error('Error deleting user skills:', error);
        }
    }
    return (
        <div className="w-full rounded-lg bg-white p-4 my-2 select-none">
            <p className="text-[16px] text-darkcanvas pb-5">You have been working on a project for 1 day! We recommend you upgrade your <span className="font-bold">{skill_name}</span> skill to:</p>
            <ProposalLevel level={level} />
            <ProposalExperience experience={experience} />
            <Button className="w-[170px] mr-[5px] bg-[#1CB85C] mt-[10px]" onClick={handleConfirm}>Confirm</Button>
            <Button className="w-[170px] ml-[5px] bg-accent mt-[10px]" onClick={handleReject}>Reject</Button>
        </div >
    )

}
