import { useSelector } from 'react-redux'


export const TaskPreview = ({ task }) => {
    const board = useSelector(state => state.boardModule.board)


    // const getMemberImgUrl = (memberId) => {
    //     return board.members.find(member => member._id === memberId).imgUrl
    // }

    // console.log('task.memberIds:', task.memberIds)
    if (!task) return
    return (
        <ul>
            <li>
                <h4>{task.title}</h4>
                {/* <span>{formatTime(task.dueDate)}</span> */}
                {/* {task.memberIds.map(memberId => (

                    <img key={memberId} src={getMemberImgUrl(memberId)} width="50" />
                ))} */}
            </li>
        </ul>
    )
}