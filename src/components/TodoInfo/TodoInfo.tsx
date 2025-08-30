import React from 'react';
import { User } from '../../api/users';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface Props {
  todo: Todo;
  user: User;
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {user && (
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    )}
  </article>
);
