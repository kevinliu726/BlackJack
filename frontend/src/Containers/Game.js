import Player from "../Components/Player";
import "../css/Game.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import DialogTitle from "@material-ui/core/DialogTitle";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import { FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useLayoutEffect, useState } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_ROOM } from "../graphql/Query";
import { SUBSCRIBE_ROOM } from "../graphql/Subscription";
import {
  CHOOSE_SEAT,
  HIT,
  STAND,
  START_GAME,
  SET_BET,
  CHOOSE_PLAYER,
  BATTLE,
  BATTLE_ALL,
  END_GAME,
  AWAY,
  BACK,
  LEAVE,
} from "../graphql/Mutation";

const Game = ({
  match: {
    params: { room_type, room_id, username },
  },
}) => {
  const classes = makeStyles(() => ({
    dialog: {
      display: "flex",
      background: "black",
      color: "#c0c0c0",
      borderRadius: "20px",
    },
    dialogTitle: {
      display: "flex",
      paddingBottom: "0px",
    },
    dialogContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
    dialogActions: {
      display: "flex",
      width: "90%",
      alignSelf: "center",
      justifyContent: "space-between",
    },
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
  const [betNum, setBetNum] = useState("");
  const [betError, setBetError] = useState(false);
  const [players, setPlayers] = useState([]);
  const [myIndex, setMyIndex] = useState(-1);
  const { data, loading, subscribeToMore } = useQuery(GET_ROOM, { variables: { roomID: room_id } });
  const [chooseSeat] = useMutation(CHOOSE_SEAT);
  const [hit] = useMutation(HIT);
  const [stand] = useMutation(STAND);
  const [startGame] = useMutation(START_GAME);
  const [setBet] = useMutation(SET_BET);
  const [choosePlayer] = useMutation(CHOOSE_PLAYER);
  const [battle] = useMutation(BATTLE);
  const [battleAll] = useMutation(BATTLE_ALL);
  const [endGame] = useMutation(END_GAME);
  const [away] = useMutation(AWAY);
  const [back] = useMutation(BACK);
  const [leave] = useMutation(LEAVE);

  useLayoutEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_ROOM,
      variables: { roomID: room_id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return { ...prev, getRoom: subscriptionData.data.subscribeRoom };
      },
    });
  }, [subscribeToMore]);
  useLayoutEffect(() => {
    if (data && data.getRoom) {
      let index = -1;
      for (var i = 0; i < 12; i++) {
        if (data.getRoom.players[i].name === username) {
          index = i;
        }
      }
      if (data.getRoom.state === "PAUSE") setBetNum("");
      setPlayers(data.getRoom.players);
      setMyIndex(index);
    }
  }, [data]);

  const sitSpot = (index) => {
    chooseSeat({ variables: { roomID: room_id, name: username, index, originalIndex: myIndex } });

    // chooseSeat(roomID)
  };
  const betNumOnChange = (event) => {
    setBetNum(event.target.value);
    setBetError(false);
  };

  const showAll = players.map((player) => {
    if (player.isBank) {
      return (
        <Player
          className={"player dealer"}
          state={player.state}
          username={username}
          flash={false}
          isChosen={false}
          canClick={false}
          name={player.name}
          cash={player.cash}
          bet={betNum}
          canBattle={player.canBattle}
          isBank={player.isBank}
          resultTimes={player.resultTimes}
          cards={player.cards}
        />
      );
    } else {
      let index = ((player.index + 5 - myIndex + 11) % 11) + 1;
      if (player.state === "UNSEATED") {
        if (data && data.getRoom.state === "PAUSE" && myIndex !== 11) {
          return (
            <div className={"player player_" + index + " " + player.state} onClick={() => sitSpot(player.index)}>
              <div className={"sit_text"}>SIT</div>
            </div>
          );
        } else {
          return <div className={"player player_" + index} />;
        }
      } else {
        return (
          <Player
            className={"player player_" + index}
            state={player.state}
            name={player.name}
            username={username}
            flash={(player.canBattle && players[11].state === "TURN" && players[11].canStand) || player.canBet}
            isChosen={player.isChosen}
            canClick={myIndex === 11 && player.canBattle && players[11].canStand && players[11].state === "TURN"}
            cards={player.cards}
            cash={player.cash}
            bet={player.bet}
            resultTimes={player.resultTimes}
            canBattle={player.canBattle}
            isBank={player.isBank}
            onClick={() => choosePlayer({ variables: { roomID: room_id, index: player.index } })}
          ></Player>
        );
      }
    }
  });
  return (
    <div className="game_container">
      {
        <Dialog
          classes={{ paper: classes.dialog }}
          open={data && data.getRoom.state === "DEAD"}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Room closed
          </DialogTitle>
          <Divider style={{ backgroundColor: "#d5d5d5", width: "80%", alignSelf: "center" }} />
          <DialogContent className={classes.dialogContent}>
            The bank left the room, and the room is closed.
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button
              color="secondary"
              onClick={() => {
                leave({ variables: { roomID: room_id, index: myIndex } });
                window.location.href = `/Lobby/${room_type}/${username}`;
              }}
            >
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      }
      <div className="top_btn_container">
        {(myIndex < 0 || (data && data.getRoom.state === "PAUSE")) && (
          <button
            className="go_btn"
            id="leave_btn"
            onClick={() => {
              leave({ variables: { roomID: room_id, index: myIndex } });
              window.location.href = `/Lobby/${room_type}/${username}`;
            }}
          >
            LEAVE
          </button>
        )}
        {data &&
          data.getRoom.state === "PAUSE" &&
          myIndex >= 0 &&
          myIndex < 11 &&
          ((players[myIndex].state === "ACTIVE" && (
            <button
              className="go_btn"
              id="away_btn"
              onClick={() => away({ variables: { roomID: room_id, index: myIndex } })}
            >
              AWAY
            </button>
          )) ||
            (players[myIndex].state === "AWAY" && (
              <button
                className="go_btn"
                id="away_btn"
                onClick={() => back({ variables: { roomID: room_id, index: myIndex } })}
              >
                BACK
              </button>
            )))}
      </div>
      {myIndex >= 0 && (
        <div className="btm_btn_container">
          {/*
        Player View in Game Bet + Number, Stand + Hit
        Dealer View in Game Stand + Catch, Cancel + Submit
        Player View not in Game Leave + Away
        Dealer View not in Game End + Start
        */}
          {players[myIndex] &&
            players[myIndex].state === "TURN" &&
            players[myIndex].canStand &&
            ((myIndex === 11 && (
              <>
                <button className="btn" id="stand_btn" onClick={() => battle({ variables: { roomID: room_id } })}>
                  BATTLE
                </button>
                <button className="btn" id="stand_btn" onClick={() => battleAll({ variables: { roomID: room_id } })}>
                  BATTLE ALL
                </button>
              </>
            )) || (
              <button
                className="btn"
                id="stand_btn"
                onClick={() => stand({ variables: { roomID: room_id, index: myIndex } })}
              >
                STAND
              </button>
            ))}
          {
            // <button className="btn" id="catch_btn">
            //   CATCH
            // </button>
          }
          {players[myIndex] && players[myIndex].state === "TURN" && players[myIndex].canHit && (
            <button
              className="btn"
              id="hit_btn"
              onClick={() => hit({ variables: { roomID: room_id, index: myIndex } })}
            >
              HIT
            </button>
          )}
          {players[myIndex] && players[myIndex].canBet && (
            <button
              className="btn"
              id="bet_btn"
              onClick={() => {
                const bet = parseFloat(betNum);
                console.log(bet);
                if (!bet || bet < data.getRoom.roomInfo.minBet || bet > data.getRoom.roomInfo.maxBet) {
                  setBetError(true);
                  setBetNum("");
                  return;
                }
                setBet({ variables: { roomID: room_id, index: myIndex, bet } });
              }}
            >
              BET
            </button>
          )}
          {players[myIndex] && players[myIndex].canBet && (
            <FormControl className={classes.form} variant="outlined">
              <OutlinedInput
                id="betNum"
                type="number"
                value={betNum}
                onChange={betNumOnChange}
                autoComplete="off"
                placeholder={data.getRoom.roomInfo.minBet + " - " + data.getRoom.roomInfo.maxBet}
              />
              {betError && <FormHelperText style={{ color: "red" }}>Out of range!!</FormHelperText>}
            </FormControl>
          )}
          {myIndex === 11 && data && data.getRoom.state === "GAMEOVER" && (
            <button className="btn" id="end_btn" onClick={() => endGame({ variables: { roomID: room_id } })}>
              END
            </button>
          )}
          {players[myIndex] &&
            players[myIndex].isBank &&
            data &&
            data.getRoom.state === "PAUSE" &&
            players.filter((p) => !p.isBank && p.state === "ACTIVE").length > 0 && (
              <button className="btn" id="start_btn" onClick={() => startGame({ variables: { roomID: room_id } })}>
                START
              </button>
            )}
        </div>
      )}

      <img className="table_img" src="https://i.imgur.com/oPXcEoE.png" />
      {showAll.map((player) => {
        return player;
      })}
    </div>
  );
};
export default Game;
