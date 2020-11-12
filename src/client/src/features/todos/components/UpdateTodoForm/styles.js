export const styles = theme => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      width: '35%',
    },
  },
  root: {
    position: 'fixed',
    justifyContent: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    paddingTop: theme.spacing(7),
    zIndex: 80,
    width: '86%',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('sm')]: {
      width: '35%',
      paddingTop: theme.spacing(9),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(10),

    }
  },
  list: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: '92%',
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(0),
    },
  },
  paper: {
    background: theme.palette.background.paper,
    marginBottom: theme.spacing(1)
  },
  textLineThrough: {
    textDecoration: 'line-through',
    opacity: 0.5
  },
  padding0: {
    padding: 0,
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },

})

