import Documents from '../Components/DocumentManager'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Icon from '../Components/AIAssistant/Icon'
import ScrollToTopButton from '../Components/ScrollToTopButton'

export default function(){
  return(
    <>
        <Navbar/>
        <Documents/>
        <ScrollToTopButton/>
        <Footer/>
    </>
  )
}