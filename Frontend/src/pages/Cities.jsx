import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Icon from '../Components/AIAssistant/icon'
import Cities from '../Components/Cities/Cities'
import ScrollToTopButton from '../Components/ScrollToTopButton'

export default function(){
  return(
    <>
        <Navbar/>
        <Icon/>
        <Cities/>
        <ScrollToTopButton/>
        <Footer/>
    </>
  )
}