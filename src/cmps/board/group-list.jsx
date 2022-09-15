import { GroupPreview } from './group-preview'

export const GroupList = ({ groups }) => {
    console.log('groups:', groups)
    if (!groups) return <div>Loading....</div>
    return (
        <div className="group-list">
            <article className="group-preview flex column">
                {groups.map(group =>
                    <GroupPreview key={group.id} group={group} />)}
            </article>
        </div>
    )
}