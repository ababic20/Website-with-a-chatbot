import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Motivation from '../Components/Motivation'
import Slider from '../Components/Slider'
import AboutLodz from '../Components/AboutLodz'
import Cities from '../Components/Cities'

export default function(){
  return(
    <>
        <Navbar/>
        <Slider/>
        <Motivation/>
        <AboutLodz/>
        <Cities/>
        <Footer/>
    </>
  )
}