import { Container, Typography, Grid, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" mb={2}>
              Site Evaluator
            </Typography>
            <Typography variant="body2">
              Comprehensive website analysis and optimization tool
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" mb={2}>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" display="block" mb={1}>
              Features
            </Link>
            <Link href="#" color="inherit" display="block" mb={1}>
              Pricing
            </Link>
            <Link href="#" color="inherit" display="block">
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" mb={2}>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: contact@siteevaluator.com
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
          © {new Date().getFullYear()} Site Evaluator. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
