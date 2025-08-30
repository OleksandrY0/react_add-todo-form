import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleReset() {
    setSelectedUserId('0');
    setTitle('');
    setIsSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);

    if (!title.trim() || selectedUserId === '0') {
      return;
    }

    const newId = todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
    const user = usersFromServer.find(u => u.id === Number(selectedUserId));

    if (!user) {
      return;
    }

    const newTodo = {
      id: newId,
      title: title.trim(),
      userId: Number(selectedUserId),
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);

    handleReset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          {isSubmitted && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => setSelectedUserId(e.target.value)}
            required
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.username}
              </option>
            ))}
          </select>

          {isSubmitted && selectedUserId === '0' && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todoList={todos} />
    </div>
  );
};
