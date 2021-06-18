import React from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Menu from "./Menu";
import Room from "./Lobby";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/Menu" exact component={Menu} />
        <Route path="/Lobby/Private" exact>
          <Room isPublic={false} room_type={"PRIVATE"} />
        </Route>
        <Route path="/Lobby/Public" exact>
          <Room isPublic={true} room_type={"PUBLIC"} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
