import { hover } from "@testing-library/user-event/dist/hover"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadBoards, setBoardIsStarred, updateBoard } from "../store/board/board.actions"
import { RiStarLine, RiStarSFill } from 'react-icons/ri'
import { AiOutlineClockCircle } from "react-icons/ai"
import { AddBoardModal } from "../cmps/template-page/add-board-modal"

export const TemplatePage = () => {

    const boards = useSelector(state => state.boardModule.boards)
    const dispatch = useDispatch()
    const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false)

    useEffect(() => {
        // console.log('miniBoards:', boards)
        onLoadBoards()

    }, [])

    useEffect(() => {
        onGetStarredBoards()
    }, [boards])

    const onLoadBoards = () => {
        dispatch(loadBoards())

    }

    const toggleIsStarred = (ev, board) => {
        ev.stopPropagation()
        ev.preventDefault()
        dispatch(setBoardIsStarred(board))
        onLoadBoards()
    }

    const toggleAddBoardModal = () => {
        console.log('isAddBoardModalOpen:', isAddBoardModalOpen)
        setIsAddBoardModalOpen(!isAddBoardModalOpen)
    }

    const onGetStarredBoards = () => {
        const starredBoards = boards.filter(board => board.isStarred)
        // console.log('starredBoards:', starredBoards)
        return starredBoards
    }
    // { console.log('getStarredBoards().length:', getStarredBoards().length) }

    if (!boards) return <div>Loading...</div>
    return (
        <div className="board-list-container">
            {onGetStarredBoards().length > 0 &&
                <div className="sttared-board-container">
                    <div className="board-list-title-container">
                        <span className="board-list-title-icon"> <RiStarLine /></span>
                        <span className="board-list-title">Starred boards
                        </span>
                    </div>
                    <ul className="board-list">
                        {onGetStarredBoards().map(board => {
                            return <Link to={`/board/${board._id}`} key={board._id}>
                                <li className="board-preview">
                                    <div className="board-preview-details">
                                        <span className="board-title">{board.title}</span>
                                        <span className="starred" onClick={(ev) => toggleIsStarred(ev, board)}><RiStarSFill /></span>
                                    </div>
                                </li>
                            </Link>
                        })}
                    </ul>
                </div>}
            <section className="all-boards">
                <div className="board-list-title">
                    <div className="board-list-title-container">
                        <span className="board-list-title-icon"><AiOutlineClockCircle /></span>
                        <span className="board-list-title">Recently viewed</span>
                    </div>
                    {/* <h4>YOUR WORKSPACES</h4> */}
                </div>
                <ul className="board-list">
                    {boards.map(board => {
                        return <Link to={`/board/${board._id}`} key={board._id}>
                            <li className="board-preview">
                                <div className="board-preview-details">
                                    <span className="board-title">{board.title}</span>
                                    {board.isStarred &&
                                        <span className="starred" onClick={(ev) => toggleIsStarred(ev, board)}>
                                            <RiStarSFill />
                                        </span>}
                                    {!board.isStarred &&
                                        <span className="unstarred" onClick={(ev) => toggleIsStarred(ev, board)}>
                                            <RiStarLine />
                                        </span>}
                                </div>
                            </li>
                        </Link>
                    })}
                    <li className="add-board" onClick={toggleAddBoardModal}>
                        <div className="add-board-title">Create new board</div>
                    </li>
                </ul>
                {isAddBoardModalOpen && <AddBoardModal toggleAddBoardModal={toggleAddBoardModal} />}
            </section >
        </div >
    )
}

// miniBoard.map(miniBoard =>{
//     return <link to={`board/${board_.id}`} key={board_.id/ miniBoard.id} >
        //each <li> should render the mini board background image, miniBoard.title
        //todo: create a isStarred
// </Link>
// }) 

//star notes: 
// outline star shows when hover- comes in transition
//todo: toggleIsStarred func


//miniBoard = {
// id: mb101,
// title: title,
// background: image url,
// isStarred: false,
// }

//toggleIsStarred = (ev, miniBoard) => {
// ev.stopPropagation()
// miniBoard.isStarred = !miniBoard.isStarred
// dispatch(updateMiniBoard(miniBoard))   ???????
// }
