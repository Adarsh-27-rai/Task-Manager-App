import React from 'react'
import { RiTaskLine } from "react-icons/ri";


const About = () => {
  return (
    <div className='bg-gray-300 h-screen w-screen relative'>
      <div className='w-220 text-2xl p-4 font-semibold text-black bg-white border-4 border-white rounded-3xl rounded-tl-none absolute top-30 left-20 shadow-[0_0_20px_rgba(0,0,0,0.25)]'>
        Our Task Manager app is designed to help users organize their daily activities with clarity and efficiency. It provides a simple and intuitive interface where tasks can be created, edited, 
        categorized, and tracked based on priority and deadlines. Whether it's managing personal goals, school assignments, or work-related responsibilities, the app ensures that everything stays structured in one place.
        With easy navigation, responsive design, and smooth interactions, users can focus on completing their tasks rather than struggling to manage them. The goal is to boost productivity, save time, and make planning feel effortless—turning everyday to-dos into achievable steps toward success.
      </div>
      <img src="/task-icon.png" alt="png" className='h-100 absolute right-15 top-50'/>
      <img src="/8kdb39e5o0n7ocjtpfrvduecsd.png" alt="logo" className='h-14 absolute left-5 top-10'/>
    </div>
  )
}

export default About
