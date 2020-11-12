import { Box, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import logo from './LandingPage/img/logo.png';

Loading.propTypes = {

};

function Loading(props) {
  return (
    <Box height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box>
        <img src={logo} height="79px" alt="logo" />
      </Box>
      <Box py={5}>
        <Typography variant="h4" >Loading Todos197...</Typography>
      </Box>
      <CircularProgress />
    </Box>
  );
}

export default Loading;