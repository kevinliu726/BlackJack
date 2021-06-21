import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const EnterPasswordModal = ({ open, handleClose, handleEnter }) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPError] = useState(false);
  const [passwordWrongError, setPWError] = useState(false);
  const passwordOnChange = (event) => {
    setPWError(false);
    if (event.target.value === "") {
      setPError(true);
    } else {
      setPError(false);
    }
    setPassword(event.target.value);
  };
  const checkBeforeEnter = () => {
    if (password === "") {
      setPError(true);
    } else {
      // check password Right;
      //Right setPWError(false)
      //handleEnter
      //Wrong setPWError(wrong)
      handleEnter();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter Room</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          error={passwordError || passwordWrongError}
          onChange={passwordOnChange}
          label="Password"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={checkBeforeEnter} color="primary">
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnterPasswordModal;
