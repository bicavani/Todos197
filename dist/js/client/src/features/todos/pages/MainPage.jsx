import { Typography, withStyles } from '@material-ui/core'
import { selectTodoIds } from 'features/todos/todosSlice'
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

MainPage.propTypes = {
  classes: PropTypes.object
}

function MainPage() {
  const todosIds = useSelector(selectTodoIds)

  return (
    <ContainerPage>
      <Typography variant="h6" color="primary" style={{ marginBottom: 16 }} >
        Tác vụ
      </Typography>
      <AddTodoForm
        placeholderInput="Thêm tác vụ"
      />
      <TodosList
        todosIds={todosIds}
      />
    </ContainerPage>
  )
}

export default withStyles(styles)(MainPage)

