import { IoCloseOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateBoard } from "../../store/board/board.actions"

export const BoardBgColorList = () => {

    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()

    const setBoardBg = (type, value) => {
        if (type === 'url') {
            board.style.bgColor = null
            board.style.imgUrl = value
        }
        else if (type === 'color') {
            board.style.imgUrl = null
            board.style.bgColor = value
        }
        console.log('imgurl:', board.style.imgUrl)
        dispatch(updateBoard(board))
        // dispatch 
        // setBoard(prevBoard => ({ ...prevBoard, style: { imgUrl, bgColor } }))
    }

    return (
        <section className="board-side-menu-container">
            <div className="board-side-menu-content">
                <div className="menu-header">
                    <h3 className="bg-picker-title">Colors</h3>
                    <span className="btn-close-menu"><IoCloseOutline /></span>
                </div>
                <ul className="board-bg-color-list">
                    {boardService.getBackground('color').map((bgColor, idx) => {
                        return <li className="board-bg-color-preview" style={{ background: `${bgColor}` }} key={idx} onClick={() => setBoardBg('color', bgColor)}>
                        </li>
                    })}
                </ul>
            </div>
        </section>
    )
}