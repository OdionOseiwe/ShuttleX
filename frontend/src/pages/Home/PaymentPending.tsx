import { motion } from "framer-motion"
import { AlertTriangle, CreditCard } from "lucide-react"

function PaymentPending() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-black text-white p-6">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center bg-gray-800/70 backdrop-blur-lg border border-gray-700 rounded-2xl p-10 shadow-2xl"
      >
        
        {/* Icon */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-6"
        >
          <AlertTriangle size={70} className="text-yellow-400" />
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">
          Website Temporarily Unavailable
        </h1>

        <p className="text-gray-300 mb-6">
          This website has been temporarily disabled due to an outstanding
          payment for development services.
        </p>

        <p className="text-gray-400 mb-8">
          Please contact the developer to resolve the payment and restore the
          website.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center gap-3 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold"
        >
          <CreditCard size={20} />
          Payment Required
        </motion.div>

        <p className="text-xs text-gray-500 mt-6">
          Service suspended until payment is completed.
        </p>
      </motion.div>
    </div>
  )
}

export default PaymentPending