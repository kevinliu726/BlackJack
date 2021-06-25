import React, { useState } from "react";
import Room from "../Components/Room";
import EnterPasswordModal from "../Components/Modal/EnterPasswordModal";
import CreateRoomModal from "../Components/Modal/CreateRoomModal";
import SearchModal from "../Components/Modal/SearchModal";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import "../css/Lobby.css";
const initRoomList = [
  {
    id: 1,
    roomType: "Public",
    password: "",
    name: "Test1",
    host: "Kevin",
    playersNumber: 12,
    minBet: 20,
    maxBet: 500,
  },
  {
    id: 2,
    roomType: "Public",
    password: "",
    name: "Test2",
    host: "Kevin2",
    playersNumber: 3,
    minBet: 30,
    maxBet: 512,
  },
  {
    id: 3,
    roomType: "Private",
    password: "1234",
    name: "Test3",
    host: "Kevin3",
    playersNumber: 3,
    minBet: 30,
    maxBet: 512,
  },
];
const Lobby = ({
  match: {
    params: { username, room_type },
  },
}) => {
  const isPublic = room_type === "Public" ? true : false;
  const [enterRoomID, setEnterRoomID] = useState("");
  const [openEnterPassword, setOpenEnterPassword] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const [openSearchRoom, setOpenSearchRoom] = useState(false);
  const [roomList, setRoomList] = useState(initRoomList);
  const goBackToMenu = () => {
    window.location.href = `/Menu/${username}`;
  };
  const handleOpenSearch = () => {
    setOpenSearchRoom(true);
  };
  const handleOpenCreate = () => {
    setOpenCreateRoom(true);
  };
  const handleOpenEnterPassword = () => {
    setOpenEnterPassword(true);
  };
  const handleCloseSearch = () => {
    setOpenSearchRoom(false);
  };
  const handleCloseCreate = () => {
    setOpenCreateRoom(false);
  };
  const handleClosePassword = () => {
    setOpenEnterPassword(false);
  };

  const handleEnter = () => {
    setOpenEnterPassword(false);
    window.location.href = `/Game/${room_type}/${enterRoomID}/${username}`;
  };

  const handleCreate = (e) => {
    setOpenCreateRoom(false);
    // createRoom(roomInfo: RoomInfo): Room
    window.location.href = `/Game/${room_type}/${e}/${username}`;
  };

  const handleSearch = () => {
    setOpenSearchRoom(false);
  };

  const goToGame = (room_id) => {
    if (isPublic) {
      window.location.href = `/Game/${room_type}/${room_id}/${username}`;
    } else {
      setEnterRoomID(room_id);
      handleOpenEnterPassword();
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <Button id="back_btn" onClick={() => goBackToMenu()}>
        <ArrowBackIcon style={{ width: "100%", height: "100%" }}></ArrowBackIcon>
      </Button>
      <div className="lobby_container">
        <div className="lobby_nav_bar">
          <CreateRoomModal
            open={openCreateRoom}
            isPublic={isPublic}
            handleClose={handleCloseCreate}
            handleEnter={() => handleCreate()}
          />
          <SearchModal
            open={openSearchRoom}
            isPublic={isPublic}
            handleClose={handleCloseSearch}
            handleEnter={() => handleSearch()}
          />
          <Button id="create_btn" onClick={() => handleOpenCreate()}>
            create
          </Button>
          <div className="lobby_tag">{room_type.toUpperCase()}</div>
          <Button id="search_btn" onClick={() => handleOpenSearch()}>
            <SearchIcon style={{ width: "100%", height: "100%" }} />
          </Button>
        </div>
        <Divider variant="fullWidth" style={{ backgroundColor: "gray", width: "73%", textAlign: "center" }} />
        <div className="lobby_cascade">
          <EnterPasswordModal
            open={openEnterPassword}
            handleClose={handleClosePassword}
            handleEnter={() => handleEnter()}
          />
          {roomList.map((room) => (
            <Room
              id={room.id}
              name={room.name}
              host={room.host}
              playersNumber={room.playersNumber}
              minBet={room.minBet}
              maxBet={room.maxBet}
              goToGame={() => goToGame(room.id)}
            />
          ))}
          {roomList.length === 0 && <div className="room_warning_text">NO ROOM EXISTS</div>}
          {roomList.length % 3 === 1 && <Room fake={true} />}
          {roomList.length % 3 === 1 && <Room fake={true} />}
          {roomList.length % 3 === 2 && <Room fake={true} />}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
