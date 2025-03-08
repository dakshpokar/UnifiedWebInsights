import { Container, Paper, Typography } from '@mui/material'
import { Grid2 } from '@mui/material'
import { Visibility, Code, Speed, Person } from '@mui/icons-material'

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
  return (
    <Container className="py-16">
      <Grid2 container spacing={4}>
        {features.map((feature, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper 
              className="p-6 text-center h-full" 
              sx={{ 
                borderRadius: '12px' 
              }}
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <Typography variant="h6" className="mb-2">
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  )
}

export default Features
