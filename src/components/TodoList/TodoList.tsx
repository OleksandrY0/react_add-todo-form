import React from 'react';
import usersFromServer from '../../api/users';
import { TodoInfo } from '../TodoInfo';
interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface Props {
  todoList: Todo[];
}

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <section className="TodoList">
      {todoList.map(todo => {
        const user = usersFromServer.find(u => u.id === todo.userId);

        return <TodoInfo key={todo.id} todo={todo} user={user} />;
      })}
    </section>
  );
};
