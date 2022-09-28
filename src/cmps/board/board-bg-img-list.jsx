import { IoCloseOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateBoard } from "../../store/board/board.actions"

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
            console.log('board:',board.style.imgUrl)
            dispatch(updateBoard(board))
            // dispatch 
            // setBoard(prevBoard => ({ ...prevBoard, style: { imgUrl, bgColor } }))
        }
    
    return (<section className="board-side-menu-container">
        <div className="board-side-menu-content">
            <div className="menu-header">
                <h3 className="bg-picker-title">Photos by Unsplash</h3>
                <span className="btn-close-menu"><IoCloseOutline /></span>
            </div>
            <ul className="board-bg-img-list">
                {boardService.getBackground('url').map((bgImgUrl, idx) => {
                   return <li className="bg-img-preview" key={idx} onClick={() => setBoardBg('url', bgImgUrl)}>
                        <img className="board-bg-img-preview" src={bgImgUrl} />
                    </li>
                })}
            </ul>
        </div>
    </section>
    )
}