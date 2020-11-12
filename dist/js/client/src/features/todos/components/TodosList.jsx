import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import SkeletonTodo from 'components/SkeletonTodo';
import TodoExcerpt from './TodoExcerpt';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(3),
  },
});

TodoList.propTypes = {
  classes: PropTypes.object,
  todosIds: PropTypes.array
}

function TodoList(props) {
  const { classes, todosIds } = props
  const todosStatus = useSelector(state => state.todos.status)
  const error = useSelector(state => state.todos.error)

  let content
  if (todosStatus === 'loading') {
    content = <SkeletonTodo />
  } else if (todosStatus === 'succeeded') {
    content = todosIds.map(todoId =>
      <TodoExcerpt
        key={todoId}
        todoId={todoId}
      />
    )
  } else if (todosStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <List className={classes.root}>
      {content}
    </List>
  );
}

export default withStyles(styles)(TodoList)

