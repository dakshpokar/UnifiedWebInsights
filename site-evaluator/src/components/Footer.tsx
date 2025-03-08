import { Container, Typography, Grid, Link, Box, Stack, Divider, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialIcons = [
    { icon: <Facebook />, link: '#' },
    { icon: <Twitter />, link: '#' },
    { icon: <LinkedIn />, link: '#' },
    { icon: <GitHub />, link: '#' },
  ];
  
  const footerLinks = [
    { title: 'Features', link: '#' },
    { title: 'Pricing', link: '#' },
    { title: 'Documentation', link: '#' },
    { title: 'Contact', link: '#' },
  ];
  
  return (
    <Box 
      sx={{ 
        // background: 'linear-gradient(90deg, rgba(69, 104, 220, 0.05) 0%, rgba(176, 106, 179, 0.05) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        pt: 8, 
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Typography 
                variant="h5" 
                mb={2}
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Site Evaluator
              </Typography>
              <Typography 
                variant="body1" 
                mb={3}
                sx={{ 
                  color: 'text.secondary',
                  maxWidth: '85%',
                  lineHeight: 1.7,
                }}
              >
                Our platform provides comprehensive website analysis and optimization tools 
                to help you improve performance, accessibility, and user experience.
              </Typography>
              
              <Stack direction="row" spacing={1} mb={4}>
                {socialIcons.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      component="a"
                      href={item.link}
                      sx={{
                        bgcolor: 'background.paper',
                        color: index % 2 === 0 ? '#4568dc' : '#b06ab3',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                        }
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Typography 
                variant="h6" 
                mb={3}
                sx={{ fontWeight: 600 }}
              >
                Quick Links
              </Typography>
              <Stack spacing={2}>
                {footerLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <Link 
                      href={link.link} 
                      sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'all 0.2s',
                        '&:hover': {
                          color: '#4568dc',
                        }
                      }}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Typography 
                variant="h6" 
                mb={3}
                sx={{ fontWeight: 600 }}
              >
                Contact Us
              </Typography>
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                  }}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    style={{ flex: 1 }}
                  >
                    <Box
                      component="input"
                      type="email"
                      placeholder="Your email"
                      sx={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s',
                        '&:focus': {
                          borderColor: '#4568dc',
                          boxShadow: '0 0 0 3px rgba(69, 104, 220, 0.1)',
                        }
                      }}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Box
                      component="button"
                      type="submit"
                      sx={{
                        background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                        color: 'white',
                        fontWeight: 600,
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        '&:hover': {
                          boxShadow: '0 4px 15px rgba(69, 104, 220, 0.3)',
                        }
                      }}
                    >
                      Subscribe
                    </Box>
                  </motion.div>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                  Subscribe to our newsletter to get updates and news about our services.
                </Typography>
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Email: contact@siteevaluator.com
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Phone: +1 (555) 123-4567
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, opacity: 0.2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © {currentYear} Site Evaluator. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" sx={{ color: 'text.secondary', fontSize: '0.85rem', textDecoration: 'none', '&:hover': { color: '#4568dc' } }}>
              Privacy Policy
            </Link>
            <Link href="#" sx={{ color: 'text.secondary', fontSize: '0.85rem', textDecoration: 'none', '&:hover': { color: '#4568dc' } }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
