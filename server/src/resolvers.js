import Todo from '../models/todo';
import { GraphQLScalarType, Kind } from 'graphql';

export const resolvers = {
  Query: {
    todos: () => Todo.find(),
  },

  Mutation: {
    createTodo: async (_, { text }) => await new Todo({ text }).save(),
    updateTodo: async (_, { id, text, completed }) => {
      const completedAt = completed ? new Date().getTime() : null;
      const updatedInfo =
        text === undefined
          ? { completed, completedAt }
          : completed === undefined
          ? { text }
          : { text, completed, completedAt };

      return await Todo.findOneAndUpdate(
        { _id: id },
        { $set: updatedInfo },
        { returnOriginal: false }
      );
    },
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
};
