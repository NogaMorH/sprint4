import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GroupPreview } from './group-preview'
import { setIsFormAddOpen } from '../../store/board/board.actions'
import { FormAdd } from './form-add'

export const GroupList = ({ groups }) => {
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const dispatch = useDispatch()


    const onAddGroup = () => {
        dispatch(setIsFormAddOpen(null, true))

    }

    if (!groups) return <div>Loading....</div>
    return (
        <div className="group-list flex">
            {groups.map(group =>
                <GroupPreview key={group.id} group={group} />)}
            {formAdd.isAddGroup
                ? <FormAdd />
                : <button className='btn btn-add-group' onClick={onAddGroup}>Add another list</button>
            }
        </div>
    )
}
