// import { AppFooter } from '../cmps/app-footer'
import { HomeDemonstration } from '../cmps/home/home-demonstration'
import { HomeFeatures } from '../cmps/home/home-features'
import { HomeHeader } from '../cmps/home/home-header'
import { HomeHero } from '../cmps/home/home-hero'

export const Home = () => {

    return (
        <div className='home-layout home'>
            <HomeHeader />
            <HomeHero />
            <HomeDemonstration />
            <HomeFeatures />
            {/* <AppFooter /> */}
        </div>
    )
}
