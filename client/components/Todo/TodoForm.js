import { useState } from 'react';

const TodoForm = () => {
  const [inputText, setInputText] = useState('');

  const inputHandler = ({ target: { value } }) => {
    setInputText(value);
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log(inputText);
    setInputText('');
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Add todo..."
          value={inputText}
          onChange={inputHandler}
        />
        <button onClick={submitHandler}>+</button>
      </form>
    </div>
  );
};

export default TodoForm;
