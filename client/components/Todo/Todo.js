const Todo = ({ text, completed, completedAt }) => {
  return (
    <div>
      <p>Text: {text}</p>
      <p>Completed: {completed.toString()}</p>
      {completed && (
        <p>Completed time: {new Date(completedAt).toDateString()}</p>
      )}
    </div>
  );
};

export default Todo;
