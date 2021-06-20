import React, { Component } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "./css/Room.css";

class Room extends Component {
  render() {
    const { id, key, name, owner, peopleLimit, betLimit, goToGame, fake = false } = this.props;
    return (
      <button id={id} key={key} className={fake ? "room_container empty" : "room_container"} onClick={goToGame}>
        <img
          src="https://i.imgur.com/VaT2IrY.png"
          style={{
            marginLeft: "2%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            alignSelf: "center",
            opacity: 0.1,
          }}
        ></img>
        <div className="room_info">
          <div style={{ display: "flex", color: "white", fontSize: 18, fontWeight: "bold" }}>{name}</div>
          <div className="info">
            <AccountCircleIcon style={{ color: "white" }}></AccountCircleIcon>
            <div className="info_text">{owner}</div>
          </div>
          <div className="info">
            <GroupIcon style={{ color: "white" }}></GroupIcon>
            <div className="info_text">{peopleLimit + " people"}</div>
          </div>
          <div className="info">
            <AttachMoneyIcon style={{ color: "white" }}></AttachMoneyIcon>
            <div className="info_text">{betLimit}</div>
          </div>
        </div>
      </button>
    );
  }
}

export default Room;
