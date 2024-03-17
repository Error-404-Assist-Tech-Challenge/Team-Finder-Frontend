/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Card, Title, Button, Divider } from '@mantine/core';
import ProposalLevel from '../departmentComponents/ProposalLevel';
import ProposalExperience from '../departmentComponents/ProposalExperience';

export default function SkillUpgradeCard({ skill_name, level, experience }) {

    return (
        <div className="w-full rounded-lg bg-white p-4 my-2 select-none">
            <p className="text-[16px] text-darkcanvas pb-5">You have been working on a project for 3 months! We recommend you upgrade your <span className="font-bold">{skill_name}</span> skill to:</p>
            <ProposalLevel level={level} />
            <ProposalExperience experience={experience} />
            <Button className="w-[170px] mr-[5px] bg-[#1CB85C] mt-[10px]">Confirm</Button>
            <Button className="w-[170px] ml-[5px] bg-accent mt-[10px]">Reject</Button>
        </div >
    )

}
