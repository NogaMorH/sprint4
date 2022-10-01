import { Link } from 'react-router-dom'
import  demonstrationImg  from  '../../assets/img/home-demonstration.png'


export const HomeDemonstration = () => {



    return (
        <section className="domonstration-container">
            <div className="demonstation-content">
                <h2 className="demonstration-title">It's more than work. It's a way of working together</h2>
                <p className="demonstration-paragraph">Start with a Rello board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.</p>
               <Link to='/template' className='btn primary-home'>Start doing</Link> 
            </div>
            <div className="demonstration-img">
                <img src={demonstrationImg} alt="Rello-board-image" />
            </div>
        </section>
    )
}