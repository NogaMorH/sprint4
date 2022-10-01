import { CoverModal } from "./cover-modal"
import { AttachmentModal } from "./attachment-modal"
import { ChecklistModal } from "./checklist-modal"
import { DatesModal } from "./dates-modal"
import { LabelsModal } from "./labels-modal"
import { MembersModal } from "./members-modal"
import { IoCloseOutline } from 'react-icons/io5'
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { HiCheck } from 'react-icons/hi'
import { useDispatch } from "react-redux"
import { updateTask } from "../../store/board/board.actions"

export const DynamicModal = ({ type, groupId, taskId, closeModal, className }) => {

    const component = () => {
        switch (type) {
            case 'members':
                return MembersModal
            case 'labels':
                return LabelsModal
            case 'checklist':
                return ChecklistModal
            case 'dates':
                return DatesModal
            case 'attachment':
                return AttachmentModal
            case 'cover':
                return CoverModal
        }
    }

    return component()({
        groupId,
        taskId,
        closeModal,
        className
    })
}

export const MembersModal = ({ groupId, taskId, closeModal, className }) => {

    const board = useSelector(state => state.boardModule.board)
    const { members } = board
    let memberIds = boardService.getTask(board, groupId, taskId).membersId
    const dispatch = useDispatch()

    const toggleMember = (id) => {
        if (!memberIds) {
            memberIds = [id]
        }
        else if (memberIds.includes(id)) {
            const idx = memberIds.indexOf(id)
            memberIds.splice(idx, 1)
        } else {
            memberIds.push(id)
        }
        dispatch(updateTask(groupId, taskId, 'memberIds', memberIds))
    }

    function updateTask(groupId, taskId, key, value) {
        return async (dispatch, getState) => {
            try {
                const board = getState().boardModule.board
                let task = boardService.getTask(board, groupId, taskId)
                task = { ...task, [key]: value }
                const updatedBoard = await boardService.saveTask(board, groupId, task)
                dispatch({ type: 'UPDATE_BOARD', updatedBoard })
            } catch (err) {
                console.error('Update task in board actions has failed:', err)
            }
        }
    }

















    return (
        <div className={`dynamic-modal members-modal ${className ? className : ''}`}
            onClick={(ev) => ev.stopPropagation()}>

            <div className="dynamic-header">
                <h5>Members</h5>
                <span onClick={closeModal}><IoCloseOutline /></span>
            </div>

            <div className="dynamic-content">
                <input className="dynamic-input" type="text" placeholder="Search members" ref={ref}
                    value={name} onChange={filter} />

                <div className="members">
                    {members &&
                        (foundUsers?.length > 0
                            ?
                            <ul className="members-list">
                                <h6>Board members</h6>

                                {foundUsers.map(member => {
                                    // temporary - member.id instead of member._id
                                    const { id, fullname, imgUrl } = member
                                    // const { _id, fullname, imgUrl } = member

                                    return (
                                        // temporary - member.id instead of member._id
                                        <li key={id} onClick={() => toggleMember(id)}>
                                            <img src={imgUrl} title={fullname} alt="user-avatar" />
                                            <span className="fullname">{fullname}</span>
                                            {memberIds && memberIds.includes(id) && <span className="icon-check">
                                                <HiCheck />
                                            </span>}
                                        </li>
                                        // <li key={_id} onClick={() => toggleMember(_id)}>
                                        //     <img src={imgUrl} title={fullname} alt="user-avatar" />
                                        //     <span className="fullname">{fullname}</span>
                                        //     {memberIds && memberIds.includes(_id) && <span className="icon-check">
                                        // <HiCheck />
                                        // </span>}
                                        // </li>
                                    )
                                })}
                            </ul>
                            :
                            <p>
                                Looks like that person isn't a member yet. Enter their email address to add them to
                                the card and board.
                            </p>
                        )}

                    {!members && <p>There are no available members in this board.</p>}
                </div>

                {foundUsers?.length > 0 && <button>Show other Workspace members</button>}
            </div>
        </div>
    )
}