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

import { ImGithub } from "react-icons/im";
import "./css/Login.css";

const postData = () => {
  console.log("Fuck");
};

const useStyles = makeStyles({
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
});

const Login = () => {
  const classes = useStyles();
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
    <div>
      <Grid container style={{ minHeight: "100vh", minWidth: "100vh" }}>
        <Grid item xs={12} sm={6} style={{ background: "#000000" }}>
          <img src="https://i.imgur.com/QLvVzn4.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          style={{ padding: 10, background: `radial-gradient(circle at center,#003300 0,black 70%)` }}
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <div />
          <div style={{ display: "flex", flexDirection: "column", padding: 30, borderRadius: "10%" }}>
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
            <Button id="login_btn" variant="contained" onClick={postData}>
              Log in
            </Button>
            <div style={{ height: 10 }} />
            <Button id="login_btn" variant="contained" onClick={postData}>
              Register
            </Button>
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
