import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Motivation from '../Components/Motivation'
import Slider from '../Components/Slider'
import Aboutme from '../Components/Aboutme'

export default function(){
  return(
    <>
        <Navbar/>
        <Slider/>
        <Motivation/>
        <Aboutme/>
        <Footer/>
    </>
  )
}