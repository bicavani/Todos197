import { Box, Typography, withStyles } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
import { checkDate } from './DatePicker';

const styles = theme => ({
  expDate: {
    display: 'flex',
    alignItems: 'flex-start',
    opacity: 0.8
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

export const isDueDate = date => {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

ExpDate.propTypes = {
  date: PropTypes.string
}

function ExpDate({ classes, expDate }) {
  if (expDate) {
    const expDateParsed = parseISO(expDate)
    let result = checkDate(expDateParsed)

    if (isDueDate(expDateParsed)) result = 0

    let content = {}
    const expDateFormated = format(expDateParsed, 'dd/MM/yyyy')

    switch (result) {
      case 0:
        content.text = `Đến hạn Hôm nay`
        content.color = 'primary'
        break
      case -1:
        content.text = `Đến hạn ${expDateFormated}`
        content.color = ''
        break
      case 1:
        content.text = `Quá hạn ${expDateFormated}`
        content.color = 'secondary'
        break
      default:
        break
    }
    return (
      <Box className={classes.expDate}>
        <ScheduleIcon className={classes.icon} />
        <Typography className={classes.text} variant="caption" color={content.color} >
          {content.text}
        </Typography>
      </Box>
    )
  } else {
    return null
  }
}

export default withStyles(styles)(ExpDate)

