import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const CreateRoomModal = ({ open, isPublic, handleClose, handleEnter }) => {
  const [roomName, setRoomName] = useState("");
  const [roomNameError, setRError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPError] = useState(false);
  const [lower, setLower] = useState(1);
  const [lowerError, setLError] = useState(false);
  const [upper, setUpper] = useState(Number.MAX_SAFE_INTEGER);
  const [crossError, setCError] = useState(false);
  const roomNameOnChange = (event) => {
    if (event.target.value === "") {
      setRError(true);
    } else {
      setRError(false);
    }
    setRoomName(event.target.value);
  };
  const passwordOnChange = (event) => {
    if (event.target.value === "") {
      setPError(true);
    } else {
      setPError(false);
    }
    setPassword(event.target.value);
  };
  const lowerOnChange = (event) => {
    setCError(false);
    if (event.target.value !== "" && event.target.value <= 0) {
      setLError(true);
    } else {
      setLError(false);
    }
    if (event.target.value !== "") {
      setLower(event.target.value);
    } else {
      setLower(1);
    }
  };
  const upperOnChange = (event) => {
    setCError(false);
    setUpper(event.target.value);
  };
  const handleCreate = () => {
    if (roomName !== "" && password !== "" && lower > 0 && lower <= upper) {
      //send Data
      handleEnter();
    } else {
      setRError(roomName === "");
      setPError(password === "");
      setLError(lower <= 0);
      setCError(lower > upper);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="Name"
          error={roomNameError}
          label="Room Name"
          type="text"
          fullWidth
          onChange={roomNameOnChange}
        />
        {!isPublic && (
          <TextField
            autoFocus
            margin="dense"
            id="Password"
            error={passwordError}
            label="Password"
            type="text"
            fullWidth
            onChange={passwordOnChange}
          />
        )}
        <span>Bet</span>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <TextField
            label="Lower Bound"
            type="number"
            error={lowerError || crossError}
            onChange={lowerOnChange}
            style={{ width: "40%" }}
          ></TextField>
          <span>---</span>
          <TextField
            label="Upper Bound"
            type="number"
            error={crossError}
            onChange={upperOnChange}
            style={{ width: "40%" }}
          ></TextField>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleCreate()} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomModal;
