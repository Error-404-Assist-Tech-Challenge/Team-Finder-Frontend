import ProposedMemberCard from "./ProposedMemberCard"

export default function ProposedMembersComp({ proposedMembers, available_roles, project_id }) {
    return (
        <>
            {proposedMembers.map((employee, index) => (
                <ProposedMemberCard key={index} employee={employee} available_roles={available_roles} project_id={project_id} />
            ))}
        </>
    )
}