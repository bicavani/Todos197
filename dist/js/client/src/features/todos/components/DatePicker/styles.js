export const styles = theme => ({
  datePicker: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
    position: 'relative'
  },
  dateInput: {
    position: 'absolute',
    zIndex: 50,
    flexDirection: 'column',
    alignItems: 'flex-end',
    background: theme.palette.background.paper,
    top: theme.spacing(5),
    padding: theme.spacing(2)
  },
  show: {
    display: 'flex',
  },
  hide: {
    display: 'none'
  }
})
