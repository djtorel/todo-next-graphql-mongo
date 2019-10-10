import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    createTodo(text: String!): Todo!
    setTodoCompleted(id: ID!, completed: Boolean!): Todo!
    setTodoText(id: ID!, text: String!): Todo!
    updateTodo(id: ID!, text: String, completed: Boolean): Todo!
    deleteTodo(id: ID!): Status!
  }

  scalar Date

  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
    completedAt: Date
  }

  type Status {
    message: String!
  }
`;
