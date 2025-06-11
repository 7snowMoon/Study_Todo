import React from 'react';
import styles from '@/styles/Home.module.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles.todoItem}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, !todo.completed)}
            className={styles.checkbox}
          />
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
            className={styles.todoText}
          >
            {todo.text}
          </span>
          <button onClick={() => onDelete(todo.id)} className={styles.deleteButton}>
            削除
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;