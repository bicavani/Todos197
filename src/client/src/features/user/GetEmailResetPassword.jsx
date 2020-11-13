import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axiosClient from 'api/axiosClient';
import BackdropLoading from 'components/BackdropLoading';
import Copyright from 'components/Copyright';
import MessageModal from 'components/MessageModal';
import isEmpty from 'is-empty';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const [messageServer, setMessageServer] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)

  const { message } = messageServer || 'invalid info'
  const history = useHistory()

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => {
    setOpenModal(false)
    if (message === 'Send email succeeded') {
      history.push('/signin')
    }
  }
  const handleOpenBackdrop = () => setOpenBackdrop(true)
  const handleCloseBackdrop = () => setOpenBackdrop(false)

  const { register, errors, handleSubmit } = useForm()
  const onSubmit = async data => {
    handleOpenBackdrop()
    try {
      const url = '/user/get-emailreset'
      const res = await axiosClient.post(url, data)

      setMessageServer(res)
      handleCloseBackdrop()
      handleOpenModal()

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
          Reset Password
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
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit(onSubmit)}
            >
              Send
            </Button>
            <Button
              type="submit"
              color="secondary"
              className={classes.submit}
              onClick={() => history.push('/signin')}
            >
              Back to Signin
            </Button>
          </Box>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}