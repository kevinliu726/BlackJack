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
`

export { LOG_IN, NAME_EXIST, GET_LOBBY };
