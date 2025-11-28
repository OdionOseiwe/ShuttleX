import {motion} from 'framer-motion'
const fadeUp1 = {
  hidden: { opacity: 0, x:100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" }
  }
};

const fadeUp2 = {
  hidden: { opacity: 0, x:-100 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" }
  }
};

function Login() {
  return (
    <motion.section
      
    id="login" className='mt-20 grid md:grid-cols-2 gap-20 grid-cols-1 md:px-25 items-center px-5'>
        <motion.div
          variants={fadeUp2}
          initial="hidden"
          whileInView="show"
        >
            <img src="https://tb-static.uber.com/prod/udam-assets/850e6b6d-a29e-4960-bcab-46de99547d24.svg" alt="" />
        </motion.div>
        <motion.div
          variants={fadeUp1}
          initial="hidden"
          whileInView="show"
        >
        <h1 className='md:text-5xl text-3xl font-semibold md:leading-16'>
            Log in to see your account details
        </h1>
        <p className="font-light mt-6">
            View past trips, tailored suggestions, support resources, and more.
        </p>
        <div className="flex items-center md:space-x-8 space-x-3 ">
            <a href="/login" className="bg-black  mt-6 md:px-6 px-2 py-3 rounded-xl text-white cursor-pointer">log in to your account</a>
            <a href="/signup" className="font-medium cursor-pointer -mb-5">
                Create an account
                <p className="border-b p-1 text-gray-400 hover:text-black"></p>
            </a>
        </div>
      </motion.div>
      
    </motion.section>
  )
}

export default Login
