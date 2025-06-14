// ReactのuseStateフックをインポートし、コンポーネントの状態を管理します。
// FormEventはフォームイベントの型定義です。
import { useState, FormEvent } from 'react';
// スタイルシートをインポートします。
import styles from '@/styles/Main.module.css';

// TodoFormコンポーネントに渡されるプロパティ（props）の型を定義します。
// TypeScriptを使用することで、propsの型が明確になり、開発中のエラーを防ぎます。
interface TodoFormProps {
  // onAdd: 新しいTODOのテキストを受け取り、親コンポーネントに渡す関数です。
  // この関数は親コンポーネント（TodosPage）から渡されます。
  onAdd: (text: string) => void;
}

// TodoFormコンポーネントは、新しいTODOを入力するためのフォームを提供します。
// { onAdd }: TodoFormProps は、親コンポーネントから渡されるpropsを分割代入で受け取っています。
export default function TodoForm({ onAdd }: TodoFormProps) {
  // newTodoTextという状態変数と、それを更新するsetNewTodoText関数を定義します。
  // useState('')は、newTodoTextの初期値が空文字列であることを示します。
  const [newTodoText, setNewTodoText] = useState('');

  // 「追加」ボタンがクリックされたときの処理を定義します。
  const handleClick = () => {
    // 入力値の前後にある空白を削除します。
    const trimmedText = newTodoText.trim();
    // 入力値が空の場合は、何もしないで関数を終了します。
    if (!trimmedText) return;

    // 親コンポーネントから渡されたonAdd関数を呼び出し、新しいTODOのテキストを渡します。
    onAdd(trimmedText);
    // TODOが追加された後、入力フィールドをクリアします。
    setNewTodoText('');
  };

  // JSX（JavaScript XML）は、ReactコンポーネントのUIを記述するための構文です。
  return (
    // styles.formは、Main.module.cssで定義されたCSSクラスを適用します。
    <div className={styles.form}>
      {/* input要素は、ユーザーがTODOのテキストを入力するためのフィールドです。 */}
      <input
        id="todo-input" // アクセシビリティのためのID
        type="text" // テキスト入力タイプ
        value={newTodoText} // inputの値をnewTodoText状態変数と同期させます（制御されたコンポーネント）
        // inputの値が変更されるたびにsetNewTodoTextを呼び出し、状態を更新します。
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="新しいTODOを追加" // 入力例のテキスト
        className={styles.input} // スタイルを適用
      />
      
      {/* button要素は、TODOを追加するためのボタンです。 */}
      <button
        onClick={handleClick} // ボタンがクリックされたときにhandleClick関数を呼び出します。
        className={styles.button} // スタイルを適用
        // newTodoTextが空の場合はボタンを無効にします。
        disabled={!newTodoText.trim()}
      >
        追加
      </button>
    </div>
  );
}