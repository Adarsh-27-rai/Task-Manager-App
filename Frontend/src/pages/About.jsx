import React from 'react'
import { RiTaskLine } from "react-icons/ri";
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="bg-[url('/planning_app.png')] bg-cover bg-no-repeat h-screen w-screen relative">
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl sm:text-4xl md:text-5xl font-extrabold leading-tight bg-linear-to-r from-purple-500 to-purple-700 
               bg-clip-text text-transparent">iTask</h1>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              {/* <span className='bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>iTask</span> {" "} */}
              Focus on what{" "}
              {/* <Link to="/login" ></Link> */}
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                matters
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-700 max-w-xl">
              A powerful yet simple task manager built to help you organize your work,
              boost productivity, and stay on track every day.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex gap-4">
              <Link to="/" >
                <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
                  Get Started
                </button>
              </Link>
              

            </div>
          </div>
        </div>
      </section>

      <img src="/task-icon.png" alt="png" className='h-100 absolute right-15 top-50' />
      <img src="/8kdb39e5o0n7ocjtpfrvduecsd.png" alt="logo" className='h-10 absolute left-5 top-4' />
    </div>
  )
}

export default About
