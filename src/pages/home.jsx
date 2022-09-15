import { AppFooter } from '../cmps/app-footer'
import { HomeDemonstration } from '../cmps/home/home-demonstration'
import { HomeHero } from '../cmps/home/home-hero'

export const Home = () => {

    return (
        <div className='main-layout home'>
            <HomeHero />
            <HomeDemonstration />
            <AppFooter />
        </div>
    )
}
