import { useSelector } from 'react-redux'


export const TaskPreview = ({ task }) => {
    const board = useSelector(state => state.boardModule.board)

    // const [shown, setShown] = useState(false)
    // return (
    //   <>
    //     <button on:click={() => setShown(!shown)}/>
    //     {shown ? <TextArea/> : <WithoutTextArea/>}
    //   </>
    // );

    if (!task) return
    return (
        <section className="task-preview-container">
            <div className='task-preview'>

                <h4 className='task-title'>{task.title}</h4>
                

                <div className="task-badge">
                    {/* <span>{formatTime(task.dueDate)}</span> */}
                    {/* {task.memberIds.map(memberId => (
                    <img key={memberId} src={getMemberImgUrl(memberId)} width="50" />
                ))} */}
                </div>

            </div>
        </section>
    )
}