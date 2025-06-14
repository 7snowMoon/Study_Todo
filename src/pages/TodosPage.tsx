// Next.jsのHeadコンポーネントをインポートし、ページのメタデータを管理します。
import Head from "next/head";
// ReactのuseStateとuseEffectフックをインポートし、コンポーネントの状態管理と副作用を扱います。
import { useState, useEffect } from "react";
// TODOリストを表示するコンポーネントをインポートします。
import TodoList from "@/components/TodoList";
// TODOを追加するためのフォームコンポーネントをインポートします。
import TodoForm from "@/components/TodoForm";
// スタイルシートをインポートします。
import styles from "@/styles/Main.module.css";

// TODOアイテムの型定義。TypeScriptを使用することで、コードの可読性と保守性が向上します。
interface Todo {
  id: number; // TODOの一意なID
  text: string; // TODOの内容
  completed: boolean; // TODOが完了したかどうかを示すフラグ
}

// TodosPageコンポーネントは、TODOリストのメインページです。
// ここでTODOの状態管理、APIとの連携、子コンポーネントへのデータ受け渡しを行います。
export default function TodosPage() {
  // useStateフックを使用して、TODOリストの状態を管理します。
  // todos: 現在のTODOアイテムの配列
  // setTodos: todosを更新するための関数
  const [todos, setTodos] = useState<Todo[]>([]);

  // useEffectフックを使用して、コンポーネントがマウントされたときに一度だけTODOをフェッチします。
  // 第二引数の空の配列`[]`は、このエフェクトがコンポーネントの初回レンダリング時のみ実行されることを意味します。
  useEffect(() => {
    fetchTodos();
  }, []);

  // TODOリストをAPIからフェッチする非同期関数です。
  const fetchTodos = async () => {
    const res = await fetch("/api/todos"); // /api/todosエンドポイントからデータを取得
    const data = await res.json(); // 取得したレスポンスをJSON形式にパース
    setTodos(data); // 状態を更新し、UIにTODOリストを反映
  };

  // 新しいTODOを追加する非同期関数です。
  const addTodo = async (text: string) => {
    const res = await fetch("/api/todos", { // /api/todosエンドポイントにPOSTリクエストを送信
      method: "POST", // HTTPメソッドをPOSTに設定
      headers: {
        "Content-Type": "application/json", // リクエストボディの形式をJSONに設定
      },
      body: JSON.stringify({ text }), // TODOの内容をJSON形式で送信
    });
    const newTodo = await res.json(); // 追加されたTODOの情報を取得
    setTodos([...todos, newTodo]); // 既存のTODOリストに新しいTODOを追加して状態を更新
  };

  // TODOの完了状態を切り替える非同期関数です。
  const toggleTodo = async (id: number, completed: boolean) => {
    const res = await fetch("/api/todos", { // /api/todosエンドポイントにPUTリクエストを送信
      method: "PUT", // HTTPメソッドをPUTに設定
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, completed }), // 更新するTODOのIDと完了状態を送信
    });
    const updatedTodo = await res.json(); // 更新されたTODOの情報を取得
    setTodos(
      // TODOリストを更新します。該当するTODOのcompleted状態を切り替えます。
      todos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  // TODOを削除する非同期関数です。
  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos?id=${id}`, { // /api/todosエンドポイントにDELETEリクエストを送信
      method: "DELETE", // HTTPメソッドをDELETEに設定
    });
    // 削除されたTODOを除外した新しいリストで状態を更新します。
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    // Reactフラグメントを使用して、複数の要素をグループ化します。
    <>
      {/* Headコンポーネントは、Next.jsが提供するもので、ページの<head>要素を管理します。 */}
      <Head>
        <title>TODOリスト</title>
        <meta name="description" content="TODOリストのメインページ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* 全体のコンテナ。スタイルはMain.module.cssから適用されます。 */}
      <div className={styles.container}>
        {/* メインコンテンツ領域。 */}
        <main className={styles.main}>
          <h1 className={styles.title}>TODOリスト</h1>

          {/* TODO入力セクション */}
          <div className={styles.section}>
            <h2>TODO入力</h2>
            {/* TodoFormコンポーネント。新しいTODOを追加するための入力フォームを提供します。
                onAddプロパティを通じて、親コンポーネント(TodosPage)のaddTodo関数を呼び出します。 */}
            <TodoForm onAdd={addTodo} />
          </div>

          {/* TODO一覧セクション */}
          <div className={styles.section}>
            <h2>TODO一覧</h2>
            {/* TodoListコンポーネント。TODOアイテムのリストを表示します。
                todos: 表示するTODOアイテムの配列
                onToggle: TODOの完了状態を切り替える関数
                onDelete: TODOを削除する関数 */}
            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
          </div>
        </main>
      </div>
    </>
  );
}
