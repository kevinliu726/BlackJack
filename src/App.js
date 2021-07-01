import React from "react";
import "./App.css";
import Login from "./Containers/Login";
import Register from "./Containers/Register";
import Menu from "./Containers/Menu";
import Lobby from "./Containers/Lobby";
import Game from "./Containers/Game";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {createBrowserHistory} from "history";

const history = createBrowserHistory({forceRefresh: true});

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/Menu/:username" exact component={Menu} />
        <Route path="/Lobby/:room_type/:username" exact component={Lobby} />
        <Route path="/Game/:room_type/:room_id/:username" exact component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
