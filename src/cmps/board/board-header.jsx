import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
// import { setFilterBy } from "../../store/board/board.actions"
// import { TaskFilter } from "./task-filter"

export const BoardHeader = ({ board }) => {

    // const dispatch = useDispatch()

    // const onChangeFilter = (filterBy) => {
    //     dispatch(setFilterBy(filterBy))
    //     dispatch(loadBoard())
    // }
    const { members } = board
    if (!board ) return
    console.log('members:', members)
    return (
        <nav className="board-header">
            <span className="board-title">{board.title}</span>
            <button>{board.createdBy.fullname}</button>
            <span className="member-avatar">
                {board.members && board.members.map(member => (
                    <img key={member._id} src={boardService.getMemberImgUrl(board, member._id)} alt="profile img" />
                ))}
            </span>
            {/* <span><TaskFilter onChangeFilter={onChangeFilter} /></span> */}
            <button className="btn">Filter</button>

            <span><button>... Show menu</button></span>

        </nav>
    )
}