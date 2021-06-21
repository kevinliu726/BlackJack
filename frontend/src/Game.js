import Player from "./Components/Player";
import "./css/Game.css";

const Game = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        background: `radial-gradient(circle, #000000, #191819, #2a292a)`,
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img
        src="https://i.imgur.com/oPXcEoE.png"
        style={{ width: "80%", height: "70%", objectFit: "cover", marginBottom: "5%" }}
      />
      <Player className={"player dealer"} state={"ACTIVE"}></Player>
      <Player className={"player player_1"} state={"ACTIVE"}></Player>
      <Player className={"player player_2"} state={"ACTIVE"}></Player>
      <Player className={"player player_3"} state={"ACTIVE"}></Player>
      <Player className={"player player_4"} state={"UNSEATED"}></Player>
      <Player className={"player player_5"} state={"AWAY"}></Player>
      <Player className={"player player_6"} state={"UNSEATED"}></Player>
      <Player className={"player player_7"} state={"ACTIVE"}></Player>
      <Player className={"player player_8"} state={"TURN"}></Player>
      <Player className={"player player_9"} state={"UNSEATED"}></Player>
      <Player className={"player player_10"} state={"AWAY"}></Player>
      <Player className={"player player_11"} state={"AWAY"}></Player>
    </div>
  );
};
export default Game;
