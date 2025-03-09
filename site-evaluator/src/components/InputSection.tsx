import { useState } from 'react'
import { TextField, Button, Container, Box, Typography, InputAdornment, Paper, useTheme, useMediaQuery } from '@mui/material'
import {Grid2 as Grid} from '@mui/material'
import { motion } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search'

const InputSection = () => {
  const [url, setUrl] = useState('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle URL submission logic here
    console.log('Analyzing URL:', url)
  }

  return (
    <Container 
      maxWidth={false}
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: "100vh",
        padding: { xs: 2, md: 5 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          padding: { xs: 3, md: 5 },
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          width: '100%',
          maxWidth: '1400px',
        }}
      >
        <Grid 
          container 
          spacing={6} 
          alignItems="center"
          justifyContent="center"
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h3" 
                fontWeight="bold" 
                mb={2}
                sx={{
                  background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                  lineHeight: 1.2
                }}
              >
                Transform Your Website Experience
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                mb={4}
                sx={{ 
                  fontWeight: 400, 
                  lineHeight: 1.6,
                  opacity: 0.8,
                  maxWidth: '90%'
                }}
              >
                Get comprehensive insights on performance, accessibility, and SEO with our cutting-edge analysis tools.
              </Typography>
              
              <Box 
                component="form" 
                onSubmit={handleSubmit}
                sx={{
                  position: 'relative',
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Paste your website URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                      bgcolor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      padding: '6px 8px',
                      '&:hover': {
                        boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                      },
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          type="submit"
                          disableElevation
                          sx={{
                            borderRadius: '12px',
                            padding: '10px 24px',
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                            '&:hover': {
                              background: 'linear-gradient(90deg, #3f5bd5 0%, #a55aa8 100%)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 6px 20px rgba(176, 106, 179, 0.3)',
                              transition: 'all 0.3s ease'
                            },
                          }}
                        >
                          {isMobile ? <SearchIcon /> : 'Analyze Now'}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                  {['Performance', 'Accessibility', 'Best Practices', 'SEO'].map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Box
                        sx={{
                          bgcolor: 'rgba(69, 104, 220, 0.1)',
                          color: '#4568dc',
                          py: 0.75,
                          px: 2,
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ 
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                position: 'relative'
              }}
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut" 
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
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))',
                    borderRadius: '16px',
                  }}
                />
              </motion.div>
              
              {/* Decorative elements */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, rgba(176, 106, 179, 0.2), rgba(69, 104, 220, 0.2))',
                  filter: 'blur(40px)',
                  top: '10%',
                  right: '5%',
                  zIndex: -1,
                  display: { xs: 'none', md: 'block' }
                }} 
              />
              <Box 
                sx={{ 
                  position: 'absolute',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, rgba(69, 104, 220, 0.2), rgba(176, 106, 179, 0.2))',
                  filter: 'blur(30px)',
                  bottom: '20%',
                  left: '10%',
                  zIndex: -1,
                  display: { xs: 'none', md: 'block' }
                }} 
              />
            </motion.div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default InputSection
