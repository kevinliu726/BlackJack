import Player from "../Components/Player";
import "../css/Game.css";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
const players = [
  {
    name: "K1",
    index: 0,
    state: "ACTIVE",
    isBank: false,
    cash: -100,
    cards: [
      { visible: false, index: 1 },
      { visible: true, index: 3 },
      { visible: true, index: 2 },
      { visible: true, index: 65 },
      { visible: true, index: 22 },
    ],
  },
  {
    name: "K2",
    index: 1,
    state: "ACTIVE",
    cash: 200,
    isBank: false,
    cards: [
      { visible: false, index: 1 },
      { visible: true, index: 3 },
      { visible: true, index: 21 },
      { visible: true, index: 88 },
    ],
  },
  {
    name: "K3",
    index: 2,
    state: "AWAY",
    cash: 100,
    isBank: false,
    cards: [
      { visible: false, index: 1 },
      { visible: true, index: 3 },
      { visible: true, index: 32 },
    ],
  },
  {
    name: "K4",
    index: 3,
    state: "ACTIVE",
    cash: -100,
    isBank: false,
    cards: [
      { visible: false, index: 1 },
      { visible: true, index: 3 },
    ],
  },
  {
    name: "K5551",
    index: 4,
    state: "ACTIVE",
    cash: -1030,
    isBank: false,
    cards: [],
  },
  {
    name: "K1q",
    index: 5,
    cash: 10320,
    state: "ACTIVE",
    isBank: false,
    cards: [],
  },
  {
    name: "K1ee",
    index: 6,
    cash: 10320,
    state: "ACTIVE",
    isBank: false,
    cards: [],
  },
  {
    name: "Kwet1",
    index: 7,
    cash: 10320,
    state: "ACTIVE",
    isBank: false,
    cards: [],
  },
  {
    name: "K1we",
    index: 8,
    state: "UNSEATED",
    cash: 320,
    isBank: false,
    cards: [],
  },
  {
    name: "K1tt",
    index: 9,
    state: "ACTIVE",
    cash: 10,
    isBank: false,
    cards: [],
  },
  {
    name: "Kqwe1",
    index: 10,
    cash: -320,
    state: "ACTIVE",
    isBank: false,
    cards: [],
  },
  {
    name: "K221",
    index: 11,
    cash: 102,
    state: "TURN",
    isBank: true,
    cards: [],
  },
];
const Game = ({
  match: {
    params: { room_type, room_id, username },
  },
}) => {
  const classes = makeStyles(() => ({
    form: {
      display: "flex",
      flexWrap: "wrap",
      height: "100%",
      width: "30%",
      justifyContent: "center",
      "& .MuiInputBase-input": { fontSize: "21px", fontWeight: "bold", color: "goldenrod" },
      "& .MuiOutlinedInput-root": {
        height: "80%",
        borderRadius: "20px",
        "& fieldset": { borderColor: "goldenrod" },
        "&:hover fieldset": { borderColor: "goldenrod" },
        "&.Mui-focused fieldset": { borderColor: "goldenrod" },
        "& input::placeholder": { fontSize: "16px" },
        "& input::-webkit-outer-spin-button": { "-webkit-appearance": "none" },
        "& input::-webkit-inner-spin-button": { "-webkit-appearance": "none" },
      },
    },
  }))();
  const [betNum, setBetNum] = useState(1);
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
  const betNumOnChange = (event) => {
    setBetNum(event.target.value);
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
    window.location.href = `/Lobby/${room_type}/${username}`;
  };

  let showAll = [];
  usePlayers.map((player) => {
    if (player.isBank) {
      return showAll.push(
        <Player className={"player dealer"} state={player.state} name={player.name} cards={player.cards}></Player>
      );
    } else {
      let index = ((player.index + 4 - myIndex + 11) % 11) + 1;
      if (player.state === "UNSEATED") {
        return showAll.push(
          <div className={"player player_" + index + " " + player.state} onClick={() => sitSpot(player.index)}>
            <div className={"sit_text"}>SIT</div>
          </div>
        );
      } else {
        return showAll.push(
          <Player
            className={"player player_" + index}
            state={player.state}
            name={player.name}
            cards={player.cards}
            cash={player.cash}
            onClick={() => addBattleList(player.index)}
          ></Player>
        );
      }
    }
  });
  return (
    <div className="game_container">
      <div className="top_btn_container">
        {
          <button className="go_btn" id="leave_btn" onClick={() => leave()}>
            LEAVE
          </button>
        }
        {
          <button className="go_btn" id="away_btn" onClick={() => away()}>
            AWAY
          </button>
        }
      </div>
      <div className="btm_btn_container">
        {/*
        Player View in Game Bet + Number, Stand + Hit
        Dealer View in Game Stand + Catch, Cancel + Submit
        Player View not in Game Leave + Away
        Dealer View not in Game End + Start
        */}
        {
          // <button className="btn" id="stand_btn">
          //   STAND
          // </button>
        }
        {
          // <button className="btn" id="catch_btn">
          //   CATCH
          // </button>
        }
        {
          // <button className="btn" id="hit_btn">
          //   HIT
          // </button>
        }
        {
          <button className="btn" id="bet_btn">
            BET
          </button>
        }
        {
          <FormControl className={classes.form} variant="outlined">
            <OutlinedInput
              id="betNum"
              type="number"
              onChange={betNumOnChange}
              autoComplete="off"
              placeholder="min - max"
            />
          </FormControl>
        }
        {
          // <button className="btn" id="end_btn">
          //   END
          // </button>
        }
        {
          // <button className="btn" id="start_btn">
          //   START
          // </button>
        }
      </div>

      <img className="table_img" src="https://i.imgur.com/oPXcEoE.png" />
      {players.map((player, index) => {
        return showAll[index];
      })}
    </div>
  );
};
export default Game;