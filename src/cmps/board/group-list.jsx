import { GroupPreview } from './group-preview'

export const GroupList = ({ groups }) => {
    if (!groups) return <div>Loading....</div>
    return (
        <div className="group-list flex">
            {groups.map(group =>
                <GroupPreview key={group.id} group={group} />)}
        </div>
    )
}