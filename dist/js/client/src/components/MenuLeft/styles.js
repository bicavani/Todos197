const drawerWidth = 240;

export const styles = (theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    whiteSpace: 'nowrap',
  },
  paper: {
    position: 'fixed',
    paddingTop: theme.spacing(7.5),
    zIndex: 60,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(9),
      height: '100vh'
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginLeft: -4,
  },
  overlay: {
    position: 'fixed',
    zIndex: 59,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.1,
  },
  show: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
});