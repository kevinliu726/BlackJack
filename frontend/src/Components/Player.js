import "../css/Player.css";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

const Player = ({ className, state }) => {
  var isWin = true;
  if (state == "ACTIVE" || state == "TURN") {
    return (
      <div className={className + " " + state}>
        <div className={"info_container"}>
          <div className={"info_name"}>Kevin</div>
          {isWin && <div className={"info_money_win"}>4000</div>}
          {!isWin && <div className={"info_money_lose"}>-4000</div>}
        </div>
        <div className={"cards"}>
          <img className={"card"} src={require("../cards/back.jpeg").default} alt="cards"></img>
          <img className={"card" + " rest"} src={require("../cards/2_of_clubs.png").default} alt="cards"></img>
          <img className={"card" + " rest"} src={require("../cards/jack_of_clubs.png").default} alt="cards"></img>
          <img className={"card" + " rest"} src={require("../cards/2_of_clubs.png").default} alt="cards"></img>
          <img className={"card" + " rest"} src={require("../cards/2_of_clubs.png").default} alt="cards"></img>
        </div>
      </div>
    );
  } else if (state == "AWAY") {
    return (
      <div className={className + " " + state}>
        <div className={"icon"}>
          <DirectionsWalkIcon style={{ display: "flex", height: "50%", width: "50%" }}></DirectionsWalkIcon>
          <span>AWAY</span>
        </div>
        <div className={"away"}>Kevin</div>
      </div>
    );
  } else {
    return (
      <div className={className + " " + state}>
        <div className={"sit_text"}>SIT</div>
      </div>
    );
  }
};
export default Player;
