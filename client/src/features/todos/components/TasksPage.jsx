// import { Box, Typography } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import React from 'react';
// import { useSelector } from 'react-redux';
// import {
//   Route, Switch
// } from 'react-router-dom';
// import MenuLeft from 'components/MenuLeft';
// import AddTodoForm from './AddTodoForm';
// import ImportantTodos from '../pages/ImportantPage';
// import MyDayTodos from './MyDayTodos';
// import PlannedTodos from '../pages/PlannedPage';
// import ResultSearchList from '../pages/ResultSearchPage';
// import Todos from './ContainerPage';
// import TodosList from './TodosList';
// import { selectAllTodos, selectTodoIds } from '../todosSlice';
// import UpdateTodoForm from './UpdateTodoForm';

// TasksPage.propTypes = {
//   searchTerm: PropTypes.string,
//   changeSearchTerm: PropTypes.func,
//   link: PropTypes.string,
//   changeLink: PropTypes.func
// }

// function TasksPage(props) {
//   const { searchTerm, link, changeLink } = props

//   const todosIds = useSelector(selectTodoIds)
//   const todos = useSelector(selectAllTodos)

//   const findTodoIdsMatchSearchTerm = () => {
//     if (!searchTerm) return []
//     return todos
//       .filter(todo =>
//         todo.title.indexOf(searchTerm) !== -1)
//       .map(todo => todo._id)
//   }

//   const todoIdsMatchSearchTerm = findTodoIdsMatchSearchTerm()

//   return (
//     <Box display="flex" >
//       <MenuLeft
//         changeLink={changeLink}
//       />
//       <Todos>
//         {link === 'tasks' && (
//           <>
//             <Typography variant="h6" color="primary" style={{ marginBottom: 16 }} >
//               Tác vụ
//               </Typography>
//             <AddTodoForm
//               placeholderInput="Thêm tác vụ"
//             />
//             <TodosList
//               todosIds={todosIds}
//             />
//           </>)}
//         {link === 'search' && (
//           <ResultSearchList
//             todoIdsMatchSearchTerm={todoIdsMatchSearchTerm}
//             searchTerm={searchTerm}
//           />
//         )}
//         {link === 'planned' && (
//           <PlannedTodos />
//         )}
//         {link === 'important' && (
//           <ImportantTodos />
//         )}
//         {link === 'myday' && (
//           <MyDayTodos />
//         )}
//       </Todos>
//       <Switch>
//         {todosIds.map(todoId => (
//           <Route
//             key={todoId}
//             exact
//             path={`/tasks/id/${todoId}`}
//           >
//             <UpdateTodoForm key={todoId} todoId={todoId} />
//           </Route>
//         ))}
//       </Switch>
//     </Box>
//   )
// }

// export default TasksPage

