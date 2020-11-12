import { Typography, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import AddTodoForm from '../components/AddTodoForm'
import ContainerPage from '../components/ContainerPage'
import TodosList from '../components/TodosList'
import { selectAllTodos } from '../todosSlice'


const styles = theme => ({
  mb: {
    marginBottom: theme.spacing(2)
  }
})

PlannedPage.propTypes = {
  classes: PropTypes.object
}

function PlannedPage(props) {
  const { classes } = props
  const todos = useSelector(selectAllTodos)

  const todosHasExpDate = todos.filter(todo => todo.expDate)
  const todosIds = todosHasExpDate.map(todo => todo._id)
  return (
    <ContainerPage>
      <Typography className={classes.mb} variant="h6" color="primary" >Đã lập kế hoạch</Typography>
      <AddTodoForm
        placeholderInput="Thêm tác vụ hết hạn vào hôm nay"
        option={{ expDate: new Date() }}
      />
      <TodosList todosIds={todosIds} />
    </ContainerPage>
  )
}

export default withStyles(styles)(PlannedPage)

