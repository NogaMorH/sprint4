import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLessThan } from '@fortawesome/free-solid-svg-icons'
import { IoCloseOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateBoard } from "../../store/board/board.actions"
import { BiTask } from "react-icons/bi"

export const BoardBgImgList = () => {

    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()

    const setBoardBg = (type, value) => {
        let imgUrl
        let bgColor
        if (type === 'url') {
            imgUrl = value
            bgColor = null
            board.style.imgUrl = imgUrl
        }
        else if (type === 'color') {
            bgColor = value
            imgUrl = null
            board.style.bgColor = bgColor
        }
        dispatch(updateBoard(board))
    }

    return (
        <section className="board-side-menu-content">
            <div className="menu-header">
                <h3 className="bg-picker-title">Photos by <span className="unsplash">Unsplash</span></h3>
            </div>
            <div className="bg-options-container">
                <ul className="board-bg-img-list">
                    {boardService.getBoardBackground('url').map((bgImgUrl, idx) => {
                        return <li className="bg-img-preview" key={idx} onClick={() => setBoardBg('url', bgImgUrl)}>
                            <img className="board-bg-img-preview" src={bgImgUrl} />
                        </li>
                    })}
                </ul>
            </div>
        </section>
    )
}

// {task.checkLists.map(checkList => {
//     return checkList 
// })}