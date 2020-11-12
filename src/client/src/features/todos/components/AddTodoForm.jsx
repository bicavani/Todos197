import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTodo } from '../todosSlice';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginBottom: 0,
    width: '95%',
  },
})

AddTodoForm.propTypes = {
  classes: PropTypes.object,
  placeholderInput: PropTypes.string,
  option: PropTypes.object
}

function AddTodoForm(props) {
  const [title, setTitle] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [isFocusForm, setIsFocusForm] = useState(null)
  const { classes, placeholderInput, option } = props

  const dispatch = useDispatch()
  const inputRef = useRef()
  const windowRef = useRef(window)

  const handleInputChange = e => {
    e.preventDefault()
    setTitle(e.target.value)
  }
  const handleInputClick = e => {
    e.preventDefault()
    setIsFocusForm(true)
  }

  useEffect(() => {
    if (isFocusForm) {
      windowRef.current.addEventListener('click', (e) => {
        if (e.target !== inputRef.current) setIsFocusForm(false)
      })
    }
    return windowRef.current.removeEventListener('click', (e) => {
      if (e.target !== inputRef.current) setIsFocusForm(false)
    })
  }, [isFocusForm])

  const canSubmit = Boolean(title) && addRequestStatus === 'idle'
  const handleFormSubmit = async () => {
    if (canSubmit) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewTodo({
            title: title.trim(),
            isComplete: false,
            ...option
          })
        )
        unwrapResult(resultAction)
        setTitle('')
      } catch (error) {
        console.log('Failed to save the todo: ', error)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }
  const handleInputKeyUp = e => {
    e.preventDefault()
    if (e.keyCode === 13) {
      handleFormSubmit()
    }
  }
  const renderIcon = () => {
    if (isFocusForm) {
      return <RadioButtonUncheckedIcon />
    } else {
      return <AddIcon id="addIcon" />
    }
  }

  return (
    <FormControl
      id="addTodo"
      className={classes.formControl}
    >
      <InputLabel id="addTodo-Label" htmlFor="addTodo">{placeholderInput}</InputLabel>
      <Input
        inputRef={inputRef}
        value={title}
        id="addTodo-Input"
        onClick={handleInputClick}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
        startAdornment={
          <InputAdornment id="addTodo-Ador" position="start">
            {renderIcon()}
          </InputAdornment>
        }
      />
    </FormControl>
  )

}

export default withStyles(styles)(AddTodoForm)

