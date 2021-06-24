import "../css/Player.css";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

const Player = ({ className, state, name }) => {
  var isWin = true;
  var isDealer = className.includes("dealer");
  var info_name = "info_name";
  var money_win = "info_money_win";
  var money_loss = "info_money_lose";
  if (isDealer) {
    info_name = "info_name_dealer";
    money_win = "info_money_win_dealer";
    money_loss = "info_money_lose_dealer";
  }
  if (state === "ACTIVE" || state === "TURN") {
    return (
      <div className={className + " " + state}>
        <div className={"info_container"}>
          <div className={info_name}>{name}</div>
          {isWin && <div className={money_win}>4000</div>}
          {!isWin && <div className={money_loss}>-4000</div>}
        </div>
        <div className={"cards"}>
          <img className={"card"} src={require("../cards/back.jpeg").default} alt="cards"></img>
          <img className={"card rest"} src={require("../cards/5.png").default} alt="cards"></img>
          <img className={"card rest"} src={require("../cards/39.png").default} alt="cards"></img>
          <img className={"card rest"} src={require("../cards/47.png").default} alt="cards"></img>
          <img className={"card rest"} src={require("../cards/26.png").default} alt="cards"></img>
        </div>
      </div>
    );
  } else if (state === "AWAY") {
    return (
      <div className={className + " " + state}>
        <div className={"icon"}>
          <DirectionsWalkIcon style={{ display: "flex", height: "50%", width: "100%" }}></DirectionsWalkIcon>
          <span>AWAY</span>
        </div>
        <div className={"away"}>{name}</div>
      </div>
    );
  }
};
export default Player;
