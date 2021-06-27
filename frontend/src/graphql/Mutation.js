import { gql } from "@apollo/client";

const REGISTER = gql`
  mutation ($username: String, $password: String) {
    register(name: $username, password: $password)
  }
`;

const CREATE_ROOM = gql`
  mutation ($roomInfo: CreateRoomInfo){
    createRoom(roomInfo: $roomInfo){
      roomID
      state
      players{
        name
        index
        state
        canBet
        canBattle
        canHit
        canStand
        bet
      }
    }
  }
`

export { REGISTER, CREATE_ROOM };
