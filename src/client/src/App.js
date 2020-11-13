import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { setAuthTokenRequest } from 'api/axiosClient';
import LandingPage from 'components/LandingPage';
import PrivateRoute from 'components/PrivateRoute';
import { setUser } from 'features/user/userSlice';
import jwt_decode from 'jwt-decode';
import React, { Suspense, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import Signin from './features/auth/pages/Signin';
import Signup from './features/auth/pages/Signup';
import DashBoard from './features/todos/DashBoard';
import ResetPassword from './features/user/ResetPassword';
import GetEmailResetPassword from './features/user/GetEmailResetPassword';


function App() {
  // switch view Darkmode
  const [prefersDarkMode, setPrefersDarkMode] = useState(false)

  let theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );
  const switchDarkMode = () => setPrefersDarkMode(!prefersDarkMode)

  theme = responsiveFontSizes(theme)

  const dispatch = useDispatch()
  const windowRef = useRef(window.location)

  //Auth User
  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken
    const decoded = jwt_decode(token)

    const currentTime = Date.now() / 1000
    if (!decoded || decoded.exp < currentTime) {
      windowRef.current.href = "/signin"
      localStorage.removeItem('jwtToken')
    } else {
      setAuthTokenRequest(token)
      dispatch(setUser(decoded))
    }
  }


  return (
    <div className="App">
      <Suspense fallback={<div>Loding Todos197...</div>}>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route path="/user/reset-password" component={ResetPassword} />
                <Route exact path="/user/forgot-password" component={GetEmailResetPassword} />
                <PrivateRoute path='/tasks'>
                  <DashBoard
                    prefersDarkMode={prefersDarkMode}
                    switchDarkMode={switchDarkMode}
                  />
                </PrivateRoute>
              </Switch>
            </CssBaseline>
          </ThemeProvider>
        </Router>
      </Suspense>
    </div>

  );
}

export default App;
