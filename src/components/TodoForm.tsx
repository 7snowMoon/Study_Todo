import { useState, FormEvent } from 'react';
import styles from '@/styles/Main.module.css';

// コンポーネントに渡されるプロパティの型を定義
interface TodoFormProps {
  // TODOを追加するための関数
  onAdd: (text: string) => void;
}


export default function TodoForm({ onAdd }: TodoFormProps) {
  // useStateフックを使用して新しいTODOのテキストを管理
  // newTodoText: 現在の入力値
  // setNewTodoText: 入力値を更新するための関数
  const [newTodoText, setNewTodoText] = useState('');

  // ボタンクリック時の処理
  const handleClick = () => {
    const trimmedText = newTodoText.trim();
    if (!trimmedText) return;

    onAdd(trimmedText);
    setNewTodoText('');
  };

  return (
    <div className={styles.form}>
      
      <input
        id="todo-input"
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="新しいTODOを追加"
        className={styles.input}
      />
      
      <button
        onClick={handleClick}
        className={styles.button}
        disabled={!newTodoText.trim()}
      >
        追加
      </button>
    </div>
  );
}