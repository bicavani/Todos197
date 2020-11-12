import isEmpty from 'is-empty'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ children, ...rest }) {
  const currentUser = useSelector(state => state.user.current)

  return (
    <Route
      {...rest}
      render={() =>
        !isEmpty(currentUser) ? (
          children
        ) : (
            <Redirect to="/signin" />
          )
      }
    />
  )
}

export default PrivateRoute