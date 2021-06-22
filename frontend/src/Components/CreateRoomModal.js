import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { FormControl, FormControlLabel, FormLabel } from "@material-ui/core";

const CreateRoomModal = ({ open, isPublic, handleClose, handleEnter }) => {
  const initValues = {
    roomName: "",
    password: "",
    deckNumber: "1",
    lower: 1,
    upper: Number.MAX_SAFE_INTEGER,
  };
  const initError = {
    roomName: false,
    password: false,
    lower: false,
    cross: false,
  };
  const [values, setValues] = useState(initValues);
  const [error, setError] = useState(initError);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === "lower" && value === "") {
      setValues({
        ...values,
        ["lower"]: 1,
      });
    } else if (name === "lower" && value === "") {
      setValues({
        ...values,
        ["upper"]: Number.MAX_SAFE_INTEGER,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };
  const handleCreate = () => {
    if (values.roomName !== "" && values.password !== "" && values.lower > 0 && values.lower <= values.upper) {
      //send Data
      handleEnter();
    } else {
      setError({
        ["roomName"]: values.roomName === "",
        ["password"]: values.password === "",
        ["lower"]: values.lower <= 0,
        ["cross"]: values.lower > values.upper,
      });
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          autoComplete="off"
          margin="dense"
          name="roomName"
          error={error.roomName}
          label="Room Name"
          type="text"
          fullWidth
          onChange={handleInputChange}
        />
        {!isPublic && (
          <TextField
            autoComplete="off"
            margin="dense"
            name="password"
            error={error.password}
            label="Password"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
        )}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <TextField
            autoComplete="off"
            label="Bet Lower Bound"
            name="lower"
            type="number"
            error={error.lower || error.cross}
            onChange={handleInputChange}
            style={{ width: "40%" }}
          ></TextField>
          <span>---</span>
          <TextField
            autoComplete="off"
            label="Bet Upper Bound"
            name="upper"
            type="number"
            error={error.cross}
            onChange={handleInputChange}
            style={{ width: "40%" }}
          ></TextField>
        </div>
        <FormControl>
          <FormLabel>Deck Number</FormLabel>
          <RadioGroup row name="deckNumber" value={values.deckNumber} onChange={handleInputChange}>
            <FormControlLabel value="1" control={<Radio />} label="one" />
            <FormControlLabel value="2" control={<Radio />} label="two" />
            <FormControlLabel value="3" control={<Radio />} label="three" />
          </RadioGroup>
        </FormControl>
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
