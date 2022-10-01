import features1 from '../../assets/img/features-1.svg'
import features2 from '../../assets/img/features-2.svg'

export const HomeFeatures = () => {
    return (
        <section className="home-features-container">
            <div className="home-features-content">
                <h2 className="features-title">Features to help your team succeed</h2>
                <p className="features-main-paragraph">Powering a productive team means using a powerful tool (and plenty of snacks). From meetings and projects to events and goal setting, Trellos intuitive features give any team the ability to quickly set up and customize workflows for just about anything.</p>
            </div>
            <div className="features-details-container">
                <div className="feature1-container">
                    <div className="feature-img">
                        <img src={features1} alt="" />
                    </div>
                    <div className="feature-content">
                        <h4 className="feature-title">Dive into the details</h4>
                        <h2 className="features-title">Cards contain everything you need</h2>
                        <p className="feature-paragraph">Lists and cards are the building blocks of organizing work on a Trello board. Grow from there with task assignments, timelines, productivity metrics, calendars, and more.</p>
                    </div>
                </div>
                <div className="feature2-container">
                    <div className="feature-content">
                        <h4 className="feature-title">Choose a view</h4>
                        <h2 className="features-title">The board is just the beginning</h2>
                        <p className="feature-paragraph">Trello cards are your portal to more organized work—where every single part of your task can be managed, tracked, and shared with teammates. Open any card to uncover an ecosystem of checklists, due dates, attachments, conversations, and more.</p>
                    </div>
                    <div className="feature-img">
                        <img src={features2} alt="" />
                    </div>
                </div>
            </div>

        </section>
    )
}