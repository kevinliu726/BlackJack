import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import FormHelperText from "@material-ui/core/FormHelperText";
import "./css/Login_Register.css";
import { REGISTER } from "./graphql/Mutation";
import { useMutation } from "@apollo/client";

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
  const [usernameError, setUError] = useState(false);
  const [passwordError, setPError] = useState(false);
  const [confirmPasswordError, setCPError] = useState(false);
  const [matchError, setMError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [register, { data: registerData }] = useMutation(REGISTER, {
    onCompleted: (registerData) => {
      if (registerData && registerData.register) {
        window.location.href = `/Menu/${username}`;
      }
    },
  });

  const usernameOnChange = (event) => {
    if (event.target.value === "") {
      setUError(true);
    } else {
      setUError(false);
    }
    setUsername(event.target.value);
  };
  const passwordOnChange = (event) => {
    if (event.target.value === "") {
      setPError(true);
    } else {
      setPError(false);
    }
    setPassword(event.target.value);
  };
  const confirmPasswordOnChange = (event) => {
    setMError(false);
    if (event.target.value === "") {
      setCPError(true);
    } else {
      setCPError(false);
    }
    setConfirmPassword(event.target.value);
  };
  const goToMenu = () => {
    if (password !== "" && username !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        setMError(true);
      } else {
        register({ variables: { username, password } });
      }
    } else {
      setUError(username === "");
      setPError(password === "");
      setCPError(password === "");
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
        <img src="https://i.imgur.com/s3ekBEP.png" style={{ display: "flex", marginLeft: "1%" }}></img>
        <div style={{ display: "flex", flexDirection: "column", borderRadius: "10%" }}>
          <h1 style={{ fontFamily: "Georgia", color: "lightgray", textAlign: "center" }}>Register</h1>
          <Divider variant="fullWidth" style={{ backgroundColor: "#d5d5d5", width: "100%", textAlign: "center" }} />
          <div style={{ height: 20 }} />
          <FormControl className={classes.root} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              type="text"
              autoComplete="off"
              value={username}
              error={usernameError}
              onChange={usernameOnChange}
              labelWidth={70}
            />
            {usernameError && <FormHelperText style={{ color: "red" }}>Username can't be empty</FormHelperText>}
            {registerData && registerData.register === false && (
              <FormHelperText style={{ color: "red" }}>The username is used by other user already.</FormHelperText>
            )}
          </FormControl>
          <FormControl className={classes.root} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              value={password}
              error={passwordError}
              onChange={passwordOnChange}
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
            {passwordError && <FormHelperText style={{ color: "red" }}>Password can't be empty</FormHelperText>}
          </FormControl>
          <FormControl className={classes.root} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password2">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password2"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="off"
              value={confirmPassword}
              error={confirmPasswordError || matchError}
              onChange={confirmPasswordOnChange}
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
            {confirmPasswordError && (
              <FormHelperText style={{ color: "red" }}>Confirm Password can't be empty</FormHelperText>
            )}
            {matchError && <FormHelperText style={{ color: "red" }}>Doesn't Match with Password</FormHelperText>}
          </FormControl>
          <div style={{ height: 10 }} />
          <Button id="register_btn" variant="contained" onClick={() => goToMenu()}>
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
