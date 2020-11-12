import { Typography } from '@material-ui/core';
import React from 'react'
import { Link } from '@material-ui/core'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Todos197
      </Link>{' '}
      { new Date().getFullYear()}
      { '.'}
    </Typography >
  );
}

export default Copyright