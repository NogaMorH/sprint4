import { boardService } from "../../services/board.service"
import { TaskFilter } from "./task-filter"

export const BoardHeader = ({ board }) => {

    const { memberIds } = board.members
    console.log('memberIds:', memberIds)
    if (!board) return
    return (
        <nav className="board-header">
            <span className="board-title">{board.title}</span>
            <button>{board.createdBy.fullname}</button>
            <span className="member-avatar">
                {board.members.memberIds && board.members.memberIds.map(memberId => (
                    <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)} alt="profile img" />
                ))}
            </span>
            <span><TaskFilter /></span>
            <button className="btn">Filter</button>

            <span><button>... Show menu</button></span>

        </nav>
    )
}