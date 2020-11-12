import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

Modal.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  handleClose: PropTypes.func
}

export default function MessageModal({ open, handleClose, message }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{message}</h2>
            <p id="transition-modal-description">
              {message === 'register succeeded' ?
                'Login để sử dụng app' :
                'Kiểm tra lại thông tin của bạn'
              }
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

