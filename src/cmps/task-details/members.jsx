import { boardService } from "../../services/board.service"

export const Members = ({ board, memberIds }) => {

    return (
        <div className="members">
            <h6>Members</h6>
            <div className="members-profile-img">
                {memberIds.map(memberId => (
                    <img key={memberId} src={boardService.getMemberImgUrl(board, memberId)} alt="profile img" />
                ))}
            </div>
        </div>
    )
}