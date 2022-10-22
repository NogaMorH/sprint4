import { useEffect, useRef, useState } from "react"
import { IoCloseOutline } from 'react-icons/io5'
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { HiCheck } from 'react-icons/hi'
import { useDispatch } from "react-redux"
import { updateTask } from "../../store/board/board.actions"

export const MembersModal = ({ groupId, taskId, closeModal, className }) => {

    const board = useSelector(state => state.boardModule.board)
    const { members } = board
    let { memberIds } = boardService.getTask(board, groupId, taskId)
    const [foundUsers, setFoundUsers] = useState(members)
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    const filter = ({ target }) => {
        const keyword = target.value

        if (members && keyword !== '') {
            const results = members.filter(member => {
                return member.fullName.toLowerCase().startsWith(keyword.toLowerCase())
            })
            setFoundUsers(results)
        } else {
            setFoundUsers(members)
        }
        setName(keyword)
    }

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

    return (
        <div
            className={`dynamic-modal members-modal ${className ? className : ''}`}
            onClick={(ev) => ev.stopPropagation()}
        >
            <div className="dynamic-header">
                <h5>Members</h5>
                <IoCloseOutline className="icon-close" onClick={closeModal} />
            </div>

            <div className="dynamic-content">
                <input
                    className="dynamic-input"
                    type="text"
                    placeholder="Search members"
                    ref={ref}
                    value={name} onChange={filter}
                />

                {members &&
                    (foundUsers?.length > 0
                        ?
                        <ul className="member-list">
                            <h6>Board members</h6>

                            {foundUsers.map(member => {
                                const { _id, fullName, imgUrl } = member

                                return (
                                    <li key={_id} onClick={() => toggleMember(_id)}>
                                        <img src={imgUrl} title={fullName} alt="user-avatar" />
                                        <span className="fullname">{fullName}</span>

                                        {memberIds && memberIds.includes(_id) &&
                                            <span className="icon-check">
                                                <HiCheck />
                                            </span>
                                        }
                                    </li>
                                )
                            })}
                        </ul>
                        :
                        <p>
                            Looks like that person isn't a member yet. Enter their email address to add them to
                            the card and board.
                        </p>
                    )
                }

                {!members && <p>There are no available members in this board.</p>}

                {foundUsers?.length > 0 && <button>Show other Workspace members</button>}
            </div>
        </div>
    )
}