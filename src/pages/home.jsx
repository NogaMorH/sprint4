// import { AppFooter } from '../cmps/app-footer'
// import { HomeDemonstration } from '../cmps/home/home-demonstration'
import { HomeHeader } from '../cmps/home/home-header'
import { HomeHero } from '../cmps/home/home-hero'

export const Home = () => {

    return (
        <div className='home-layout home'>
            <HomeHeader />
            <HomeHero />
            {/* <HomeDemonstration /> */}
            {/* <AppFooter /> */}
        </div>
    )
}
