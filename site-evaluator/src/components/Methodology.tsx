import { Container, Typography, Paper } from '@mui/material'

const Methodology = () => {
  return (
    <Container className="py-16">
      <Paper className="p-8 text-center" sx={{ 
                borderRadius: '12px' 
              }}>
        <Typography variant="h4" className="mb-4">
          Our Methodology
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Our pipeline integrates computer vision and NLP to deliver unparalleled 
          website insights, validated through rigorous user studies, usability metrics, 
          and performance benchmarks.
        </Typography>
      </Paper>
    </Container>
  )
}

export default Methodology
