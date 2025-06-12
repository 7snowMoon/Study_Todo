import Head from "next/head";
import { useState, useEffect } from "react";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import styles from "@/styles/Main.module.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (text: string) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, completed }),
    });
    const updatedTodo = await res.json();
    setTodos(
      todos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos?id=${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Head>
        <title>TODOリスト</title>
        <meta name="description" content="TODOリストのメインページ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>TODOリスト</h1>

          <div className={styles.section}>
            <h2>TODO入力</h2>
            <TodoForm onAdd={addTodo} />
          </div>

          <div className={styles.section}>
            <h2>TODO一覧</h2>
            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
          </div>
        </main>
      </div>
    </>
  );
}
