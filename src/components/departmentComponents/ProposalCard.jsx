/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Card, Title, Button, Divider } from '@mantine/core';
import ProposalLevel from './ProposalLevel';
import ProposalExperience from './ProposalExperience';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function ProposalCard({ proposal, setProposals, visible, setVisible }) {

    const axiosPrivate = useAxiosPrivate();

    const handleSkillProposal = async (proposal_response) => {
        setVisible(true);
        try {
            const response = await axiosPrivate.put('skills/proposal',
                JSON.stringify({
                    user_id: proposal.user_id,
                    skill_id: proposal.skill_id,
                    proposal: proposal_response
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            console.log('Proposal response:', response.data);

            setProposals(response.data)

        } catch (error) {
            console.error('Error fetching updating skill:', error);
        }
        setVisible(false);
    }

    const handleProjectProposal = async (proposal_response) => {
        // setVisible(true);

        const action = proposal_response ? "Accept" : "Reject"

        try {
            const response = await axiosPrivate.post('projects/manage_proposal',
                JSON.stringify({
                    assignment_id: proposal.assignment_id,
                    action: action,
                    type: "Assignment" // hardcodatat
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            console.log('Proposal response:', response.data);

            setProposals(response.data)

        } catch (error) {
            console.error('Error responding to proposal:', error);
        }
        // setVisible(false);
    }


    return (
        <div className="w-full rounded-lg bg-white p-4 my-2 select-none">
            {proposal.skill_id != 'None' && (
                <>
                    <p className="text-[17px] text-darkcanvas pb-5"><span className="font-bold">{proposal.user_name}</span> wishes to {proposal.type == "put" ? "update" : "create"} his <span className="font-bold">{proposal.skill_name}</span> skill</p>
                    <ProposalLevel level={proposal.level} />
                    <ProposalExperience experience={proposal.experience} />
                    <Button className="w-[170px] mr-[5px] bg-[#1CB85C] mt-[10px]" onClick={() => handleSkillProposal(true)}>Confirm</Button>
                    <Button className="w-[170px] ml-[5px] bg-accent mt-[10px]" onClick={() => handleSkillProposal(false)}>Reject</Button>
                </>
            )}
            {proposal.role_ids != null && (
                <>
                    <p className="text-[17px] text-darkcanvas"><span className="font-bold">{proposal.user_name}</span> has been proposed to join <span className="font-bold">{proposal.project_name}</span></p>
                    <p className="text-[13px] text-darkcanvas">
                        He has been assigned to work as <span className="font-bold">{proposal.role_name}</span> for <span className="font-bold">{proposal.work_hours}</span> hours a day. <span className="font-bold">{proposal.project_manager}</span> sent the comment: "{proposal.comment}"
                    </p>
                    <Button className="w-[170px] mr-[5px] bg-[#1CB85C] mt-[10px]" onClick={() => handleProjectProposal(true)}>Confirm</Button>
                    <Button className="w-[170px] ml-[5px] bg-accent mt-[10px]" onClick={() => handleProjectProposal(false)}>Reject</Button>
                </>
            )}
        </div >
    )

}
