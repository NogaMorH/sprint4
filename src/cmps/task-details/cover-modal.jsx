import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
import { updateTask } from "../../store/board/board.actions"
import { uploadImg } from "../../cloudinary-service"
import { IoCloseOutline } from "react-icons/io5"

export const CoverModal = ({ taskId, groupId, task, toggleCoverModal }) => {
    const dispatch = useDispatch()
    // const [isColorSelected, setColorSelected] = useState(null)
    const coverColors = ['#7bc86c', '#f5dd2a', '#fbaf40', '#ef7564', '#cd8de5', '#5ba3cf', '#37cce5', '#6deca8', '#fa8ed5', '#172b4d']
    const coverImgs = [
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80'
        , 'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya2Zsb3d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
    ]
    const onSetCover = (ev, value) => {
        ev.stopPropagation()
        if (task.cover?.color === value || task.cover?.img === value) {
            return dispatch(updateTask(groupId, taskId, 'cover', null))
        }
        let key = ev.target.className === 'color-preview' ? 'color' : 'img'
        dispatch(updateTask(groupId, taskId, 'cover', { [key]: value }))
        if (task.attachments) {
            task.attachments.map(attachment => attachment.isCover = false)
        }
    }

    const onImgUpload = async (ev) => {
        const imgUrl = await uploadImg(ev)
        const attachment = {
            name: 'Attachemnt',
            url: imgUrl,
            isCover: true
        }
        if (!task.attachments) task.attachments = []
        if (task.cover) task.cover = imgUrl
        task.attachments.unshift(attachment)
        dispatch(updateTask(groupId, taskId, 'attachments', task.attachments))
        dispatch(updateTask(groupId, taskId, 'cover', { img: imgUrl }))

    }

    return (
        <section className="dynamic-modal cover-modal-container">
            <div className="dynamic-header">
                <h4>Cover</h4>
                <span onClick={toggleCoverModal}><IoCloseOutline className="btn-close-cover-modal" /></span>
            </div>
            <div className="cover-modal-color-container">
                <h5 className="color-title">Colors</h5>
                <ul className="color-list">
                    {coverColors.map((color, idx) => {
                        return <li className="color-preview" key={idx}
                            style={{ background: `${color}` }} onClick={(ev) => onSetCover(ev, color)} >
                        </li>
                    })}
                </ul>
                <div className="upload-img-container">
                    <button className="btn img-upload">Upload a cover image
                        <input className="img-upload-btn" type="file" id='img-uplaod' onChange={onImgUpload} />
                    </button>
                </div>
            </div>
            <div className="img-list-container">
                <h5 className="img-title">Photos from unsplash</h5>
                <ul className="img-list">
                    {coverImgs.map((imgUrl, idx) => {
                        return <li className="cover-img-container" key={idx}>
                            <img className="img-preview" src={`${imgUrl}`} onClick={(ev) => onSetCover(ev, imgUrl)} />
                        </li>
                    })}
                </ul>
            </div>
        </section >
    )
}

// onClick={(ev) => onSetCoverImg