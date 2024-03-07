/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Card, Title, Button } from '@mantine/core';
import ProposalLevel from './ProposalLevel';
import ProposalExperience from './ProposalExperience';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';



export default function ProposalCard({ proposal, setProposals }) {

    const axiosPrivate = useAxiosPrivate();

    const handleResponse = async (proposal_response) => {
        console.log(
            JSON.stringify({
                user_id: proposal.user_id,
                skill_id: proposal.skill_id,
                proposal: proposal_response
            }))

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
    }

    return (
        <div className="w-full rounded-lg bg-white p-4 my-2 select-none">
            <p className="text-[17px] text-darkcanvas pb-5"><span className="font-bold">{proposal.user_name}</span> wishes to {proposal.type == "put" ? "update" : "create"} his <span className="font-bold">{proposal.skill_name}</span> skill</p>
            <ProposalLevel level={proposal.level} />
            <ProposalExperience experience={proposal.experience} />
            <Button className="w-[170px] mr-[5px] bg-[#1CB85C] mt-[10px]" onClick={() => handleResponse(true)}>Confirm</Button>
            <Button className="w-[170px] ml-[5px] bg-accent mt-[10px]" onClick={() => handleResponse(false)}>Reject</Button>
        </div >
    )

}
