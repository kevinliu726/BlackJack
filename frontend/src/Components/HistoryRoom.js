import "../css/HistoryModal.css";

const HistoryRoom = ({ room_name, host, date, goIntoDetail }) => {
  return (
    <div className="history_room_box" onClick={goIntoDetail}>
      <div className="history_room_info">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: "24px" }}>
          <div> {room_name}</div>
          <div>{host}</div>
        </div>
        <div style={{ textAlign: "end" }}>{date}</div>
      </div>
    </div>
  );
};
export default HistoryRoom;
