export
  const styles = theme => ({
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
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    show: {
      display: 'flex',
    },
    hide: {
      display: 'none'
    }
  })
