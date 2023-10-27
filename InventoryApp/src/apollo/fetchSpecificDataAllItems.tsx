import { gql } from "@apollo/client";
const GET_DATA = gql`
  query {
    Items {
      itemId
      itemName
    }
  }
`;
export default GET_DATA;
