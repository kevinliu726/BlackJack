import React from "react";
import { Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import "./css/Menu.css";

const Menu = () => {
  const postData = () => {
    console.log("Fuck");
  };

  const goToLobby = (isPublic) => {
    if (isPublic) {
      window.location.href = "/Lobby/Public";
    } else {
      window.location.href = "/Lobby/Private";
    }
  };

  return (
    <div className="menu_container">
      <div className="menu" style={{ background: `radial-gradient(circle at center,#003300 0,black 50%)` }}>
        <Button id="left_btn" variant="contained" onClick={() => goToLobby(true)}>
          Public
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            marginBottom: "10%",
            width: "30%",
            height: "100%",
          }}
        >
          <img src="https://i.imgur.com/HbsdxjO.png" style={{ marginLeft: "4%", width: "150%", alignSelf: "center" }} />
          <div style={{ height: "25%" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignSelf: "center",
              flexDirection: "row",
              height: "8%",
            }}
          >
            <Button id="setting" variant="contained" onClick={postData}>
              Setting
            </Button>
            <Button id="history" variant="contained" onClick={postData}>
              History
            </Button>
            <Button id="rules" variant="contained" onClick={postData}>
              Rules
            </Button>
          </div>
        </div>
        <Button id="right_btn" variant="contained" onClick={() => goToLobby(false)}>
          Private
        </Button>
      </div>
      <div className="friend_list">
        <div className="friend_title">
          <div className="friend_title_text">Friends</div>
          <Button style={{ width: "10%", height: "100%", minWidth: "40px", color: "white" }}>
            <PersonAddIcon style={{ width: "100%", height: "100%" }} />
          </Button>
          <Button style={{ width: "10%", height: "100%", minWidth: "40px", color: "#d4af37" }}>
            <SearchIcon style={{ width: "100%", height: "100%" }} />
          </Button>
        </div>
        <Divider style={{ backgroundColor: "#d4af37", width: "95%", alignSelf: "center" }} />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 60,
            alignSelf: "center",
            borderBottom: "solid",
            borderWidth: "1px",
            borderColor: "grey",
          }}
        >
          <Button
            style={{
              display: "flex",
              width: 45,
              height: 45,
              minWidth: "40px",
              alignSelf: "center",
              border: "solid",
              borderWidth: "2px",
              borderColor: "white",
              borderRadius: "30px",
              backgroundColor: "grey",
              marginLeft: 10,
            }}
          >
            <PersonIcon style={{ width: "100%", height: "100%", color: "whitesmoke" }} />
          </Button>
          <div
            style={{
              display: "flex",
              width: "80%",
              height: "100%",
              marginLeft: 10,
              alignItems: "center",
              fontSize: 20,
              color: "white",
            }}
          >
            Kevin
          </div>
          {/* FriendList */}
        </div>
      </div>
    </div>
  );
};

export default Menu;
