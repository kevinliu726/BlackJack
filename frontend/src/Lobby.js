import React, { useState } from "react";
import Room from "./Room";
import EnterPasswordModal from "./Components/EnterPasswordModal";
import CreateRoomModal from "./Components/CreateRoomModal";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button, TextField } from "@material-ui/core";
import "./css/Lobby.css";

const Lobby = ({ isPublic, room_type }) => {
  const [username, setUsername] = useState("Kevin");
  const [enterRoomID, setEnterRoomID] = useState("");
  const [openEnterPassword, setOpenEnterPassword] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [openSearchRoom, setOpenSearchRoom] = useState(false);
  const goBackToMenu = () => {
    window.location.href = "/Menu";
  };

  const handleOpenCreate = () => {
    setOpenCreateRoom(true);
  };

  const handleOpenEnterPassword = () => {
    setOpenEnterPassword(true);
  };

  const handleCloseCreate = () => {
    setOpenCreateRoom(false);
  };

  const handleClosePassword = () => {
    setOpenEnterPassword(false);
  };

  const handleEnter = (e) => {
    console.log("Enter Room");
    setOpenEnterPassword(false);
    window.location.href = `/Game/${enterRoomID}/${username}`;
  };

  const handleCreate = (e) => {
    console.log("Create Room");
    setOpenCreateRoom(false);
    window.location.href = `/Game/${e}/${username}`;
  };

  const searchRoomClick = () => {
    setOpenSearchRoom(true);
  };
  const searchRoomLeave = () => {
    setOpenSearchRoom(false);
  };
  const goToGame = (room_id, isPublic) => {
    if (isPublic) {
      window.location.href = `/Game/${room_id}/${username}`;
    } else {
      setEnterRoomID(room_id);
      handleOpenEnterPassword();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <EnterPasswordModal
        open={openEnterPassword}
        handleClose={handleClosePassword}
        handleEnter={() => handleEnter()}
      />
      <CreateRoomModal
        open={openCreateRoom}
        isPublic={isPublic}
        handleClose={handleCloseCreate}
        handleEnter={() => handleCreate()}
      />
      <Button
        style={{
          display: "flex",
          position: "absolute",
          top: "7.5%",
          left: "3%",
          width: "3%",
          height: "5%",
          color: "gray",
        }}
        onClick={() => goBackToMenu()}
      >
        <ArrowBackIcon style={{ width: "100%", height: "100%" }}></ArrowBackIcon>
      </Button>
      <div className="lobby_container">
        <div className="lobby_nav_bar">
          <Button
            style={{
              marginLeft: "5.5%",
              display: "flex",
              borderRadius: 20,
              width: "7%",
              height: "70%",
              fontFamily: "Georgia",
              fontWeight: "Bold",
              backgroundColor: "#d4af37",
            }}
            onClick={() => handleOpenCreate()}
          >
            create
          </Button>
          <div className="lobby_tag">{room_type}</div>
          {!openSearchRoom && (
            <Button
              onClick={() => searchRoomClick()}
              style={{ display: "flex", marginRight: "4%", width: "5%", height: "80%", color: "#d4af37" }}
            >
              <SearchIcon style={{ width: "100%", height: "100%" }} />
            </Button>
          )}
          {openSearchRoom && (
            <TextField
              autoFocus="true"
              label="Search"
              variant="filled"
              onBlur={() => searchRoomLeave()}
              style={{
                background: "#d4af37",
                color: "#d4af37",
                border: "solid",
                height: "80%",
                borderRadius: "20px",
                marginRight: "4%",
                width: "10%",
              }}
            ></TextField>
          )}
        </div>
        <div className="lobby_cascade">
          <Room
            id={1}
            key={1}
            name={"Test1"}
            owner={"Kevin"}
            peopleLimit={12}
            betLimit={500}
            goToGame={() => goToGame(333, isPublic)}
          ></Room>
          <Room id={2} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={3} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={4} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={5} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={6} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={7} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={8} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={9} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={10} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={11} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={12} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={13} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={14} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500}></Room>
          <Room id={15} key={1} name={"Test1"} owner={"Kevin"} peopleLimit={12} betLimit={500} fake={true}></Room>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
