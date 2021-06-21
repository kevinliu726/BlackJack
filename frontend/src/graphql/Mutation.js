import {gql} from "@apollo/client";

const REGISTER = gql`
    mutation ($username: String, $password: String){
        register(name: $username, password: $password)
    }
`

export {REGISTER};