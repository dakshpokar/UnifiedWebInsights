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
    >
      <motion.div variants={sectionVariants} className="flex justify-center items-center w-full">
        <InputSection />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Features />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <Footer />
      </motion.div>
    </motion.div>
  )
}

export default Home
