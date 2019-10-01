import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    createTodo(text: String!): Todo!
    updateTodo(id: ID!, text: String, completed: Boolean): Todo!
  }

  scalar Date

  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
    completedAt: Date
  }
`;
