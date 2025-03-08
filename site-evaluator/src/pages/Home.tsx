import { motion } from 'framer-motion'
import Features from '../components/Features'
import Footer from '../components/Footer'
import InputSection from '../components/InputSection'

function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.3
          }
        }
      }}
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%)',
      }}
      className="min-h-screen w-full overflow-x-hidden"
    >
      <div className="w-full px-0 mx-auto sm:container sm:px-6 lg:px-8">
        <motion.div 
          variants={sectionVariants} 
          className="flex flex-col items-center justify-center w-full py-6 md:py-10"
        >
          <div className="w-full px-4 sm:px-0">
            <InputSection />
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full px-4 sm:px-0"
        >
          <Features />
        </motion.div>
      </div>

      <motion.div variants={sectionVariants} className="w-full mt-8">
        <Footer />
      </motion.div>
    </motion.div>
  )
}

export default Home
