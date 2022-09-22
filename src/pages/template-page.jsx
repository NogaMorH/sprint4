import { hover } from "@testing-library/user-event/dist/hover"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export const TemplatePage = () => {

    // const miniBoards = useSelector(state => state.boardModule.miniBoards)


    // useEffect(() => {
    //     onLoadBoards
    // },[])

    // const onLoadBoards = () => {
    //     try {
    //         dispatch(loadBoards())
    //     } catch (err) {
    //         console.log('Cannor load boards:')
    //     }
    // }

    return (
        <div className="board-list-container">
           <div className="board-list-title">
            <span className="board-list-title-icon">Star / User</span>
            <h4>YOUR WORKSPACES</h4>
           </div>
           <ul className="board-list">
            
           </ul>
        </div>
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
