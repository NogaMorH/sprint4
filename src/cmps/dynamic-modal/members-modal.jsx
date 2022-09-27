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
    const [name, setName] = useState('')
    const [foundUsers, setFoundUsers] = useState(members)
    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    const filter = ({ target }) => {
        const keyword = target.value

        if (members && keyword !== '') {
            const results = members.filter(member => {
                return member.fullname.toLowerCase().startsWith(keyword.toLowerCase())
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
        <div className={`dynamic-modal members-modal ${className ? className : ''}`} onClick={(ev) => ev.stopPropagation()}>

            <div className="dynamic-header">
                <h5>Members</h5>
                <span onClick={closeModal}><IoCloseOutline /></span>
            </div>

            <div className="dynamic-content">
                <input className="dynamic-input" type="text" placeholder="Search members" ref={ref} value={name} onChange={filter} />

                <div className="members">
                    {members &&
                        (foundUsers && foundUsers.length > 0
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
                                            {memberIds && memberIds.includes(id) && <span className="icon-check"><HiCheck /></span>}
                                        </li>
                                        // <li key={_id} onClick={() => toggleMember(_id)}>
                                        //     <img src={imgUrl} title={fullname} alt="user-avatar" />
                                        //     <span className="fullname">{fullname}</span>
                                        //     {memberIds && memberIds.includes(_id) && <span className="icon-check"><HiCheck /></span>}
                                        // </li>
                                    )
                                })}
                            </ul>
                            :
                            <p>
                                Looks like that person isn't a member yet. Enter their email address to add them to the card and board.
                            </p>
                        )}

                    {!members && <p>There are no available members in this board.</p>}
                </div>

                {foundUsers && foundUsers.length > 0 && <button>Show other Workspace members</button>}
            </div>
        </div>
    )
}