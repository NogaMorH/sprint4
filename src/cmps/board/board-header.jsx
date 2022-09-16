export const BoardHeader = ({ board }) => {


    if (!board) return
    return (
        <nav className="board-header">
            {/* <span><button>{board.createdBy.fullname}</button></span> */}
            <span className="board-title">{board.title}</span>

            <span><button>... Show menu</button></span>

        </nav>
    )
}