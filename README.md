# Study_Todo アプリケーション

このプロジェクトは、[Next.js] を使用して構築されたシンプルなTodoアプリケーションです。新しくプロジェクトに参加する方が、このアプリケーションのセットアップ、実行、および基本的な構造を理解できるように作成されています。

## 1. はじめに

このアプリケーションは、タスクの管理（追加、表示、削除）を行うためのものです。フロントエンドはNext.jsで、バックエンドはNext.jsのAPIルートを使用しています。

## 2. 開発環境のセットアップ

プロジェクトを開始する前に、以下のツールがインストールされていることを確認してください。

*   [Node.js](https://nodejs.org/ja/) (v18以上を推奨)
*   [npm](https://www.npmjs.com/) (Node.jsに付属)

### 依存関係のインストール

プロジェクトのルートディレクトリで、以下のコマンドを実行して必要な依存関係をインストールします。

```bash
npm install
```

## 3. アプリケーションの実行

依存関係のインストールが完了したら、開発サーバーを起動できます。

```bash
npm run dev
```

サーバーが起動したら、ブラウザで [http://localhost:3000/main](http://localhost:3000/main) にアクセスしてアプリケーションを確認できます。

## 4. 主要なファイルとディレクトリ

このプロジェクトの主要なファイルとディレクトリは以下の通りです。

*   `src/pages/main.tsx`: アプリケーションのメインページです。Todoリストの表示とTodoの追加フォームが含まれています。
*   `src/components/TodoForm.tsx`: 新しいTodoを追加するためのフォームコンポーネントです。
*   `src/components/TodoList.tsx`: Todoアイテムのリストを表示するコンポーネントです。
*   `src/pages/api/todos.ts`: Todoアイテムの取得、追加、削除を処理するAPIルートです。
*   `src/styles/globals.css`: グローバルなCSSスタイルシートです。
*   `src/styles/Home.module.css`: `index.tsx`ページに適用されるモジュールCSSです。

## 5. APIルートについて

このプロジェクトでは、Next.jsの[APIルート]を使用してバックエンド機能を提供しています。

*   `src/pages/api/todos.ts`:
    *   `GET /api/todos`: すべてのTodoアイテムを取得します。
    *   `POST /api/todos`: 新しいTodoアイテムを追加します。
    *   `DELETE /api/todos?id=[id]`: 指定されたIDのTodoアイテムを削除します。

APIルートは `pages/api` ディレクトリにマッピングされており、このディレクトリ内のファイルはReactページではなくAPIエンドポイントとして扱われます。
