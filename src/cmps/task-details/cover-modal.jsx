import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateTask } from "../../store/board/board.actions"

export const CoverModal = ({ taskId, groupId }) => {

    const dispatch = useDispatch()
    const coverColors = ['#7bc86c', '#f5dd2a', '#fbaf40', '#ef7564', '#cd8de5', '#5ba3cf', '#37cce5', '#6deca8', '#fa8ed5', '#172b4d']
    const coverImgs = [
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80'
        , 'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya2Zsb3d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
    ]
    const onSetCover = (ev, value) => {
        ev.stopPropagation()
        let key = ev.target.className === 'color-preview' ? 'color' : 'img'
        console.log('ev:', ev)
        dispatch(updateTask(groupId, taskId, 'cover', { [key]: value }))
    }

    return (
        <section className="cover-modal-container">
            <div className="cover-modal-title">Cover</div>
            <ul className="color-list">
                {coverColors.map((color, idx) => {
                    return <li className="color-preview" key={idx}
                        style={{ background: `${color}` }} onClick={(ev) => onSetCover(ev, color)} >
                    </li>
                })}
            </ul>
            <section className="image-list-container">
                <ul className="img-list">
                    {coverImgs.map((imgUrl, idx) => {
                        return <li className="cover-img-container" key={idx}>
                            <img className="img-preview" src={`${imgUrl}`} onClick={(ev) => onSetCover(ev, imgUrl)} />
                        </li>
                    })}
                </ul>
            </section>
        </section >
    )
}

// onClick={(ev) => onSetCoverImg