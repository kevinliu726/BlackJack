import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../css/Modal.css";

const EnterPasswordModal = ({ open, handleClose, handleEnter }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter Room</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="name" label="Password" type="email" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEnter} color="primary">
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CreateRoomModal = ({ open, handleClose, handleEnter }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="Password" label="Room Name" type="text" fullWidth />
        <TextField autoFocus margin="dense" id="Password" label="Password" type="text" fullWidth />
        <TextField autoFocus margin="dense" id="Limit" label="Bet Limit" type="number" fullWidth />
        <TextField autoFocus margin="dense" id="Limit" label="Bet Limit" type="number" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEnter()} color="primary">
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export { EnterPasswordModal, CreateRoomModal };
