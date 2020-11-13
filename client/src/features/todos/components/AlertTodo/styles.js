export const styles = theme => ({
  alert: {
    backgroundColor: theme.palette.background.paper
  },
  textLineThrough: {
    textDecoration: 'line-through',
    opacity: 0.5
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    flexGrow: 1
  },
  show: {
    display: "flex"
  },
  hide: {
    display: 'none'
  },
  notiIcon: {
    fontSize: '0.8rem',
    marginRight: theme.spacing(1),
    opacity: 0.6,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem'
    }
  },
})
