import { ThemeProvider } from '@mui/material'
import Features from './components/Features'
import Methodology from './components/Methodology'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import { theme } from './theme.ts'
import { motion } from 'framer-motion'
import InputSection from './components/InputSection'

function App() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50">
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

          <motion.div
            variants={sectionVariants}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Methodology />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Testimonials />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <CallToAction />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <Footer />
          </motion.div>
        </motion.div>
      </div>
    </ThemeProvider>
  )
}

export default App
