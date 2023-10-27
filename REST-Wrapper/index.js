import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
const baseURL = "http://localhost:8080";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
    type Mutation{
      createItem(itemId:Int!,itemName: String!, description: String!, locationId: Int!,state:String!,address:String!,phoneNumber:String!): Item
      deleteItem(itemId: Int!): Item
    }
    type Item {
      itemId: Int!
      itemName: String!
      description: String!
      location: Location!
    }
    
    type Location {
      locationId: Int!
      state: String!
      address: String!
      phoneNumber: String!
    }
    
    type Query {
      Items: [Item!]!
      Item(itemId: Int): Item
      findItemByName(name:String!): Item
    }
    
    `,
    resolvers: {
      Query: {
        Items: () => {
          return fetch(`${baseURL}/items`).then((res) => res.json());
        },
        Item: (parent, args) => {
          const { itemId } = args;
          return fetch(`${baseURL}/items/${itemId}`)
            .then((res) => res.json())
            .catch((error) => {
              console.error(error);
              return {
                itemId: -1,
                itemName: "",
                description: "",
                location: {
                  locationId: -1,
                  state: "",
                  address: "",
                  phoneNumber: "",
                },
              };
            });
        },
        findItemByName: (parent, args) => {},
      },
      Mutation: {
        createItem: (parent, args) => {
          const {
            itemId,
            itemName,
            description,
            locationId,
            state,
            address,
            phoneNumber,
          } = args;
          const newItem = {
            itemId,
            itemName,
            description,
            location: {
              locationId,
              state,
              address,
              phoneNumber,
            },
          };
          return fetch(`${baseURL}/items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          }).then((res) => res.json());
        },
      },
    },
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
