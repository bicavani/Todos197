import { Box, withStyles } from '@material-ui/core';
import { getUser } from 'app/userSlice';
import MenuLeft from 'components/MenuLeft';
import NavBar from 'components/NavBar';
import AlertTodosList from 'features/todos/components/AlertTodosList';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import UpdateTodoForm from './components/UpdateTodoForm';
import ImportantPage from './pages/ImportantPage';
import MainPage from './pages/MainPage';
import MyDayPage from './pages/MyDayPage';
import PlannedPage from './pages/PlannedPage';
import ResultSearchPage from './pages/ResultSearchPage';
import { fetchTodos, selectAllTodos } from './todosSlice';

const styles = theme => ({

})

export const OpenUpdateTodoContext = React.createContext()

DashBoard.propTypes = {
  prefersDarkMode: PropTypes.bool,
  switchDarkMode: PropTypes.func
}

function DashBoard(props) {
  const { prefersDarkMode, switchDarkMode } = props

  const [todoIdsMatchSearchTerm, setTodoIdsMatchSearchTerm] = useState([])
  const [isUpdateTodoFormOpen, setIsUpdateTodoFormOpen] = useState(false)

  const todos = useSelector(selectAllTodos)
  const todosStatus = useSelector(state => state.todos.status)

  const dispatch = useDispatch()
  const match = useRouteMatch()
  const location = useLocation()

  useEffect(
    () => {
      if (todosStatus === 'idle') {
        dispatch(fetchTodos())
      }
    }, [todosStatus, dispatch]
  )
  useEffect(
    () => {
      dispatch(getUser())
    }, [dispatch]
  )

  const openUpdateTodoForm = () => setIsUpdateTodoFormOpen(true)
  const closeUpdateTodoForm = () => setIsUpdateTodoFormOpen(false)

  const todosHasRemind = todos.filter(todo => todo.remindTime)
  const todoIdsHasRemind = todosHasRemind.map(todo => todo._id)

  const findTodoIds = str => {
    if (!str) return []
    return todos
      .filter(todo =>
        todo.title.indexOf(str) !== -1)
      .map(todo => todo._id)
  }
  const submitSearchForm = (searchTerm) => {
    setTodoIdsMatchSearchTerm(findTodoIds(searchTerm))
  }

  return (
    <OpenUpdateTodoContext.Provider
      value={{
        isUpdateTodoFormOpen: isUpdateTodoFormOpen,
        openUpdateTodoForm: openUpdateTodoForm,
        closeUpdateTodoForm: closeUpdateTodoForm
      }}
    >
      <Box>
        <NavBar
          darkMode={prefersDarkMode}
          switchDarkMode={switchDarkMode}
          submitSearchForm={submitSearchForm}
        />
        <Box display="flex">
          <MenuLeft />
          <Switch>
            <Route exact path={match.url} component={MainPage} />
            <Route
              path={`${match.url}/search/:searchTerm`}
              render={() =>
                <ResultSearchPage todoIds={todoIdsMatchSearchTerm} />
              }
            />
            <Route path={`${match.url}/planned`} component={PlannedPage} />
            <Route path={`${match.url}/important`} component={ImportantPage} />
            <Route path={`${match.url}/myday`} component={MyDayPage} />
            <Route exact path={`${match.url}/id/:todoId`}
              render={() => {
                const type = location.state.type
                switch (type) {
                  case '/tasks':
                    return (
                      <>
                        <MainPage />
                        <UpdateTodoForm />
                      </>
                    )
                  case '/tasks/planned':
                    return (
                      <>
                        <PlannedPage />
                        <UpdateTodoForm />
                      </>
                    )
                  case '/tasks/important':
                    return (
                      <>
                        <ImportantPage />
                        <UpdateTodoForm />
                      </>
                    )
                  case '/tasks/myday':
                    return (
                      <>
                        <MyDayPage />
                        <UpdateTodoForm />
                      </>
                    )
                  case '/tasks/search':
                    return (
                      <>
                        <ResultSearchPage todoIds={todoIdsMatchSearchTerm} />
                        <UpdateTodoForm />
                      </>
                    )
                  default:
                    return
                }
              }}
            />
          </Switch>
          <AlertTodosList todoIds={todoIdsHasRemind} />
        </Box>
      </Box>
    </OpenUpdateTodoContext.Provider>
  )
}

export default withStyles(styles)(DashBoard)

