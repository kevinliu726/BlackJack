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

export { LOG_IN, NAME_EXIST };
