import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Motivation from '../Components/Motivation'
import Slider from '../Components/Slider'
import AboutLodz from '../Components/AboutLodz'
import Cities from '../Components/Cities'
import Help from '../Components/Help'
import Icon from '../Components/AIAssistant/icon'

export default function(){
  return(
    <>
        <Navbar/>
        <Slider/>
        <Motivation/>
        <AboutLodz/>
        <Cities/>
        <Icon/>
        <Help/>
        <Footer/>
    </>
  )
}