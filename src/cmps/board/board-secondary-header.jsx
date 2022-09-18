// import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
// import { setFilterBy } from "../../store/board/board.actions"
// import { TaskFilter } from "./task-filter"

export const BoardSecondaryHeader = ({ board }) => {

    // const dispatch = useDispatch()

    // const onChangeFilter = (filterBy) => {
    //     dispatch(setFilterBy(filterBy))
    //     dispatch(loadBoard())
    // }
    if (!board) return
    const { members } = board

    const getAvatarPosition = (avatarIdx) => {
        return avatarIdx * (-3)
    }

    return (
        <header className='full board-layout board-secondary-header-container'>
            <div className='board-secondary-header'>
                <div className='header-main-content'>
                    <span className="board-title">{board.title}</span>
                    <button className='btn btn-transparent creator'>{board.createdBy.fullname}</button>
                    <span className='divider'></span>
                    <span className="member-avatars">
                        {board.members && board.members.map((member, idx) => (
                            <img key={member._id} src={boardService.getMemberImgUrl(board, member._id)}
                                alt="profile img" className='member-avatar'
                                style={{ transform: `translate(${getAvatarPosition(idx)}px)` }} />
                        ))}
                    </span>
                </div>
                {/* <span><TaskFilter onChangeFilter={onChangeFilter} /></span> */}
                <div className='filter-container'>
                    {/* <button className="btn">Filter</button> */}
                    {/* <button className='btn btn-transparent'>... Show menu</button> */}
                </div>
            </div>
        </header>
    )
}