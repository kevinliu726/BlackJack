import React from "react";
import Room from "./Room";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button } from "@material-ui/core";
import "./css/Lobby.css";

const Lobby = ({ isPublic, room_type }) => {
  const goBackToMenu = () => {
    window.location.href = "/Menu";
  };
  return (
    <div style={{ position: "relative" }}>
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
              marginLeft: "4.5%",
              display: "flex",
              borderRadius: 20,
              width: "7%",
              height: "70%",
              fontFamily: "Georgia",
              fontWeight: "Bold",
              backgroundColor: "#d4af37",
            }}
          >
            create
          </Button>
          <div className="lobby_tag">{room_type}</div>
          <Button style={{ display: "flex", marginRight: "4%", width: "5%", height: "50%", color: "#d4af37" }}>
            <SearchIcon style={{ width: "100%", height: "100%" }} />
          </Button>
        </div>
        <div className="lobby_cascade">
          <Room id={1} key={1} name={"Test1"} colab={11}></Room>
          <Room id={2} key={2} name={"Test2"} colab={2}></Room>
          <Room id={3} key={3} name={"Test3"} colab={37}></Room>
          <Room id={4} key={1} name={"Test4"} colab={11}></Room>
          <Room id={5} key={2} name={"Test5"} colab={2}></Room>
          <Room id={6} key={3} name={"Test6"} colab={37}></Room>
          <Room id={7} key={1} name={"Test7"} colab={11}></Room>
          <Room id={8} key={2} name={"Test8"} colab={2}></Room>
          <Room id={9} key={3} name={"Test9"} colab={37}></Room>
          <Room id={10} key={1} name={"Test10"} colab={11}></Room>
          <Room id={11} key={2} name={"Test11"} colab={2}></Room>
          <Room id={12} key={3} name={"Test12"} colab={37}></Room>
          <Room id={13} key={3} name={"Test13"} colab={37}></Room>
          <Room id={14} key={3} name={"Test14"} colab={37}></Room>
          <Room id={14} key={3} name={"Test14"} colab={37} fake={true}></Room>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
