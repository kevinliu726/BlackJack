import Player from "../Components/Player";
import "../css/Game.css";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useLayoutEffect, useState } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_ROOM } from "../graphql/Query";
import { SUBSCRIBE_ROOM } from "../graphql/Subscription";
import { CHOOSE_SEAT, HIT, STAND, START_GAME, SET_BET, CHOOSE_PLAYER, BATTLE } from "../graphql/Mutation";

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
  const [players, setPlayers] = useState([]);
  const [myIndex, setMyIndex] = useState(0);
  const {data, loading, subscribeToMore} = useQuery(GET_ROOM, {variables: {roomID: room_id}});
  const [chooseSeat] = useMutation(CHOOSE_SEAT);
  const [hit] = useMutation(HIT);
  const [stand] = useMutation(STAND);
  const [startGame] = useMutation(START_GAME);
  const [setBet] = useMutation(SET_BET);
  const [choosePlayer] = useMutation(CHOOSE_PLAYER);
  const [battle] = useMutation(BATTLE);

  useLayoutEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_ROOM,
      variables: {roomID: room_id},
      updateQuery: (prev, {subscriptionData}) => {
        if(!subscriptionData.data) return prev
        return {...prev, getRoom: subscriptionData.data.subscribeRoom};
      }
    })
  }, [subscribeToMore]);
  useLayoutEffect(() => {
    if(data && data.getRoom){
      let index = -1;
      for(var i = 0; i < 12; i++){
        if(data.getRoom.players[i].name === username){
          index = i;
        }
      }
      setPlayers(data.getRoom.players);
      setMyIndex(index);
    }
  }, [data]);

  const sitSpot = (index) => {
    chooseSeat({variables:{roomID: room_id, name: username, index}});
    // chooseSeat(roomID)
  };
  // const startGame = () => {
  //   //startGame(room_id)
  // };
  const endGame = () => {
    //endGame(room_id)
  };
  // const setBet = () => {
  //   //setBet(room_id, bet, index)
  // };
  const addBattleList = (index) => {
    setBattleList([...battleList, index]);
  };
  const battleAll = () => {
    //battle(room_id, battleList)
  };
  // const hit = () => {
  //   //hit(room_id,myIndex)
  // };
  const betNumOnChange = (event) => {
    setBetNum(event.target.value);
  };

  const away = () => {
    const newPlayers = [...players];
    newPlayers[myIndex].state = "AWAY";
    setPlayers(newPlayers);
    //away()
  };
  const leave = () => {
    const newPlayers = [...players];
    newPlayers[myIndex].state = "UNSEATED";
    setPlayers(newPlayers);
    //leave()
    window.location.href = `/Lobby/${room_type}/${username}`;
  };

  // let showAll = [];
  const showAll = players.map((player) => {
    if (player.isBank) {
      return (
        <Player
          className={"player dealer"}
          state={player.state}
          username={username}
          canBattle={false}
          isChosen={false}
          canClick={false}
          name={player.name}
          cards={player.cards}
        />
      );
    } else {
      let index = ((player.index + 5 - myIndex + 11) % 11) + 1;
      if (player.state === "UNSEATED") {
        // room.state === "PAUSE"
        if(data && data.getRoom.state === "PAUSE"){
          return (
            <div className={"player player_" + index + " " + player.state} onClick={() => sitSpot(player.index)}>
              <div className={"sit_text"}>SIT</div>
            </div>
          );
        }
        else {
          return (
            <div className={"player player_" + index} />
          );
        }
      } else {
        return (
          <Player
            className={"player player_" + index}
            state={player.state}
            name={player.name}
            username={username}
            canBattle={(player.canBattle && players[11].state === "TURN" && players[11].canStand) || player.canBet}
            isChosen={player.isChosen}
            canClick={myIndex === 11 && player.canBattle && players[11].canStand && players[11].state === "TURN"}
            cards={player.cards}
            cash={player.cash}
            onClick={() => choosePlayer({variables: {roomID: room_id, index: player.index}})}
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
      { myIndex >= 0 && <div className="btm_btn_container">
        {/*
        Player View in Game Bet + Number, Stand + Hit
        Dealer View in Game Stand + Catch, Cancel + Submit
        Player View not in Game Leave + Away
        Dealer View not in Game End + Start
        */}
        {
          players[myIndex] && players[myIndex].state === "TURN" && players[myIndex].canStand &&
          ((myIndex === 11 &&
          <button className="btn" id="stand_btn" onClick={() => battle({variables: {roomID: room_id}})}>
            BATTLE
          </button>) ||
          <button className="btn" id="stand_btn" onClick={() => stand({variables: {roomID: room_id, index: myIndex}})}>
            STAND
          </button>)
        }
        {
          // <button className="btn" id="catch_btn">
          //   CATCH
          // </button>
        }
        {
          players[myIndex] && players[myIndex].state === "TURN" && players[myIndex].canHit &&
          <button className="btn" id="hit_btn" onClick={() => hit({variables: {roomID: room_id, index: myIndex}})}>
            HIT
          </button>
        }
        {
          players[myIndex]  && players[myIndex].canBet &&
          <button className="btn" id="bet_btn" onClick={() => setBet({variables: {roomID: room_id, index: myIndex, bet: parseInt(betNum)}})}>
            BET
          </button>
        }
        {
          players[myIndex]  && players[myIndex].canBet &&
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
          players[myIndex] && players[myIndex].isBank && data && data.getRoom.state === "PAUSE" &&
          <button className="btn" id="start_btn" onClick={() => startGame({variables: {roomID: room_id}})}>
            START
          </button>
        }
      </div>}

      <img className="table_img" src="https://i.imgur.com/oPXcEoE.png" />
      {showAll.map((player) => {
        return player;
      })}
    </div>
  );
};
export default Game;
