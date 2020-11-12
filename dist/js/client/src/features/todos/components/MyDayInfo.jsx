import { Box, Typography, withStyles } from '@material-ui/core';
import FlareIcon from '@material-ui/icons/Flare';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  myDay: {
    display: 'flex',
    alignItems: 'flex-start',
    opacity: 0.8,
  },
  icon: {
    fontSize: '0.8rem',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem'
    }
  },
  text: {
    fontSize: '0.6rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.7rem'
    }
  }
})
MyDayPage.propTypes = {
  classes: PropTypes.object,
  myDay: PropTypes.bool
}

function MyDayPage({ classes, myDay }) {
  if (myDay) {
    return (
      <Box className={classes.myDay} ml={{ sm: 1 }}>
        <FlareIcon className={classes.icon} />
        <Typography className={classes.text} variant="caption" >
          Ngày của tôi
        </Typography>
      </Box>
    )
  } else {
    return null
  }
}

export default withStyles(styles)(MyDayPage)

