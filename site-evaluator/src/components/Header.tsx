import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        bgcolor: 'transparent', 
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo/Brand */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontWeight: 700,
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 },
              letterSpacing: '0.05em'
            }}
          >
            SITE EVALUATOR
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            justifyContent: 'center',
            mx: 2
          }}>
            <Button 
              component={Link} 
              to="/" 
              sx={{ 
                mx: 1.5, 
                color: isActive('/') ? 'primary.main' : 'text.secondary', 
                fontWeight: isActive('/') ? 700 : 500,
                position: 'relative',
                '&::after': isActive('/') ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '20%',
                  width: '60%',
                  height: '3px',
                  borderRadius: '2px',
                  bgcolor: 'primary.main'
                } : {}
              }}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              to="/evaluate" 
              sx={{ 
                mx: 1.5, 
                color: isActive('/evaluate') ? 'primary.main' : 'text.secondary', 
                fontWeight: isActive('/evaluate') ? 700 : 500,
                position: 'relative',
                '&::after': isActive('/evaluate') ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '20%',
                  width: '60%',
                  height: '3px',
                  borderRadius: '2px',
                  bgcolor: 'primary.main'
                } : {}
              }}
            >
              About
            </Button>
            <Button 
              component={Link} 
              to="/history" 
              sx={{ 
                mx: 1.5, 
                color: isActive('/history') ? 'primary.main' : 'text.secondary', 
                fontWeight: isActive('/history') ? 700 : 500,
                position: 'relative',
                '&::after': isActive('/history') ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '20%',
                  width: '60%',
                  height: '3px',
                  borderRadius: '2px',
                  bgcolor: 'primary.main'
                } : {}
              }}
            >
              Documentation
            </Button>
            <Button 
              component={Link} 
              to="/about" 
              sx={{ 
                mx: 1.5, 
                color: isActive('/about') ? 'primary.main' : 'text.secondary', 
                fontWeight: isActive('/about') ? 700 : 500,
                position: 'relative',
                '&::after': isActive('/about') ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '20%',
                  width: '60%',
                  height: '3px',
                  borderRadius: '2px',
                  bgcolor: 'primary.main'
                } : {}
              }}
            >
              Pricing
            </Button>
          </Box>

          {/* Right side buttons */}
          <Box sx={{ flexGrow: 0 }}>
            <Button 
              variant="text" 
              color="primary" 
              sx={{ 
                mr: 2,
                borderRadius: '8px',
                px: 3,
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '8px',
                  padding: '1.5px',
                  background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                  pointerEvents: 'none'
                },
                '&:hover': {
                  backgroundColor: 'rgba(69, 104, 220, 0.04)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(176, 106, 179, 0.3)',
                  transition: 'all 0.3s ease'
                },
              }}
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              sx={{
                borderRadius: '8px',
                px: 3,
                boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #3f5bd5 0%, #a55aa8 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(176, 106, 179, 0.3)',
                  transition: 'all 0.3s ease'
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
