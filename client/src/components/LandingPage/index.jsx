import { Box, Button, Typography, withStyles } from '@material-ui/core';
import Loading from 'components/Loading';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './img/logo.png';
import welcomeCenter from './img/welcome-center.png';
import welcomeLeft from './img/welcome-left.png';
import welcomeRigth from './img/welcome-right.png';

const styles = theme => ({

})

LandingPage.propTypes = {

};

function LandingPage() {
  const [open, setOpen] = useState(true)

  const history = useHistory()

  const handleClickSignin = () => {
    setOpen(false)
    setTimeout(() => {
      history.push('./signin')
    }, 1000)
  }

  const handleClickSignup = () => {
    setOpen(false)
    setTimeout(() => {
      history.push('./signup')
    }, 1000)
  }

  return (
    <Box>
      {!open && <Loading />}
      {open &&
        <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
          <Box width="20%" display={{ xs: 'none', md: 'block' }}>
            <img src={welcomeLeft} height="430px" alt="welcome-left" />
          </Box>
          <Box
            height="100vh"
            display="flex"
            flexDirection={{ xs: 'column' }}
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <img src={logo} alt="logo" height="79px" />
            </Box>
            <Box py={2} >
              <Typography variant="h3">Welcome Todos197</Typography>
            </Box>
            <Box px={3} textAlign="center" mb={4}>
              <Typography variant="subtitle1">Todos197 mang đến cho bạn sự tập trung từ công việc cho đến giải trí</Typography>
            </Box>
            <Box mb={2} display={{ md: 'none' }} >
              <img src={welcomeCenter} alt="welcome-center" height="183px" />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickSignin}
            >
              Đăng nhập
          </Button>
            <Button
              color="primary"
              onClick={handleClickSignup}
            >
              Đăng ký
          </Button>
          </Box>
          <Box width="20%" display={{ xs: 'none', md: 'block' }}>
            <img src={welcomeRigth} height="515px" alt="welcome-right" />
          </Box>
        </Box>}
    </Box>
  );
}

export default withStyles(styles)(LandingPage);