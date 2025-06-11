import React, { useState, FormEvent } from 'react';
import styles from '@/styles/Home.module.css';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() === "") return;
    onAdd(newTodoText);
    setNewTodoText("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="新しいTODOを追加"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>追加</button>
    </form>
  );
};

export default TodoForm;