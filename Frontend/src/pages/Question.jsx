import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Question from '../Components/Question'
import Icon from '../Components/AIAssistant/Icon'
import ScrollToTopButton from '../Components/ScrollToTopButton'


export default function(){
  return(
    <>
        <Navbar/>
        <Question/>
        <ScrollToTopButton/>
        <Footer/>
    </>
  )
}