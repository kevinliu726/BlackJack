import { gql } from "@apollo/client";

const SUBSCRIBE_LOBBY = gql`
    subscription ($roomType: String){
        subscribeLobby(roomType: $roomType){
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

export {SUBSCRIBE_LOBBY};