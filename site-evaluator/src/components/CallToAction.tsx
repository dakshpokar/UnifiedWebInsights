import { motion } from 'framer-motion';
import { Container, Typography, Button, Box } from '@mui/material';

const CallToAction = () => {
  return (
    <Container maxWidth="md" sx={{ py: 12 }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Box textAlign="center">
          <Typography variant="h3" mb={3}>
            Ready to improve your website?
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            Start your free website analysis today
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Get Started
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default CallToAction;
