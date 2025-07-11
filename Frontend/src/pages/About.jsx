import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Icon from '../Components/AIAssistant/icon'
import About from '../Components/About/About'
import Reviews from '../Components/Reviews/Reviews'
import ScrollToTopButton from '../Components/ScrollToTopButton'
import HeroLodz from '../Components/Hero/Hero'


export default function(){
  return(
    <>
        <Navbar/>
        <Icon />
        <HeroLodz/>
        <About/>
        <Reviews/>  
        <ScrollToTopButton/>
        <Footer/>
    </>
  )
}