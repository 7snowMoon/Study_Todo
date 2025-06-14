// スタイルシートをインポートします。
import styles from '@/styles/Main.module.css';

// TODOアイテムの型定義。
interface Todo {
  id: number; // TODOの一意なID
  text: string; // TODOの内容
  completed: boolean; // TODOが完了したかどうかを示すフラグ
}

// TodoListコンポーネントに渡されるプロパティ（props）の型を定義します。
interface TodoListProps {
  todos: Todo[]; // 表示するTODOアイテムの配列
  onToggle?: (id: number, completed: boolean) => void; // TODOの完了状態を切り替える関数（オプション）
  onDelete?: (id: number) => void; // TODOを削除する関数（オプション）
  showControls?: boolean; // チェックボックスと削除ボタンを表示するかどうか（オプション、デフォルトはtrue）
}

// TodoListコンポーネントは、TODOアイテムのリストを表示します。
// propsとしてtodos（TODOの配列）、onToggle（完了状態切り替え関数）、onDelete（削除関数）、
// showControls（コントロール表示フラグ）を受け取ります。
// showControlsのデフォルト値はtrueです。
function TodoList({ todos, onToggle, onDelete, showControls = true }: TodoListProps) {
  return (
    // ul要素にスタイルを適用します。
    <ul className={styles.todoList}>
      {/* todos配列をmapメソッドで反復処理し、各TODOアイテムをli要素としてレンダリングします。
          keyプロパティは、Reactがリストの要素を効率的に更新するために必要です。 */}
      {todos.map((todo) => (
        <li key={todo.id} className={styles.todoItem}>
          {/* showControlsがtrueの場合のみ、チェックボックスをレンダリングします。
              これは条件付きレンダリングの一例です。 */}
          {showControls && (
            <input
              type="checkbox" // チェックボックスタイプ
              checked={todo.completed} // TODOの完了状態とチェックボックスの状態を同期
              // チェックボックスの状態が変更されたときにonToggle関数を呼び出します。
              // onToggle?.(..)は、onToggleが存在する場合にのみ呼び出す安全な方法です。
              onChange={() => onToggle?.(todo.id, !todo.completed)}
              className={styles.checkbox} // スタイルを適用
            />
          )}
          {/* TODOのテキストを表示するspan要素です。 */}
          <span
            // TODOが完了している場合はテキストに打ち消し線を適用します。
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
            className={styles.todoText} // スタイルを適用
          >
            {todo.text}
          </span>
          {/* showControlsがtrueの場合のみ、削除ボタンをレンダリングします。 */}
          {showControls && (
            <button onClick={() => onDelete?.(todo.id)} className={styles.deleteButton}>
              削除
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

// TodoListコンポーネントをデフォルトエクスポートします。
export default TodoList;