import React, { useState } from "react";
import clsx from "clsx";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import "./css/Login_Register.css";

const Register = () => {
  const classes = makeStyles({
    root: {
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
  })();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleEnter = (e, now) => {
    if (e.key === "Enter") {
      if (now === "username") {
        let next = e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0];
        next.focus();
      } else if (now === "password") {
        let next = e.target.parentNode.parentNode.parentNode.childNodes[3];
        next.click();
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh", minWidth: "100vh" }}>
      <div style={{ display: "flex", width: "50%", justifyContent: "center", background: "#000000" }}>
        <img
          src="https://i.imgur.com/68CxQO4.jpg"
          style={{ display: "flex", marginBottom: "25%", marginLeft: "20%", width: "80%", objectFit: "contain" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          width: "50%",
          background: `radial-gradient(circle at center,#003300 0,black 70%)`,
        }}
      >
        <img src="https://i.imgur.com/WnjOzIH.png" style={{ display: "flex" }}></img>
        <div style={{ display: "flex", flexDirection: "column", borderRadius: "10%" }}>
          <h1 style={{ color: "lightgray", textAlign: "center" }}>Register</h1>
          <Divider variant="fullWidth" style={{ backgroundColor: "#d5d5d5", width: "100%", textAlign: "center" }} />
          <div style={{ height: 20 }} />
          <FormControl className={clsx(classes.root)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              type="text"
              autoComplete="off"
              value={username}
              onKeyPress={(event) => {
                handleEnter(event, "username");
              }}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={clsx(classes.root)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              value={password}
              onKeyPress={(event) => {
                handleEnter(event, "password");
              }}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className={clsx(classes.root)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="off"
              value={confirmPassword}
              onKeyPress={(event) => {
                handleEnter(event, "password");
              }}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={132}
            />
          </FormControl>
          <div style={{ height: 10 }} />
          <Button id="register_btn" variant="contained" onClick={() => (window.location.href = "/Menu")}>
            Register
          </Button>
          <div style={{ height: 10 }} />
          <Button id="back_to_login_btn" onClick={() => (window.location.href = "/Login")}>
            Back To Login
          </Button>
        </div>
        <div />
      </div>
    </div>
  );
};

export default Register;
