import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Todo from './Todo';

export const ALL_TODOS_QUERY = gql`
  query {
    todos {
      id
      text
      completed
      completedAt
    }
  }
`;

const TodoList = () => {
  const { loading, data } = useQuery(ALL_TODOS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <div>Loading...</div>;

  const { todos } = data;
  return (
    <section>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} {...todo}></Todo>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
