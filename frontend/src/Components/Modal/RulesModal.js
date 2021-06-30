import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const RulesModal = ({ open, handleClose }) => {
  const classes = makeStyles(() => ({
    dialog: {
      display: "flex",
      background: "black",
      color: "#c0c0c0",
      borderRadius: "20px",
      border: "solid",
      borderColor: "#d4af37",
      borderWidth: "2px",
      width: "50%",
      height: "70%",
    },
    dialogTitle: {
      display: "flex",
      paddingBottom: "0px",
    },
    dialogContent: {
      display: "flex",
      flexDirection: "column",
      width: "80%",
      alignSelf: "center",
      justifyContent: "flex-start",
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
      <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
        Rules
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Definition</div>
          <ul style={{ fontSize: "18px" }}>
            <li>Explosion Cards: minimum of possible points is greater than 21</li>
            <li>Special Combination: a combination that would multiply your result earning</li>
            <li>Normal Combination: if a combination os not special, it is normal</li>
          </ul>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Special Combination Bonus</div>
          <ul style={{ fontSize: "18px" }}>
            <li style={{ marginBottom: "10px" }}>
              <div>Number of Cards: 3</div>
              <div>Every Card is 7</div>
              <div>Bonus: 7 times of the bet</div>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <div>Number of Cards: 5</div>
              <div>Possible points equal 21</div>
              <div>Bonus: 5 times of the bet</div>
              <div></div>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <div>Number of Cards: 5</div>
              <div>Possible points is less than 21</div>
              <div>Bonus: 5 times of the bet</div>
              <div></div>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <div>Number of Cards: 5</div>
              <div>Minimum possible points is greater than 21</div>
              <div>Bonus: -3 times of the bet</div>
              <div></div>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <div>Number of Cards less than 5</div>
              <div>Possible points equal 21</div>
              <div>Bonus: 2 times of the bet</div>
            </li>
          </ul>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Game Flow</div>
          <div style={{ fontSize: "18px" }}>The result is judged by the following rules sequentially</div>
          <ol style={{ fontSize: "18px" }}>
            <li>
              If the initial two cards of the bank are a special combination (e.g., (A, K), (A, Q)), all the players are
              forced to battle with the bank immediately, and the game is over.
            </li>
            <li>
              If the initial two cards of the player are a special combination (e.g., (A, K), (A, Q)), the bank is
              forced to battle with the player immediately.
            </li>
            <li>If both of the bank and the player have explosion cards, the result is a tie.</li>
            <li>
              If both the bank and the player have a special combination, the result will be the bonus difference times
              the bet.
            </li>
            <li>
              If neither of the bank and the player has special combination, the result is decided by the following
              rule.
              <ul>
                <li>If one of them has the explosion cards, the other wins the bet.</li>
                <li>If the bank and the player have the same points, the result is a tie.</li>
                <li>Otherwise, the one with the higher point wins the bet.</li>
              </ul>
            </li>
          </ol>
        </>
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
