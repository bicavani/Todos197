import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FlareIcon from '@material-ui/icons/Flare';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styles } from './styles';

MenuLeft.propTypes = {
  classes: PropTypes.object,
  changeSearchTerm: PropTypes.func,
  changeLink: PropTypes.func
}

function MenuLeft(props) {
  const { classes } = props
  const [isOpen, setIsOpen] = React.useState(false)

  const handleBtnMenuClick = () => setIsOpen(!isOpen)

  const handleOverlayClick = () => setIsOpen(!isOpen)

  const { pathname } = useLocation()

  return (
    <div>
      <div className={clsx(classes.overlay,
        { [classes.hide]: !isOpen },
        { [classes.show]: isOpen }
      )}
        onClick={handleOverlayClick}
      >

      </div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={classes.menuButton}
            onClick={handleBtnMenuClick}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <List>
          <Link to="/tasks/myday" className={classes.link}>
            <ListItem
              button
              selected={pathname === '/tasks/myday'}
            >
              <ListItemIcon><FlareIcon /></ListItemIcon>
              <ListItemText primary="Ngày của tôi" />
            </ListItem>
          </Link>
          <Link to="/tasks/important" className={classes.link} >
            <ListItem
              button
              selected={pathname === '/tasks/important'}
            >
              <ListItemIcon><StarBorderIcon /></ListItemIcon>
              <ListItemText primary="Quan trọng" />
            </ListItem>
          </Link>
          <Link to="/tasks/planned" className={classes.link} >
            <ListItem
              button
              selected={pathname === '/tasks/planned'}
            >
              <ListItemIcon><EventNoteIcon /></ListItemIcon>
              <ListItemText primary="Đã lập kế hoạch" />
            </ListItem>
          </Link>
          <Link to="/tasks" className={classes.link} >
            <ListItem
              button
              selected={pathname === '/tasks'}
            >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Tác vụ" />
            </ListItem>
          </Link>
        </List>
      </Drawer >
    </div >
  )
}

export default withStyles(styles)(MenuLeft)

