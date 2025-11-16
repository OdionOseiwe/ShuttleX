import { Dot } from 'lucide-react';
function WhyShuttleX() {
  return (
    <section id='whyShuttleX' className='grid grid-cols-2 gap-10 px-25 mt-20 items-center'>
        <div>
            <h1 className='text-4xl font-semibold mb-10'>Why ShuttleX?</h1> 
            <div className='leading-10 text-xl'>
                <li>Fast and reliable shuttle booking </li>
                <li>Real-time driver tracking</li>
                <li>Safe, verified driver accounts</li>
                <li>Simple, modern, and easy to use</li>
            </div>               
               
            <p className='text-xl font-semibold mt-5'>Your journey starts with a single tap — Ride smarter. Move better. ShuttleX.</p>
        </div>
        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvcu_2wP9lKumRVZuUnbstzR3hgM8TaUErCA&s" alt=""
            className='h-100' />
        </div>
      
    </section>
  )
}

export default WhyShuttleX
