import { Container, Paper, Typography, Box } from '@mui/material'
import { Grid2 as Grid } from '@mui/material'
import { Visibility, Code, Speed, Person } from '@mui/icons-material'
import { motion } from 'framer-motion'

const features = [
  {
    icon: <Visibility fontSize="large" />,
    title: 'Visual & Semantic Analysis',
    description: 'Analyze website screenshots for visual cues and semantic content'
  },
  {
    icon: <Code fontSize="large" />,
    title: 'HTML & Code Quality',
    description: 'Deep dive into HTML structure for improved code quality and maintainability'
  },
  {
    icon: <Speed fontSize="large" />,
    title: 'SEO & Performance Metrics',
    description: 'Comprehensive evaluation of SEO rankings, load times, and technical metrics'
  },
  {
    icon: <Person fontSize="large" />,
    title: 'Holistic User Experience (UX)',
    description: 'Integrate UX metrics and feedback into the overall website analysis'
  }
]

const Features = () => {  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        px: 2
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', md: '2.4rem' }
              }}
            >
              Comprehensive Analysis Features
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                maxWidth: '750px', 
                mx: 'auto', 
                mb: 5,
                fontWeight: 400,
                opacity: 0.85
              }}
            >
              Our platform offers a suite of powerful tools to evaluate and improve your website's performance
            </Typography>
          </motion.div>
        </Box>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid 
            container 
            spacing={{ xs: 3, md: 4 }}
            justifyContent="center"
          >
            {features.map((feature, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <motion.div variants={itemVariants}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      borderRadius: '20px',
                      p: { xs: 3, md: 4 },
                      height: '100%',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.5)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 40px rgba(69, 104, 220, 0.15)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: '16px',
                        background: 'linear-gradient(45deg, rgba(69, 104, 220, 0.1), rgba(176, 106, 179, 0.1))',
                        color: 'transparent',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box sx={{ 
                        color: index % 2 === 0 ? '#4568dc' : '#b06ab3',
                        position: 'absolute',
                      }}>
                        {feature.icon}
                      </Box>
                    </Box>
                    
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1.5,
                        fontSize: '1.2rem',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography 
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.6, 
                        fontSize: '0.95rem',
                        opacity: 0.85
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Features
