import "../css/Player.css";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

const Player = ({ className, state, name, cards, cash, bet, username, isBank, flash, canBattle, isChosen, canClick, onClick, resultTimes }) => {
  var isWin = cash >= 0;
  var isDealer = className.includes("dealer");
  var info_name = "info_name";
  var money_win = "info_money_win";
  var money_loss = "info_money_lose";
  var resultClass = resultTimes >= 0 ? "info_result_win" : "info_result_lose";
  if (isDealer) {
    info_name = "info_name_dealer";
    money_win = "info_money_win_dealer";
    money_loss = "info_money_lose_dealer";
  }
  if (state === "ACTIVE" || state === "TURN") {
    let imgs = [];
    cards.map((card) => {
      if (card.visible === true || username === name) {
        return imgs.push(require("../cards/" + (card.number % 52) + ".png").default);
      } else {
        return imgs.push(require("../cards/back.jpeg").default);
      }
    });
    if(flash) state += (isChosen ? " CHOSEN" : " NOT_CHOSEN");
    state += (canClick ? " canClick" : " canNotClick");
    return (
      <div className={className}>
        <div className={state} onClick={onClick}>
          <div className="info_container">
            <div className={info_name}>{name}</div>
            {!isBank && canBattle && <div className="info_bet">{bet > 0 && bet}</div>}
            {!canBattle && <div className={resultClass}>{bet} / {resultTimes} x</div>}
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
