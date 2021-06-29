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
`;

const CHOOSE_SEAT = gql`
  mutation ($roomID: ID, $name: String, $index: Int, $originalIndex: Int){
    chooseSeat(roomID: $roomID, name: $name, index: $index, originalIndex: $originalIndex)
  }
`;

const HIT = gql`
  mutation($roomID: ID, $index: Int){
    hit(roomID: $roomID, index: $index){
      roomID
    }
  }
`
const STAND = gql`
  mutation($roomID: ID, $index: Int){
    stand(roomID: $roomID, index: $index){
      roomID
    }
  }
`
const SET_BET = gql`
  mutation($roomID: ID, $bet: Int $index: Int){
    setBet(roomID: $roomID, bet: $bet index: $index){
      roomID
    }
  }
`
const START_GAME = gql`
  mutation($roomID: ID){
    startGame(roomID: $roomID){
      roomID
    }
  }
`

const CHOOSE_PLAYER = gql`
  mutation($roomID: ID, $index: Int){
    chooseBattlePlayer(roomID: $roomID, index: $index){
      roomID
    }
  }
`

const BATTLE = gql`
  mutation($roomID: ID){
    battle(roomID: $roomID){
      roomID
    }
  }
`

const END_GAME = gql`
  mutation($roomID: ID){
    endGame(roomID: $roomID){
      roomID
    }
  }
`

const AWAY = gql`
  mutation($roomID: ID, $index: Int){
    away(roomID: $roomID, index: $index){
      roomID
    }
  }
`

const BACK = gql`
  mutation($roomID: ID, $index: Int){
    back(roomID: $roomID, index: $index){
      roomID
    }
  }
`

const LEAVE = gql`
  mutation($roomID: ID, $index: Int){
    leave(roomID: $roomID, index: $index){
      roomID
    }
  }
`

export { REGISTER, CREATE_ROOM, CHOOSE_SEAT, HIT, STAND, SET_BET, START_GAME, CHOOSE_PLAYER, BATTLE, END_GAME, AWAY, BACK, LEAVE };
