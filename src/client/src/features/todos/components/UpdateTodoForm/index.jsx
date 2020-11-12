import { Box, List, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FlareIcon from '@material-ui/icons/Flare';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import SaveIcon from '@material-ui/icons/Save';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { unwrapResult } from '@reduxjs/toolkit';
import clsx from 'clsx';
import BtnDeleteTodo from 'features/todos/components/BtnDeleteTodo';
import DatePicker from 'features/todos/components/DatePicker';
import Remind from 'features/todos/components/Remind';
import TimeInfo from 'features/todos/components/TimeInfo';
import { OpenUpdateTodoContext } from 'features/todos/DashBoard';
import { deleteTodo, selectTodoById, selectTodoIds, updateTodo } from 'features/todos/todosSlice';
import isEmpty from 'is-empty';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { styles } from './styles';

UpdateTodoForm.propTypes = {
  classes: PropTypes.object,
  todoId: PropTypes.string
}

function UpdateTodoForm(props) {
  const { classes } = props
  const { todoId } = useParams()
  const [updateRequestStatus, setUpdateRequestStatus] = useState('idle')

  const todo = useSelector(state => selectTodoById(state, todoId)) || {}
  const todoIds = useSelector(selectTodoIds)
  const { isUpdateTodoFormOpen, closeUpdateTodoForm } = useContext(OpenUpdateTodoContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  const [isComplete, setIsComplete] = useState(todo.isComplete)
  const [isImportant, setIsImportant] = useState(todo.isImportant)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [isMyDate, setIsMyDate] = useState(todo.isMyDate)
  const [expDate, setExpDate] = useState(todo.expDate)
  const [remindTime, setRemindTime] = useState(todo.remindTime)

  useEffect(() => {
    setIsComplete(todo.isComplete)
    setIsImportant(todo.isImportant)
    setTitle(todo.title)
    setDescription(todo.description)
    setIsMyDate(todo.isMyDate)
    setExpDate(todo.expDate)
    setRemindTime(todo.remindTime)
  }, [todoId, todo])

  useEffect(() => {
    setIsComplete(todo.isComplete)
  }, [todo.isComplete])

  useEffect(() => {
    setIsImportant(todo.isImportant)
  }, [todo.isImportant])

  const handleCheckCompleteClick = e => setIsComplete(!isComplete)
  const handleStarClick = e => setIsImportant(!isImportant)
  const handleTitleClick = e => setTitle(e.target.value)
  const handleDescriptionChange = e => setDescription(e.target.value)
  const handleMyDateClick = e => setIsMyDate(!isMyDate)
  const handleExpDateChange = date => setExpDate(date)
  const handleChangeRemind = date => setRemindTime(date)

  let canSave
  if (!isEmpty(todo)) {
    canSave = (
      Boolean(title) &&
      updateRequestStatus === 'idle' &&
      (
        isComplete !== todo.isComplete ||
        isImportant !== todo.isImportant ||
        title.trim() !== todo.title.trim() ||
        description.trim() !== todo.description.trim() ||
        isMyDate !== todo.isMyDate ||
        todo.expDate !== expDate ||
        todo.remindTime !== remindTime
      )
    )
  }

  const handleSaveClick = async () => {
    if (canSave) {
      try {
        setUpdateRequestStatus('pending')
        const resultAction = await dispatch(
          updateTodo([
            todoId,
            {
              isComplete: isComplete,
              isImportant: isImportant,
              title: title.trim(),
              description: description.trim(),
              isMyDate,
              expDate,
              remindTime
            }
          ])
        )
        unwrapResult(resultAction)
        closeUpdateTodoForm()
        history.push(`/tasks/id/${todoId}`, {
          from: pathname,
          type: /id/g.test(pathname) ?
            location.state.type :
            pathname.split('/').slice(0, 3).join('/')
        })
      } catch (error) {
        console.log('Failed to update the todo: ', error)
      } finally {
        setUpdateRequestStatus('idle')
      }
    }
  }

  const nextTodoId = () => {
    const index = todoIds.indexOf(todoId)
    if (index === -1) return
    if (index === 0) return todoIds[index + 1]
    return todoIds[index - 1]
  }

  const handleDeleteClick = async () => {
    try {
      const resultAction = await dispatch(
        deleteTodo(todoId)
      )
      unwrapResult(resultAction)
      closeUpdateTodoForm()
      history.push(`/tasks/id/${nextTodoId()}`, {
        from: pathname,
        type: /id/g.test(pathname) ?
          location.state.type :
          pathname.split('/').slice(0, 3).join('/')
      })
    } catch (error) {
      console.log('Failed to update the todo: ', error)
    }
  }
  const renderIcon = () =>
    isComplete ?
      <CheckCircleIcon color="primary" /> :
      <RadioButtonUncheckedIcon color="secondary" />

  if (!todo) {
    return <h2 style={{ marginTop: 300 }}> Todo not found</h2>
  }

  return (
    <Box className={isUpdateTodoFormOpen ? classes.container : ''}>
      <Box className={clsx(classes.root,
        { [classes.show]: isUpdateTodoFormOpen },
        { [classes.hide]: !isUpdateTodoFormOpen }
      )}>
        <List className={classes.list}>
          <ListItem className={classes.paper}>
            <ListItemIcon>
              <IconButton edge="end" aria-label="important" onClick={handleCheckCompleteClick}>
                {renderIcon()}
              </IconButton>
            </ListItemIcon>
            <TextField
              id="todoTitle"
              placeholder=""
              multiline
              fullWidth
              onChange={handleTitleClick}
              value={title}
              error={!Boolean(title)}
              helperText={!Boolean(title) && 'invalid title'}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="important" onClick={handleStarClick}>
                <Tooltip title="Đánh dấu tác vụ là quan trọng">
                  <StarBorderIcon color={isImportant ? 'primary' : 'disabled'} />
                </Tooltip>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className={clsx(classes.paper, classes.padding0)}>
            <TextField
              id="todo-Description"
              label="Ghi chú..."
              multiline
              rows={4}
              placeholder="Thêm mô tả...."
              variant="outlined"
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
            />
          </ListItem>

          <ListItem
            role={undefined}
            dense button
            className={classes.paper}
            onClick={handleMyDateClick}
          >
            <ListItemIcon>
              <FlareIcon color={isMyDate ? 'primary' : 'disabled'} />
            </ListItemIcon>
            <ListItemText
              primary="Thêm vào ngày của tôi"
            />
          </ListItem>
          <DatePicker
            expDate={todo.expDate}
            handleExpDateChange={handleExpDateChange} />
          <Remind
            remindTime={todo.remindTime}
            handleChangeRemind={handleChangeRemind}
          />
          <Box display="flex" justifyContent="space-between" mt={3}>
            <IconButton aria-label="delete" onClick={closeUpdateTodoForm}>
              <ArrowBackIosIcon />
            </IconButton>
            <Box display="flex">
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 4 }}
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleSaveClick}
                disabled={!canSave}
              >
                Save
              </Button>
              <BtnDeleteTodo
                todoTitle={todo.title}
                handleSubmitDelete={handleDeleteClick}
              />
            </Box>
          </Box>
          <Box>
            <TimeInfo todo={todo} />
          </Box>
        </List>
      </Box>
    </Box>
  )

}

export default withStyles(styles)(UpdateTodoForm)

