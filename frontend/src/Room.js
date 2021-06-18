import React, { Component } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "./css/Room.css";

class Room extends Component {
  render() {
    const { id, key, name, colab, fake = false } = this.props;
    return (
      <div id={id} key={key} className={fake ? "room_container empty" : "room_container"}>
        <img
          src="https://i.imgur.com/VaT2IrY.png"
          style={{
            marginLeft: "2%",
            width: "150%",
            height: "125%",
            objectFit: "contain",
            alignSelf: "center",
            opacity: 0.1,
          }}
        ></img>
        <div className="room_info">
          <div style={{ display: "flex", color: "white", fontSize: 18, fontWeight: "bold" }}>{name}</div>
          <div>
            <AccountCircleIcon style={{ color: "white" }}></AccountCircleIcon>
          </div>
          <div>
            <GroupIcon style={{ color: "white" }}></GroupIcon>
          </div>
          <div>
            <AttachMoneyIcon style={{ color: "white" }}></AttachMoneyIcon>
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
