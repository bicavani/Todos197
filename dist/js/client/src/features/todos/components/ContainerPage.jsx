import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import BtnDeleteAll from './BtnDeleteAll';

const styles = theme => ({
  root: {
    position: 'relative',
    flexGrow: 1,
    paddingTop: theme.spacing(9),
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(11),
      paddingLeft: theme.spacing(2),
    }
  },
})

Todos.propsTypes = {
  classes: PropTypes.object,
  children: PropTypes.array
}

function Todos(props) {
  const { classes, children } = props

  return (
    <Paper
      elevation={0}
      className={classes.root}
    >
      {children}
      <Box display="flex" justifyContent="flex-end" padding={5} >
        <BtnDeleteAll />
      </Box>
    </Paper>
  )
}

export default withStyles(styles)(Todos)

