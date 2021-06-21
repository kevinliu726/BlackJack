import React from "react";
import { Button } from "@material-ui/core";
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
    <div className="menu" style={{ background: `radial-gradient(circle at center,#003300 0,black 50%)` }}>
      <Button id="left_btn" variant="contained" onClick={() => goToLobby(true)}>
        Public
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          marginBottom: "5%",
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
  );
};

export default Menu;
