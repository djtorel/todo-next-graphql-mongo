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
      if (!text) {
        await Todo.findOneAndUpdate(
          { _id: id },
          { $set: { completed, completedAt } }
        );
      } else if (!completed) {
        await Todo.findOneAndUpdate({ _id: id }, { $set: { text } });
      } else {
        await Todo.findOneAndUpdate(
          { _id: id },
          { $set: { text, completed, completedAt } }
        );
      }
      return await Todo.findOne({ _id: id });
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
