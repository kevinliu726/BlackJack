import React, { useState } from "react";
import SettingModal from "./Components/SettingModal";
import { Button } from "@material-ui/core";
import "./css/Menu.css";
import HistoryModal from "./Components/HistoryModal";

const Menu = ({
  match: {
    params: { username },
  },
}) => {
  const [openSetting, setOpenSetting] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const handleOpenSetting = () => {
    setOpenSetting(true);
  };
  const handleOpenHistory = () => {
    setOpenHistory(true);
  };

  const handleCloseSetting = () => {
    setOpenSetting(false);
  };
  const handleCloseHistory = () => {
    setOpenHistory(false);
  };
  const handleSubmit = (e) => {
    console.log("Submit");
    setOpenSetting(false);
  };

  const postData = () => {
    console.log("Fuck");
    console.log(username);
  };

  const goToLobby = (isPublic) => {
    if (isPublic) {
      window.location.href = `/Lobby/${"Public"}/${username}`;
    } else {
      window.location.href = `/Lobby/${"Private"}/${username}`;
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
          <Button id="setting" variant="contained" onClick={() => handleOpenSetting()}>
            Setting
          </Button>
          <Button id="history" variant="contained" onClick={() => handleOpenHistory()}>
            History
          </Button>
          <Button id="rules" variant="contained" onClick={postData}>
            Rules
          </Button>
          <SettingModal open={openSetting} handleClose={handleCloseSetting} handleSubmit={() => handleSubmit} />
          <HistoryModal open={openHistory} handleClose={handleCloseHistory} />
        </div>
      </div>
      <Button id="right_btn" variant="contained" onClick={() => goToLobby(false)}>
        Private
      </Button>
    </div>
  );
};

export default Menu;
