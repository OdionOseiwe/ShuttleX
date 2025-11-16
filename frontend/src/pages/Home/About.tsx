import React from 'react'

function About() {
  return (
    <section id='About' className="bg-black text-white py-20 px-6 md:px-24">

      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="font-bold text-4xl md:text-5xl mb-4">About Us</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Learn more about our mission, vision, and why ShuttleX exists.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto leading-relaxed space-y-8 text-lg text-gray-200">

        <p>
          ShuttleX is a modern, student-focused transportation platform designed to make campus
          mobility simple, safe, and stress-free. We believe moving from one place to another shouldn’t
          be a hassle — so we created an intelligent system that connects students and drivers 
          instantly.
        </p>

        <p>
          Our mission is to improve daily commuting by providing a reliable, transparent, and
          user-friendly shuttle booking experience. Whether you’re heading to class, the hostel, 
          or anywhere across campus, ShuttleX ensures you get there comfortably and on time.
        </p>

        {/* Our Vision */}
        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-4 text-white">Our Vision</h3>
          <p className="text-gray-300 text-lg">
            To become the most trusted mobility solution for campuses, empowering students with 
            the freedom to move seamlessly and safely.
          </p>
        </div>

      </div>
    </section>
  )
}

export default About
