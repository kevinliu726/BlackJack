import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const EnterPasswordModal = ({ open, handleClose, handleEnter }) => {
  const classes = makeStyles((theme) => ({
    dialog: {
      display: "flex",
      color: "black",
      borderRadius: "20px",
    },
    dialogTitle: {
      display: "flex",
      paddingBottom: "0px",
    },
    dialogActions: {
      display: "flex",
      width: "90%",
      alignSelf: "center",
      justifyContent: "space-between",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      margin: 8,
      "& label": { color: "gray" },
      "& label.Mui-focused": { color: "black" },
      "& .MuiInputAdornment-root": { color: "#black" },
      "& .MuiIconButton-label": { color: "#black" },
      "& .MuiInputBase-input": { color: "#black" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#03a9f4" },
        "&:hover fieldset": { borderColor: "#03a9f4" },
        "&.Mui-focused fieldset": { borderColor: "#03a9f4" },
      },
    },
  }))();
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
    <Dialog classes={{ paper: classes.dialog }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enter Room</DialogTitle>
      <DialogContent>
        <FormControl className={classes.form} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            error={passwordError}
            onChange={passwordOnChange}
            autoComplete="off"
            labelWidth={70}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "black" }}>
          Cancel
        </Button>
        <Button onClick={checkBeforeEnter} style={{ color: "#0288d1" }}>
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnterPasswordModal;
