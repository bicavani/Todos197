import { Box, Button, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { unwrapResult } from '@reduxjs/toolkit'
import clsx from 'clsx'
import { add, differenceInMilliseconds, parseISO } from 'date-fns'
import { OpenUpdateTodoContext } from 'features/todos/DashBoard'
import { selectTodoById, updateTodo } from 'features/todos/todosSlice'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { styles } from './styles'

let AlertTodo = (props) => {
  const { classes, todoId } = props
  const { openUpdateTodoForm } = useContext(OpenUpdateTodoContext)
  const dispatch = useDispatch()

  const todo = useSelector(state => selectTodoById(state, todoId))
  const timer = parseISO(todo.remindTime)

  const millis = differenceInMilliseconds(timer, new Date())
  const [open, setOpen] = useState(millis <= 0)

  useEffect(() => {
    let idTimeout

    if (millis > 0) {
      idTimeout = setTimeout(() => setOpen(true), millis)
    }
    return function cleanup() {
      clearTimeout(idTimeout)
    }
  }, [todo.remindTime])

  const deleteRemind = async () => {
    try {
      const resultAction = await dispatch(
        updateTodo([
          todoId,
          { ...todo, remindTime: '' }
        ])
      )
      unwrapResult(resultAction)
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLinkClick = () => {
    setOpen(false)
    openUpdateTodoForm()
  }

  const handleCloseAlert = () => {
    deleteRemind()
  }

  const timeAdd = add(timer, {
    minutes: 30
  })
  const handleClickRemind = async () => {
    try {
      const resultAction = await dispatch(
        updateTodo([
          todoId,
          {
            ...todo,
            remindTime: timeAdd
          }
        ])
      )
      unwrapResult(resultAction)
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  const renderIcon = () => {
    return todo.isComplete ?
      <CheckCircleIcon className={classes.cursor} color="primary" /> :
      <RadioButtonUncheckedIcon className={classes.cursor} color="secondary" />
  }

  return (
    <Box
      className={clsx(classes.alert,
        { [classes.show]: open },
        { [classes.hide]: !open }
      )}
      boxShadow={5}
      mb={1}
      alignItems="center"
    >
      <Link
        to={{
          pathname: `/tasks/id/${todoId}`,
        }}
        className={classes.link}
        onClick={handleLinkClick}
      >
        <ListItem
          role={undefined}
          key={todoId}
          dense button
        >

          <ListItemIcon>
            {renderIcon()}
          </ListItemIcon>
          <Box>
            <ListItemText
              primary={todo.title}
              className={clsx(classes.text, {
                [classes.textLineThrough]: todo.isComplete
              })}
            />
            <NotificationsActiveIcon className={classes.notiIcon} color="secondary" />
          </Box>
        </ListItem>
      </Link>

      <Box display="flex" flexDirection="column" borderLeft={1} >
        <Box borderBottom={1}>
          <Button color="secondary" onClick={handleClickRemind}>
            Báo lại
          </Button>
        </Box>
        <Button onClick={handleCloseAlert} >Bỏ</Button>
      </Box>
    </Box>
  )
}

AlertTodo.propTypes = {
  classes: PropTypes.object,
  todoId: PropTypes.string
}

AlertTodo = React.memo(AlertTodo)
export default withStyles(styles)(AlertTodo)

