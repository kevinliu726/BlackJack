import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const RulesModal = ({ open, handleClose }) => {
  const classes = makeStyles(() => ({
    dialog: {
      display: "flex",
      background: "#615c5c",
      color: "#c0c0c0",
      borderRadius: "20px",
      width: "30%",
      height: "70%",
    },
    dialogContent: {
      display: "flex",
      flexDirection: "row",
      width: "80%",
      alignSelf: "center",
      justifyContent: "center",
      overflow: "scroll",
    },
    dialogActions: {
      display: "flex",
      width: "90%",
      alignSelf: "center",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      margin: 8,
      "& label": { color: "#c0c0c0" },
      "& label.Mui-focused": { color: "#d5d5d5" },
      "& .MuiInputAdornment-root": { color: "#c0c0c0" },
      "& .MuiIconButton-label": { color: "#c0c0c0" },
      "& .MuiInputBase-input": { color: "#c0c0c0" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#c0c0c0" },
        "&:hover fieldset": { borderColor: "#d5d5d5" },
        "&.Mui-focused fieldset": { borderColor: "#d5d5d5" },
      },
    },
  }))();
  return (
    <Dialog classes={{ paper: classes.dialog }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent className={classes.dialogContent}>
        <div style={{ width: "100vw" }}>
          <img src="https://www.chuangkit.com/yy-folder/img/ctp5.jpg" style={{ width: "100%" }}></img>
          <img src="https://www.chuangkit.com/yy-folder/img/ctp5.jpg" style={{ width: "100%" }}></img>
        </div>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleClose} style={{ color: "#03a9f4" }}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default RulesModal;
