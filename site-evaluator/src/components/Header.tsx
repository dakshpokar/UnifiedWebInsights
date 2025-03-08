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
              variant="outlined" 
              color="primary" 
              sx={{ 
                mr: 2,
                borderRadius: '8px',
                px: 3,
                borderWidth: '1.5px',
                '&:hover': {
                  borderWidth: '1.5px',
                }
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
                boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)'
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
