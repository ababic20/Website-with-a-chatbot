import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Icon from '../Components/AIAssistant/icon'
import About from '../Components/About/About'
import Reviews from '../Components/Reviews/Reviews'


export default function(){
  return(
    <>
        <Navbar/>
        <Icon />
        <About/>
        <Reviews/>  
        <Footer/>
    </>
  )
}