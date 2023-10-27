import { gql } from "@apollo/client";
const GET_ALL_DATA = gql`
  query GetItemById($itemId: Int!) {
    Item(itemId: $itemId) {
      itemId
      itemName
      description
      location {
        locationId
        state
        address
        phoneNumber
      }
    }
  }
`;
export default GET_ALL_DATA;
