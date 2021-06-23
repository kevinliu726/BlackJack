import Player from "./Components/Player";
import "./css/Game.css";
import { useEffect, useState } from "react";
const players = [
  {
    name: "K1",
    index: 0,
    state: "TURN",
    isBank: false,
  },
  {
    name: "K2",
    index: 1,
    state: "ACTIVE",
    isBank: false,
  },
  {
    name: "K3",
    index: 2,
    state: "AWAY",
    isBank: false,
  },
  {
    name: "K4",
    index: 3,
    state: "ACTIVE",
    isBank: false,
  },
  {
    name: "K5551",
    index: 4,
    state: "ACTIVE",
    isBank: false,
  },
  {
    name: "K1q",
    index: 5,
    state: "ACTIVE",
    isBank: false,
  },
  {
    name: "K1ee",
    index: 6,
    state: "ACTIVE",
    isBank: false,
  },
  {
    name: "Kwet1",
    index: 7,
    state: "ACTIVE",
    isBank: false,
  },
  {
    name: "K1we",
    index: 8,
    state: "UNSEATED",
    isBank: false,
  },
  {
    name: "K1tt",
    index: 9,
    state: "ACTIVE",
    isBank: false,
  },
  {
    name: "Kqwe1",
    index: 10,
    state: "ACTIVE",
    isBank: false,
  },
  {
    name: "K221",
    index: 11,
    state: "ACTIVE",
    isBank: true,
  },
];
const Game = ({
  match: {
    params: { username, room_id },
  },
}) => {
  const [battleList, setBattleList] = useState([]);
  const [usePlayers, setPlayers] = useState(players);
  const [myIndex, setMyIndex] = useState(4);
  const sitSpot = (index) => {
    console.log(index);
    setMyIndex(index);
    // chooseSeat(roomID)
  };
  const startGame = () => {
    //startGame(room_id)
  };
  const endGame = () => {
    //endGame(room_id)
  };
  const setBet = () => {
    //setBet(room_id, bet, index)
  };
  const addBattleList = (index) => {
    setBattleList([...battleList, index]);
  };
  const battleAll = () => {
    //battle(room_id, battleList)
  };
  const hit = () => {
    //hit(room_id,myIndex)
  };
  const away = () => {
    const newPlayers = [...usePlayers];
    newPlayers[myIndex].state = "AWAY";
    setPlayers(newPlayers);
    //away()
  };
  const leave = () => {
    const newPlayers = [...usePlayers];
    newPlayers[myIndex].state = "UNSEATED";
    setPlayers(newPlayers);
    //leave()
  };

  let showAll = [];
  usePlayers.map((player) => {
    if (player.isBank) {
      showAll.push(<Player className={"player dealer"} state={player.state} name={player.name}></Player>);
    } else {
      let index = ((player.index + 4 - myIndex + 11) % 11) + 1;
      if (player.state === "UNSEATED") {
        showAll.push(
          <div className={"player player_" + index + " " + player.state} onClick={() => sitSpot(player.index)}>
            <div className={"sit_text"}>SIT</div>
          </div>
        );
      } else {
        showAll.push(
          <Player
            className={"player player_" + index}
            state={player.state}
            name={player.name}
            onClick={() => addBattleList(player.index)}
          ></Player>
        );
      }
    }
  });
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
      <div className="top_btn_container">
        <div className="go_btn" onClick={() => leave()}>
          Leave
        </div>
        <div className="go_btn" onClick={() => away()}>
          Away
        </div>
      </div>
      <div className="btm_btn_container">
        <div className="btn" id="stand_btn" onClick={() => away()}>
          STAND
        </div>
        <div className="btn" id="hit_btn" onClick={() => leave()}>
          HIT
        </div>
        <div className="btn" id="catch_btn" onClick={() => away()}>
          CATCH
        </div>
        <div className="btn" id="bet_btn" onClick={() => away()}>
          BET
        </div>
      </div>

      <img
        src="https://i.imgur.com/oPXcEoE.png"
        style={{ width: "80%", height: "70%", objectFit: "cover", marginBottom: "5%" }}
      />
      {players.map((player, index) => {
        return showAll[index];
      })}
    </div>
  );
};
export default Game;
