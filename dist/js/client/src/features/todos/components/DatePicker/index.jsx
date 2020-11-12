import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, ListItemSecondaryAction, Paper, withStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import clsx from 'clsx';
import 'date-fns';
import { add, compareAsc, format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { styles } from './styles';

DatePicker.propTypes = {
  classes: PropTypes.object,
  handleExpDateChange: PropTypes.func,
  expDate: PropTypes.string
}

export const checkDate = date => {
  return compareAsc(new Date(), date)
}

function DatePicker(props) {
  const { classes, handleExpDateChange, expDate } = props
  let expDateParsed = ''

  const setInitialText = (date) => {
    if (date) {
      expDateParsed = format(parseISO(date), 'dd/MM/yyyy')
      return `Đến hạn ${expDateParsed}`
    } else {
      return 'Thêm ngày đến hạn'
    }
  }

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [openDateInput, setOpenDateInput] = React.useState(false)
  const [text, setText] = React.useState(() => setInitialText(expDate))

  useEffect(() => {
    setText(setInitialText(expDate))
  }, [expDate])
  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
  const handleopenDateInput = () => setOpenDateInput(!openDateInput)

  //Add minutes and hours to selectedDate => format selectedDate(mm/dd/yy 23:59:ss)
  let selectedDateAdded
  let date
  let canSaveDate
  if (selectedDate) {
    selectedDateAdded = add(selectedDate, {
      hours: 23 - selectedDate.getHours(),
      minutes: 59 - selectedDate.getMinutes(),
    })

    date = format(selectedDateAdded, 'dd/MM/yyyy')

    canSaveDate =
      checkDate(selectedDateAdded) !== 1 &&
      date !== expDateParsed
  } else canSaveDate = false

  const handleSaveDate = (e) => {
    setText(`Đến hạn ${date}`)
    setOpenDateInput(false)
    handleExpDateChange(selectedDateAdded)
  }

  const handleIconCloseClick = () => {
    setText("Thêm ngày đến hạn")
    handleExpDateChange(null)
  }

  return (
    <Box className={classes.datePicker}>
      <ListItem
        role={undefined}
        dense button
        className={classes.paper}
        onClick={handleopenDateInput}
      >
        <ListItemIcon>
          <DateRangeIcon color={text !== 'Thêm ngày đến hạn' ? 'primary' : 'disabled'} />
        </ListItemIcon>
        <ListItemText
          primary={text}
        />
        <ListItemSecondaryAction style={{ cursor: 'pointer' }}>
          {(expDate || text !== 'Thêm ngày đến hạn') && <CloseIcon fontSize="small" onClick={handleIconCloseClick} />}
        </ListItemSecondaryAction>
      </ListItem>
      <Paper elevation={2}
        className={clsx(classes.dateInput,
          { [classes.show]: openDateInput },
          { [classes.hide]: !openDateInput }
        )}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <Button
          disabled={!canSaveDate}
          variant="contained"
          color="primary"
          onClick={handleSaveDate}
        >
          Save
      </Button>
      </Paper>
    </Box>
  )
}

export default withStyles(styles)(DatePicker)

