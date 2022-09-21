import { boardService } from "../../services/board.service"

export const BoardSecondaryHeader = ({ board }) => {
    if (!board) return
    // const { members } = board
    
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
            </div>
        </header>
    )
}