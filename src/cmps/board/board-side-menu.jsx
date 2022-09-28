import { useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { TbList } from "react-icons/tb"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { Activities } from "./activities"
import { BoardBgColorList } from "./board-bg-color-list"
import { BoardBgImgList } from "./board-bg-img-list"

export const BoardSideMenu = () => {
    const [isBgImgListOpen, setBgImgListOpen] = useState(false)
    const [isBgColorListOpen, setBgColorListOpen] = useState(false)

    const openBgPicker = (type) => {
        if (type === 'img') setBgImgListOpen(true)
        else if (type === 'color') setBgColorListOpen(true)
    }

    const board = useSelector(state => state.boardModule.board)
    const { activities } = board
    return (
        <section className="board-side-menu-container">
            {!isBgImgListOpen && !isBgColorListOpen &&
                <div className="board-side-menu-content">
                    <div className="menu-header">
                        <h3 className="menu-header-title">Menu</h3>
                        <span className="btn-close-menu"><IoCloseOutline /></span>
                    </div>
                    <div className="menu-main-content">
                        <button className="btn-menu-action">Filter cards</button>
                        <div className="board-background-section">
                            <div className="board-bg-img-tile" onClick={() => openBgPicker('img')}>
                                <div className="img-container" ></div>
                                <div className="bg-tile-title" >Photos</div>
                            </div>
                            <div className="board-bg-color-tile" onClick={() => openBgPicker('color')}>
                                <div className="img-container"></div>
                                <div className="bg-tile-title">Colors</div>
                            </div>
                        </div>
                        <h5 className="btn-activity"><span><TbList className="activity-list-icon" /></span> Activities</h5>
                        {activities && <Activities />}
                    </div>
                </div>}
                {isBgImgListOpen && <BoardBgImgList /> }
                {isBgColorListOpen && <BoardBgColorList />}
        </section>
    )


}