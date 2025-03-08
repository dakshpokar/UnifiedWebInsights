import { Typography, Container, Box } from '@mui/material'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <Container maxWidth="lg">
      <Box py={6}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" align="center">
            Unified Web Insight
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom align="center" color="text.secondary">
            A Holistic Approach to Website Evaluation Using LLMs
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography variant="body1" paragraph sx={{ mt: 4, maxWidth: '900px', mx: 'auto', lineHeight: 1.8 }}>
            Unified Web Insight is a novel approach that leverages Custom Fine-tuned Models & Large Language Models to provide comprehensive feedback on websites by analysing both their screenshots and HTML documents. In today's digital age, evaluating a website's performance and user experience remains a persistent challenge, especially given the complexity and dynamic nature of modern web interfaces.
          </Typography>
        </motion.div>
      </Box>
    </Container>
  )
}

export default Header
