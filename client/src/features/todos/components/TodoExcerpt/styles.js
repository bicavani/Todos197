export const styles = theme => ({
  root: {
    borderBottom: "1px solid " + [theme.palette.grey[400]],
    maxWidth: '100%',
  },
  textLineThrough: {
    textDecoration: 'line-through',
    opacity: 0.5
  },
  text: {
    wordBreak: 'break-word',
  },
  iconRight: {
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(2),

    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(4),

    }
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  bgGrey: {
    backgroundColor: theme.palette.grey[300],
  },
  cursor: {
    cursor: 'pointer'
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