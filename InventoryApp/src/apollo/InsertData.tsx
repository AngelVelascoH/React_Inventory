import { gql } from "@apollo/client";
const INSERT_ITEM = gql`
  mutation createItem(
    $itemId: Int!
    $name: String!
    $desc: String!
    $locId: Int!
    $state: String!
    $address: String!
    $phone: String!
  ) {
    createItem(
      itemId: $itemId
      itemName: $name
      description: $desc
      locationId: $locId
      state: $state
      address: $address
      phoneNumber: $phone
    ) {
      itemId
    }
  }
`;
export default INSERT_ITEM;
