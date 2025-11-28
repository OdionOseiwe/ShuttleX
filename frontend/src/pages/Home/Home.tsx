import Hero from './Hero'
import Login from './Login'
import WhyShuttleX from './WhyShuttleX'
import About from './About'
import Gallery from './Gallery'
import Footer from '../../layout/footer'
import {motion} from 'framer-motion'

function Home() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <Hero/>
      <Login/>
      <WhyShuttleX/>
      <About/>
      <Gallery/>
      <Footer/>
    </motion.section>
  )
}

export default Home
