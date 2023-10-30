import { gql } from "@apollo/client";
const DELETE = gql`
  mutation deleteItem($itemId: Int!) {
    deleteItem(itemId: $itemId) {
      itemId
    }
  }
`;
export default DELETE;
