import { useState } from 'react';
import { 
  Typography, 
  CircularProgress,
  Link,
  Paper,
  Container,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!firstName.trim()) {
      setError('Please enter your first name');
      return;
    }
    
    if (!lastName.trim()) {
      setError('Please enter your last name');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    // Simulate sign up API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Here you would add actual signup logic
      console.log('Sign up attempt:', { firstName, lastName, email, password });
      
      // Reset form on success
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: "100vh",
        overflow: 'hidden',
      }}
    >
      <Container 
        maxWidth={false}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          overflow: 'visible',
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
            maxWidth: '500px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              mb={3}
              align="center"
              sx={{
                background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', md: '2.2rem' },
                lineHeight: 1.2
              }}
            >
              Create Account
            </Typography>
            
            {error && (
              <Typography 
                color="error" 
                align="center" 
                mb={3}
                sx={{ 
                  fontWeight: 500,
                  fontSize: '0.95rem'
                }}
              >
                {error}
              </Typography>
            )}
            
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                      bgcolor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      padding: '6px 14px',
                      '&:hover': {
                        boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                      },
                    }
                  }}
                />
                
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                      bgcolor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      padding: '6px 14px',
                      '&:hover': {
                        boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                      },
                    }
                  }}
                />
              </Box>
              
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    bgcolor: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    padding: '6px 14px',
                    '&:hover': {
                      boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                    },
                  }
                }}
              />
              
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    bgcolor: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    padding: '6px 14px',
                    '&:hover': {
                      boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                    },
                  }
                }}
              />
              
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    bgcolor: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    padding: '6px 14px',
                    '&:hover': {
                      boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                    },
                  }
                }}
              />
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disableElevation
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddAltIcon />}
                  sx={{
                    borderRadius: '12px',
                    padding: '12px 24px',
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
                    marginBottom: 3
                  }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </motion.div>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#666', mr: 1 }}>
                  Already have an account?
                </Typography>
                <Link 
                  component={RouterLink} 
                  to="/login" 
                  underline="hover" 
                  sx={{ 
                    color: '#4568dc', 
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#3f5bd5',
                    } 
                  }}
                >
                  Sign In
                </Link>
              </Box>
              
              {/* Decorative elements */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, rgba(176, 106, 179, 0.2), rgba(69, 104, 220, 0.2))',
                  filter: 'blur(40px)',
                  top: '-10%',
                  right: '-10%',
                  zIndex: -1,
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
                  bottom: '-10%',
                  left: '-5%',
                  zIndex: -1,
                }} 
              />
            </Box>
          </motion.div>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
