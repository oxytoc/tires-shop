import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { setLoginOpenned, setLoginDialogOpenned } from "../../redux/slices/drawerSlice";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog() {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setLoginDialogOpenned(false))
  };

  const { loginDialogOpenned } = useSelector(state => state.drawerSlice);

  const onClickOpenLogin = () => {
    dispatch(setLoginDialogOpenned(false))
    dispatch(setLoginOpenned(true))
  }

  return (
    <div>
      <Dialog
        open={loginDialogOpenned}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Войдите в аккаунт"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Войдите в аккаунт, чтобы совершить данной действие
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button onClick={onClickOpenLogin}>Войти</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}