import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { updateTask } from "../../store/board/board.actions"
import { uploadImg } from "../../services/cloudinary-service"
import { IoCloseOutline } from "react-icons/io5"

export const CoverModal = ({ taskId, groupId, closeModal, className }) => {

    const board = useSelector(state => state.boardModule.board)
    const { cover, attachments } = boardService.getTask(board, groupId, taskId)
    const dispatch = useDispatch()

    const onSetCover = (ev, value) => {
        let key = ev.target.className === 'color' ? 'color' : 'img'

        if (cover?.color === value || cover?.img === value) {
            if (attachments) setAttachmentIsCover()
            return dispatch(updateTask(groupId, taskId, 'cover', null))
        }

        dispatch(updateTask(groupId, taskId, 'cover', { [key]: value }))
        if (attachments) setAttachmentIsCover(value)
    }

    const onImgUpload = async (ev) => {
        const imgUrl = await uploadImg(ev)
        const attachment = {
            name: 'Attachment',
            url: imgUrl,
            isCover: true,
            time: Date.now()
        }

        if (attachments) setAttachmentIsCover()
        else attachments = []

        attachments.unshift(attachment)
        dispatch(updateTask(groupId, taskId, 'attachments', attachments))
        dispatch(updateTask(groupId, taskId, 'cover', { img: imgUrl }))
    }

    const setAttachmentIsCover = (value) => {
        attachments.map(attachment => {
            if (value === attachment.url) return attachment.isCover = true
            return attachment.isCover = false
        })

        dispatch(updateTask(groupId, taskId, 'attachments', attachments))
    }

    return (
        <div
            className={`dynamic-modal cover-modal ${className ? className : "details-pos"}`}
            onClick={(ev) => ev.stopPropagation()}
        >
            <div className="dynamic-header">
                <h5>Cover</h5>
                <IoCloseOutline className="icon-close" onClick={closeModal} />
            </div>

            <div className="dynamic-content">
                <h6>Colors</h6>

                <div className="color-palette">
                    {colorPalette.map((color, idx) => {
                        return (
                            <div key={idx}
                                className="color"
                                style={{ background: `${color}` }}
                                onClick={(ev) => onSetCover(ev, color)}
                            />
                        )
                    })}
                </div>

                <h6>Attachments</h6>

                <div className="img-list">
                    {attachments.map((attachment, idx) => {
                        const { url } = attachment

                        if (!utilService.checkURL(url)) return
                        return (
                            <img key={idx} src={url} alt="img" onClick={(ev) => onSetCover(ev, url)} />
                        )
                    })}
                </div>

                <button className="img-upload">
                    Upload a cover image
                    <input type="file" onChange={onImgUpload} />
                </button>

                <h6>Photos from Unsplash</h6>

                <div className="img-list">
                    {imgs.map((img, idx) => {
                        return (
                            <img key={idx} src={`${img}`} alt="img" onClick={(ev) => onSetCover(ev, img)} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const colorPalette = ['#7bc86c', '#f5dd2a', '#fbaf40', '#ef7564', '#cd8de5', '#5ba3cf', '#37cce5', '#6deca8', '#fa8ed5', '#172b4d']
const imgs = [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya2Zsb3d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1665846642250-42176327f0a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2067&q=80'
]