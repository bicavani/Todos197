import { Typography, withStyles } from '@material-ui/core'
import { selectAllTodos } from 'features/todos/todosSlice'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import AddTodoForm from '../components/AddTodoForm'
import ContainerPage from '../components/ContainerPage'
import TodosList from '../components/TodosList'

const styles = theme => ({
  mb: {
    marginBottom: theme.spacing(2)
  }
})

ImportantPage.propTypes = {
  classes: PropTypes.object
}

function ImportantPage(props) {
  const { classes } = props
  const todos = useSelector(selectAllTodos)

  const todosImportant = todos.filter(todo => todo.isImportant)
  const todosIds = todosImportant.map(todo => todo._id)
  return (
    <ContainerPage>
      <Typography className={classes.mb} variant="h6" color="primary" >Quan trọng</Typography>
      <AddTodoForm
        placeholderInput="Thêm tác vụ Quan trọng"
        option={{ isImportant: true }}
      />
      <TodosList todosIds={todosIds} />
    </ContainerPage>
  )
}

export default withStyles(styles)(ImportantPage)

