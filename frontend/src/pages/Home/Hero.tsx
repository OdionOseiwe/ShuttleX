import NavBar from "../../layout/NavBar";
import Slidder from "../../components/Slidder";
import { motion} from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0},
  show: {
    opacity: 1,
    transition: { duration: 0.9, ease: "easeIn" }
  }

};

function Hero() {
  return (
    <motion.section
      id="Hero"
    >
      <NavBar/>
      <motion.div 
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      className="grid md:grid-cols-2 grid-cols-1 gap-10 pt-20 md:px-25 px-5">
        <div className="md:mt-20 mt-10">
            <h1 className="lg:text-6xl text-3xl font-semibold md:leading-16">
                Go anywhere with ShuttleX
            </h1>
            <p className="mt-6">
                ShuttleX connects students and drivers in one seamless platform.
                Book a ride, track your driver in real time, and get to your destination safely and on time.
                No stress, no waiting, just smooth movement across campus.
            </p>
            <button className="bg-black mt-6 md:px-10 px-6 py-2 text-xl md:font-semibold rounded-xl text-white">Ride now</button>
        </div>
        <div>
            <Slidder/>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Hero
