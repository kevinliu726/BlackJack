import React from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Menu from "./Menu";
import Lobby from "./Lobby";
import Game from "./Game";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/Menu/:username" exact component={Menu} />
        <Route path="/Lobby/:room_type/:username" exact component={Lobby} />
        <Route path="/Game/:hash/:username" exact={true}>
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
