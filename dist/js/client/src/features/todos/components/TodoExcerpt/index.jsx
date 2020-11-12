import { Box, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CommentIcon from '@material-ui/icons/Comment';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { unwrapResult } from '@reduxjs/toolkit';
import clsx from 'clsx';
import { OpenUpdateTodoContext } from 'features/todos/DashBoard';
import { selectTodoById, updateTodo } from 'features/todos/todosSlice';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ExpDate from '../ExpDateInfo';
import MyDayInfo from '../MyDayInfo';
import { styles } from './styles';

let TodoExcerpt = (props) => {
  const { todoId, classes } = props

  const [updateRequestStatus, setUpdateRequestStatus] = useState('idle')

  const { openUpdateTodoForm } = useContext(OpenUpdateTodoContext)

  const location = useLocation()
  const dispatch = useDispatch()
  const { pathname } = location
  const todo = useSelector(state => selectTodoById(state, todoId))

  const handleTodoUpdate = async (todoUpdate) => {
    if (updateRequestStatus === 'idle') {
      try {
        setUpdateRequestStatus('pending')
        const resultAction = await dispatch(
          updateTodo(
            [todoId,
              { title: todo.title, ...todoUpdate }
            ]
          )
        )
        unwrapResult(resultAction)
      } catch (error) {
        console.log('Failed to update the todo: ', error)
      } finally {
        setUpdateRequestStatus('idle')
      }
    }
  }
  const handleIconCheckClick = () => {
    handleTodoUpdate({ isComplete: !todo.isComplete })
  }
  const handleIconStarClick = () => {
    let todoUpdate = { isImportant: !todo.isImportant }
    if (!todo.notification) {
      todoUpdate = {
        isImportant: !todo.isImportant,
        notification: !todo.isImportant
      }
    }
    handleTodoUpdate(todoUpdate)
  }
  const handleLinkClick = e => openUpdateTodoForm()

  const renderIcon = () => {
    return todo.isComplete ?
      <CheckCircleIcon className={classes.cursor} color="primary" /> :
      <RadioButtonUncheckedIcon className={classes.cursor} color="secondary" />
  }

  return (
    <ListItem
      role={undefined}
      key={todoId}
      dense button
      className={classes.root}
      selected={pathname === `/tasks/id/${todoId}`}
    >
      <ListItemIcon onClick={handleIconCheckClick} style={{ minWidth: 48 }}>
        {renderIcon()}
      </ListItemIcon>
      <Box flexGrow={1}>
        <Link
          to={{
            pathname: `/tasks/id/${todoId}`,
            state: {
              from: pathname,
              type: /id/g.test(pathname) ?
                location.state.type :
                pathname.split('/').slice(0, 3).join('/')
            }
          }}
          className={classes.link}
          onClick={handleLinkClick}
        >
          <ListItemText
            primary={<span className={classes.text} > {todo.title}</span>}
            className={clsx({
              [classes.textLineThrough]: todo.isComplete
            })}
          />
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} flexWrap={{ sm: 'wrap' }} >
            {todo.remindTime && <NotificationsActiveIcon color="secondary" className={classes.notiIcon} />}
            <ExpDate expDate={todo.expDate} />
            <MyDayInfo myDay={todo.isMyDate} />
          </Box>
        </Link>
      </Box>
      <Box>
        <Link
          to={{
            pathname: `/tasks/id/${todoId}`,
            state: {
              from: pathname,
              type: /id/g.test(pathname) ?
                location.state.type :
                pathname.split('/').slice(0, 3).join('/')
            }
          }}
          onClick={handleLinkClick}
        >
          <IconButton edge="end" aria-label="description">
            <Tooltip title="Comment">
              <CommentIcon color={todo.description ? 'primary' : 'disabled'} />
            </Tooltip>
          </IconButton>
        </Link>
        <IconButton edge="end" aria-label="important" onClick={handleIconStarClick}>
          <Tooltip title="Đánh dấu tác vụ là quan trọng">
            <StarBorderIcon color={todo.isImportant ? 'primary' : 'disabled'} />
          </Tooltip>
        </IconButton>
      </Box>
    </ListItem>
  )
}

TodoExcerpt.propTypes = {
  todoId: PropTypes.string,
  classes: PropTypes.object
}

TodoExcerpt = React.memo(TodoExcerpt)

export default withStyles(styles)(TodoExcerpt)

