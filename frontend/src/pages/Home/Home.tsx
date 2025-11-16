import Hero from './Hero'
import Login from './Login'
import WhyShuttleX from './WhyShuttleX'
import About from './About'
import Gallery from './Gallery'
import Footer from '../../layout/footer'

function Home() {
  return (
    <div>
      <Hero/>
      <Login/>
      <WhyShuttleX/>
      <About/>
      <Gallery/>
      <Footer/>
    </div>
  )
}

export default Home
