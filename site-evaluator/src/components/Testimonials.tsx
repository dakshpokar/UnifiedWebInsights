import { motion } from 'framer-motion';
import { Container, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';

const testimonials = [
  {
    name: 'John Doe',
    role: 'Web Developer',
    content: 'This tool has been invaluable for our website optimization efforts.',
    avatar: 'JD'
  },
  {
    name: 'Jane Smith',
    role: 'SEO Specialist',
    content: 'The detailed reports helped us improve our search rankings significantly.',
    avatar: 'JS'
  }
];

const Testimonials = () => {
  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" textAlign="center" mb={6}>
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                borderRadius: '12px' 
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="body1" mb={3}>
                    "{testimonial.content}"
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar>{testimonial.avatar}</Avatar>
                    <div style={{ marginLeft: 16 }}>
                      <Typography variant="subtitle1">{testimonial.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Testimonials;
