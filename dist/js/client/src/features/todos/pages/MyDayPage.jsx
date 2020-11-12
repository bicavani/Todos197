import { Box, Typography, withStyles } from '@material-ui/core'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import AddTodoForm from '../components/AddTodoForm'
import ContainerPage from '../components/ContainerPage'
import TodosList from '../components/TodosList'
import { selectAllTodos } from '../todosSlice'


const styles = theme => ({
  caption: {
    marginLeft: theme.spacing(1),
    opacity: 0.8
  }
})

MyDayTodos.propTypes = {
  classes: PropTypes.object
}

function MyDayTodos(props) {
  const { classes } = props
  const todos = useSelector(selectAllTodos)
  const today = format(new Date(), 'E, LLL do yyyy')

  const todosCreatedToday = todos.filter(todo => todo.isMyDate)
  const todosIds = todosCreatedToday.map(todo => todo._id)
  return (
    <ContainerPage>
      <Box mb={3}>
        <Typography variant="h6" color="primary" >Ngày của tôi</Typography>
        <Typography className={classes.caption} variant="caption" >{today}</Typography>
      </Box>
      <AddTodoForm
        placeholderInput="Thêm tác vụ"
      />
      <TodosList todosIds={todosIds} />
    </ContainerPage>
  )
}

export default withStyles(styles)(MyDayTodos)

