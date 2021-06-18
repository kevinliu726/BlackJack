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

const Login = () => {
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
  const [showPassword, setShowPassword] = useState(false);
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
    <Grid container style={{ minHeight: "100vh", minWidth: "100vh" }}>
      <Grid item xs={12} sm={6} style={{ display: "flex", justifyContent: "center", background: "#000000" }}>
        <img
          src="https://i.imgur.com/68CxQO4.jpg"
          style={{ display: "flex", marginBottom: "25%", marginLeft: "20%", width: "80%", objectFit: "contain" }}
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        style={{ padding: 10, background: `radial-gradient(circle at center,#003300 0,black 70%)` }}
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <img src="https://i.imgur.com/Embdpbt.png"></img>
        <div style={{ display: "flex", flexDirection: "column", padding: 30, borderRadius: "10%" }}>
          <h1 style={{ color: "#d5d5d5", textAlign: "center" }}>Login</h1>
          <Divider variant="fullWidth" style={{ backgroundColor: "gray", width: "100%", textAlign: "center" }} />
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
                    onClick={(event) => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <div style={{ height: 10 }} />
          <Button id="login_btn" variant="contained" onClick={() => (window.location.href = "/Menu")}>
            Log in
          </Button>
          <div style={{ height: 10 }} />
          <Button id="join_btn" onClick={() => (window.location.href = "/Register")}>
            No account? Create One
          </Button>
        </div>
        <div />
      </Grid>
    </Grid>
  );
};

export default Login;
