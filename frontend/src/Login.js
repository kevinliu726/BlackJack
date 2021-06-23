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
import { LOG_IN } from "./graphql/Query";
import { useLazyQuery } from "@apollo/client";

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
  const [usernameError, setUError] = useState(false);
  const [passwordError, setPError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isLogIn, { data, loading }] = useLazyQuery(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.isLogIn) {
        window.location.href = `/Menu/${username}`;
      }
    },
  });

  const passwordOnChange = (event) => {
    if (event.target.value === "") {
      setPError(true);
    } else {
      setPError(false);
    }
    setPassword(event.target.value);
  };
  const usernameOnChange = (event) => {
    if (event.target.value === "") {
      setUError(true);
    } else {
      setUError(false);
    }
    setUsername(event.target.value);
  };
  function goToMenu() {
    if (password !== "" && username !== "") {
      isLogIn({ variables: { username, password } });
    } else {
      setUError(username === "");
      setPError(password === "");
    }
  }

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
          <h1 style={{ fontFamily: "Georgia", color: "#d5d5d5", textAlign: "center" }}>Login</h1>
          <Divider variant="fullWidth" style={{ backgroundColor: "gray", width: "100%", textAlign: "center" }} />
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
              onBlur={() => setUError(false)}
              labelWidth={70}
            />
            {usernameError && <FormHelperText style={{ color: "red" }}>Username can't be empty</FormHelperText>}
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
              onBlur={() => setPError(false)}
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
            {data && data.isLogIn === false && (
              <FormHelperText style={{ color: "red" }}>Wrong username or password.</FormHelperText>
            )}
          </FormControl>
          <div style={{ height: 10 }} />
          <Button id="login_btn" variant="contained" onClick={() => goToMenu()}>
            Log in
          </Button>
          <div style={{ height: 10 }} />
          <Button id="join_btn" onClick={() => (window.location.href = "/Register")}>
            No account? Create One
          </Button>
        </div>
        <div />
      </div>
    </div>
  );
};

export default Login;
