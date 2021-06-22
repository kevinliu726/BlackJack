import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const SearchModal = ({ open, handleClose, handleEnter }) => {
  const [roomName, setRoomName] = useState("");
  const [roomNameError, setRNError] = useState(false);
  const roomNameOnChange = (event) => {
    if (event.target.value === "") {
      setRNError(true);
    } else {
      setRNError(false);
    }
    setRoomName(event.target.value);
  };
  const handleSearch = () => {
    if (roomName !== "") {
      handleEnter();
    } else {
      setRNError(roomName === "");
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Search Room</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          error={roomNameError}
          onChange={roomNameOnChange}
          label="Room Name"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSearch} color="primary">
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchModal;
