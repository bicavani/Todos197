import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axiosClient, { setAuthTokenRequest } from 'api/axiosClient';
import { setUser } from 'features/user/userSlice';
import BackdropLoading from 'components/BackdropLoading';
import Copyright from 'components/Copyright';
import MessageModal from 'components/MessageModal';
import isEmpty from 'is-empty';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';

export default function Signin() {
  const classes = useStyles();
  const [messageServer, setMessageServer] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)

  const { message } = messageServer || 'invalid info'
  const currentUser = useSelector(state => state.user.current)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(
    () => {
      if (!isEmpty(currentUser)) history.push('/tasks')
    }, [currentUser, history]
  )

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const handleOpenBackdrop = () => setOpenBackdrop(true)
  const handleCloseBackdrop = () => setOpenBackdrop(false)

  const { register, errors, handleSubmit } = useForm()
  const onSubmit = async data => {
    handleOpenBackdrop()
    try {
      const url = '/user/login'
      const res = await axiosClient.post(url, data)
      const { token } = res
      const decoded = jwtDecode(token)

      localStorage.setItem('jwtToken', token)
      setAuthTokenRequest(token)
      handleCloseBackdrop()
      dispatch(setUser(decoded))

    } catch (error) {
      if (error.response) {
        setMessageServer(error.response.data)
        handleCloseBackdrop()
        handleOpenModal()
      } else console.error(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <BackdropLoading open={openBackdrop} />
      <MessageModal
        open={openModal}
        message={message}
        handleClose={handleCloseModal}
      />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({ required: true, pattern: /^\w+@(\w+\.)+[a-zA-z]+$/ })}
            helperText={(errors.email && 'invalid value')}
            error={!isEmpty(errors.email) || (message === 'user not exists')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: true, minLength: 6 })}
            helperText={(errors.password && 'invalid value')}
            error={!isEmpty(errors.password) || (message === 'incorrect password')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/user/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}