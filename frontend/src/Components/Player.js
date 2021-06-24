import "../css/Player.css";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

const Player = ({ className, state, name, cards, cash }) => {
  var isWin = cash >= 0;
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
    let imgs = [];
    cards.map((card) => {
      if (card.visible === false) {
        imgs.push(require("../cards/back.jpeg").default);
      } else {
        imgs.push(require("../cards/" + (card.index % 52) + ".png").default);
      }
    });
    return (
      <div className={className}>
        <div className={state}>
          <div className="info_container">
            <div className={info_name}>{name}</div>
            {isWin && <div className={money_win}>{cash}</div>}
            {!isWin && <div className={money_loss}>{cash}</div>}
          </div>
          <div className="cards">
            {imgs.map((img) => (
              <img className="card" src={img} alt="cards"></img>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (state === "AWAY") {
    return (
      <div className={className + " " + state}>
        <div className="icon">
          <DirectionsWalkIcon style={{ display: "flex", height: "50%", width: "100%" }}></DirectionsWalkIcon>
          <span>AWAY</span>
        </div>
        <div className="away">{name}</div>
      </div>
    );
  }
};
export default Player;
