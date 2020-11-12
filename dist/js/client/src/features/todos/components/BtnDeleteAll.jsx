import { Box, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllTodos, selectTodoIds } from '../todosSlice';

const styles = theme => {

}

function BtnDeleteAll(props) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch()
  const todoIds = useSelector(selectTodoIds)

  const handleClickAgree = async () => {
    if (todoIds.length > 0) {
      try {
        const resultAction = await dispatch(
          deleteAllTodos()
        )
        unwrapResult(resultAction)
        handleClose()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex">
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
        disabled={Boolean(todoIds.length === 0)}
      >
        Delete All
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Tất cả dữ liệu sẽ bị xóa vĩnh viễn.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn sẽ không thể hoàn tác hành động này.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" size="small">
            Hủy bỏ
          </Button>
          <Button onClick={handleClickAgree} variant="contained" color="secondary" size="small" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box >
  );
}

export default withStyles(styles)(BtnDeleteAll)