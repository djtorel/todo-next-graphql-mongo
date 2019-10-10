import Todo from '../models/todo';
import { GraphQLScalarType, Kind } from 'graphql';

const updateTodo = async (id, changes) =>
  await Todo.findOneAndUpdate(
    { _id: id },
    {
      $set: changes,
    },
    { returnOriginal: false }
  );

export const resolvers = {
  Query: {
    todos: () => Todo.find(),
  },

  Mutation: {
    createTodo: async (_, { text }) => await new Todo({ text }).save(),
    setTodoCompleted: async (_, { id, completed }) =>
      updateTodo(id, {
        completed,
        completedAt: completed ? new Date().getTime() : null,
      }),
    setTodoText: async (_, { id, text }) =>
      updateTodo(id, {
        text,
      }),
    deleteTodo: async (_, { id }) =>
      await Todo.deleteOne({ _id: id }).then(({ deletedCount }) =>
        deletedCount > 0 ? { message: 'Success' } : { message: 'Not found' }
      ),
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
