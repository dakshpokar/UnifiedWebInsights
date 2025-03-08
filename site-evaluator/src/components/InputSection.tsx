import { useState } from 'react'
import { TextField, Button, Container, Box, Typography } from '@mui/material'
import { Grid2 } from '@mui/material'
import { motion } from 'framer-motion'

const InputSection = () => {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle URL submission logic here
    console.log('Analyzing URL:', url)
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh' 
      }}
    >
      <Grid2 
        container 
        spacing={4} 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid2 size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" fontWeight="bold" mb={3}>
              Analyze Your Website
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
              Get instant insights about your website's performance, accessibility, and best practices.
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your website URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    bgcolor: 'background.paper',
                  }
                }}
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                sx={{
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                Start Analysis
              </Button>
            </Box>
          </motion.div>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <Box
              component="img"
              src="/public/site_eval_image.png"
              alt="Website Analysis Illustration"
              sx={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                margin: '0 auto', // Center the image horizontally
              }}
            />
          </motion.div>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default InputSection
