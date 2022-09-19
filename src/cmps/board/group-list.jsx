import { useDispatch, useSelector } from 'react-redux'
import { GroupPreview } from './group-preview'
import { setIsFormAddOpen } from '../../store/board/board.actions'
import { FormAdd } from './form-add'
import { BsPlusLg } from 'react-icons/bs'


export const GroupList = ({ groups, provided }) => {
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const dispatch = useDispatch()


    const onAddGroup = () => {
        dispatch(setIsFormAddOpen(null, true))
    }


    if (!groups) return <div>Loading....</div>
    return (
        <div className="flex group-list">
            {groups.map(group =>
                <GroupPreview key={group.id} group={group} />)}
                {/* {provided.placeholder} */}
            {formAdd.isAddGroup
                ? <FormAdd />
                : <button className='btn btn-add-group' onClick={onAddGroup}>
                    <BsPlusLg className='plus-icon' />Add another list
                </button>
            }
        </div>
    )
}
