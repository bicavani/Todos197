import { Box, Typography, withStyles } from '@material-ui/core'
import { formatDistanceToNow, parseISO } from 'date-fns'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  timeInfo: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    opacity: 0.7,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  }
})

TimeInfo.propTypes = {
  classes: PropTypes.object,
  todoId: PropTypes.string
}

function TimeInfo({ classes, todo }) {
  const timeCreate = todo.createdAt
  const timeUpdate = todo.updatedAt
  let createAgo = ''
  let updateAgo = ''
  if (timeCreate && timeUpdate) {
    const createPeriod = formatDistanceToNow(parseISO(timeCreate))
    const updatePeriod = formatDistanceToNow(parseISO(timeUpdate))
    createAgo = `${createPeriod} ago`
    updateAgo = `${updatePeriod} ago`
  }

  return (
    <Box className={classes.timeInfo}>
      <Typography variant="caption">
        Created: <i>{createAgo}</i>
      </Typography>
      <Typography variant="caption">
        Last updated: <i>{updateAgo}</i>
      </Typography>
    </Box>
  )

}

export default withStyles(styles)(TimeInfo)

