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
import axiosClient from 'api/axiosClient';
import BackdropLoading from 'components/BackdropLoading';
import Copyright from 'components/Copyright';
import isEmpty from 'is-empty';
import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MessageModal from 'components/MessageModal';
import { useStyles } from './styles';

export default function Signup() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false)
  const [messageServer, setMessageServer] = useState({})
  const [openBackdrop, setOpenBackdrop] = useState(false)

  const { message } = messageServer || 'Invalid Your Info'
  const currentUser = useSelector(state => state.user.current)
  const history = useHistory()
  const { register, errors, handleSubmit, watch } = useForm()
  const password = useRef({})
  password.current = watch('password', '')

  if (!isEmpty(currentUser)) history.push('/tasks')

  const handleOpenBackdrop = () => setOpenBackdrop(true)
  const handleCloseBackdrop = () => setOpenBackdrop(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => {
    setOpenModal(false)
    if (message === 'register succeeded') history.push('/signin')
  }

  const onSubmit = async data => {
    handleOpenBackdrop()
    try {
      const url = '/user/signup'
      const res = await axiosClient.post(url, data)

      setMessageServer(res)
      handleCloseBackdrop()
      handleOpenModal()
    } catch (error) {
      if (error.response) {
        setMessageServer(error.response.data)
        handleCloseBackdrop()
        handleOpenModal()

      } else {
        console.error(error)
      }
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                inputRef={register({ required: true, pattern: /^\w+$/i })}
                helperText={errors.username && 'invalid value'}
                error={!isEmpty(errors.username)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({ required: true, pattern: /^\w+@(\w+\.)+[a-zA-z]+$/ })}
                helperText={errors.email && 'invalid value!'}
                error={!isEmpty(errors.email) || (message === 'user allready exists')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({ required: true, minLength: 6 })}
                helperText={errors.password && 'invalid value'}
                error={!isEmpty(errors.password)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                inputRef={register({
                  required: true,
                  validate: value =>
                    value === password.current
                })}
                helperText={errors.confirmPassword && 'not match password'}
                error={!isEmpty(errors.confirmPassword)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}