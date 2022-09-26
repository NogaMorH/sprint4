import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { useDispatch } from "react-redux"
import { useFormRegisterBase } from "../../hooks/useFormRegisterBase"
import { IoCloseOutline } from "react-icons/io5"

export const AddBoardModal = ({ toggleAddBoardModal }) => {

    const dispatch = useDispatch
    // const [board, register] = useFormRegisterBase({
    //     title: '',
    //     style: {
    //         background: ''
    //     }
    // })

    const onAddBoard = () => {
        // dispatch(addBoard)
        console.log('add board from cmp:')
    }

    const bgImgUrls = [
        "https://images.unsplash.com/photo-1549608276-5786777e6587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1477&q=80"
    ]

    const bgColors = ['#1f79bf', '#d29033', '#51983a', '#b04632', '#89609e', '#cd5a91']


    const setBoardBg = (type, value) => {
        let newBoard
        if (type === 'url') {
            newBoard.style.background = value
        } else if (type === 'color') {
            newBoard.style.background = value
        }
    }

    return (
        <section className="add-board-modal">
            <div className="add-board-modal-title-container">
                <h5 className="add-board-modal-title">Create board</h5>
                <span onClick={toggleAddBoardModal} className="btn-close-add-board-modal"><IoCloseOutline /></span>
            </div>
            <div className="add-board-modal-content">
                <div className="board-display-img-container">
                    <div className="board-display-img">
                        <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="board-displat-image" />
                    </div>
                </div>
                <div className="bg-picker-container">
                    <div className="bg-picker-title">Background</div>
                    <ul className="bg-img-list">
                        {bgImgUrls.map((bgImgUrl, idx) => {
                            return <li key={idx} className="bg-img-preview" onClick={() => setBoardBg('url', bgImgUrl)}>
                                     <img className="img-preview" src={`${bgImgUrl}`}/>
                            </li>
                        })}
                    </ul>
                    <ul className="bg-color-list">
                        {bgColors.map((bgColor, idx) => {
                            return <li key={idx} className="bg-color-preview" style={{ background: `${bgColor}` }} onClick={() => setBoardBg('color', bgColor)}>
                            </li>
                        })}
                    </ul>
                </div>
                {/* <form onSubmit={onAddBoard}>
                    <label htmlFor="title">Board title *</label>
                    <input {...register('title', 'text')}>

                    </input>




                </form> */}
            </div>
        </section>
    )
}