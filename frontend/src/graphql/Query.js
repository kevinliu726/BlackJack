import { gql } from "@apollo/client";

const LOG_IN = gql`
  query ($username: String, $password: String) {
    isLogIn(name: $username, password: $password)
  }
`;

const NAME_EXIST = gql`
  query ($username: String) {
    nameExist(name: $username)
  }
`;

const GET_LOBBY = gql`
  query ($roomType: String){
    getLobby(roomType: $roomType){
      roomID
      roomInfo{
        name
        password
        host
        playersNumber
        minBet
        maxBet
      }
    }
  }
`;

const GET_ROOM = gql`
  query ($roomID: ID){
    getRoom(roomID: $roomID){
      roomID
      roomInfo{
        roomType
        password
        name
        host
        decksNumber
        playersNumber
        minBet
        maxBet
      }
      players{
        name
        index
        state
        isBank
        canBattle
        canBet
        canStand
        canHit
        isChosen
        cash
        bet
        cards {
            visible
            number
        }
        resultTimes
      }
      state
    }
  }
`;

export { LOG_IN, NAME_EXIST, GET_LOBBY, GET_ROOM };
