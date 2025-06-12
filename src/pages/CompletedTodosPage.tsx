import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import TodoList from "@/components/TodoList"; // TodoListコンポーネントをインポート
import styles from "@/styles/Main.module.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function CompletedTodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const completedTodos = todos.filter((todo) => todo.completed);


  return (
    <>
      <Head>
        <title>完了したTODOリスト</title>
        <meta name="description" content="完了したTODOの一覧" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title}>完了したTODOリスト</h1>
          {loading ? (
            <p>読み込み中...</p>
          ) : (
            <TodoList todos={completedTodos} showControls={false} />
          )}
          <Link href="/TodosPage" className={styles.button}>
            TODOリストに戻る
          </Link>
        </div>
      </div>
    </>
  );
}