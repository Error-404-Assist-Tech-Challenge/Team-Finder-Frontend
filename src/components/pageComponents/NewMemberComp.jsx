/* eslint-disable react/prop-types */
import NewMemberCard from "../projectComponents/NewMemberCard"

export default function NewMemberComp({ setNewMembers, setProposedMembers, filteredMembers, available_roles, project_id }) {

    return (
        <>
            {filteredMembers.map((employee, index) => (
                <NewMemberCard key={index} employee={employee} available_roles={available_roles} project_id={project_id} setNewMembers={setNewMembers} setProposedMembers={setProposedMembers} />
            ))}
        </>

    )
}