import { hover } from "@testing-library/user-event/dist/hover"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadBoards, updateBoard } from "../store/board/board.actions"
import { RiStarLine, RiStarSFill } from 'react-icons/ri'

export const TemplatePage = () => {

    const boards = useSelector(state => state.boardModule.boards)

    const dispatch = useDispatch()

    useEffect(() => {
        onLoadBoards()
        console.log('miniBoards:', boards)
    }, [])

    useEffect(() => {
        getStarredBoards()
    } ,[boards])

    const onLoadBoards = () => {
        try {
            dispatch(loadBoards())
        } catch (err) {
            console.log('Cannor load boards:')
        }
    }

    const toggleIsStarred = (ev, board) => {
        ev.stopPropagation()
        ev.preventDefault()
        board.isStarred = !board.isStarred
        // dispatch(updateBoard(board))
    }

    const getStarredBoards = () => {
        const starredBoards = boards.filter(board => board.isStarred)
        console.log('starredBoards:', starredBoards)
        return starredBoards
    }

    if (!boards) return <div>Loading...</div>
    return (
        <div className="board-list-container">
            <div className="board-list-title">
                <span className="board-list-title-icon">Star / User</span>
                <h4>YOUR WORKSPACES</h4>
            </div>
            {/* {starredBoards && } */}
            <ul className="board-list">
                {boards.map(board => {
                    return <Link to={`/board/${board._id}`} key={board._id}>
                        <li className="board-preview">
                            <div className="board-preview-details">
                                <div className="board-title">{board.title}</div>
                                {board.isStarred &&
                                    <div className="starred" onClick={(ev) => toggleIsStarred(ev, board)}>
                                        <RiStarSFill />
                                    </div>}
                                {!board.isStarred &&
                                    <div className="unsttared" onClick={(ev) => toggleIsStarred(ev, board)}>
                                        <RiStarLine />
                                    </div>}
                            </div>
                        </li>
                    </Link>
                })}
            </ul>
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
