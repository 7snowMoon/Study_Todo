import { NextApiRequest, NextApiResponse } from 'next';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];
let nextId = 1;

const handleGet = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(todos);
};

const handlePost = (req: NextApiRequest, res: NextApiResponse) => {
  const { text } = req.body;
  if (typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ message: 'Text is required' });
  }
  const newTodo: Todo = { id: nextId++, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

const handlePut = (req: NextApiRequest, res: NextApiResponse) => {
  const { id, completed } = req.body;
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = completed;
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

const handleDelete = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const todoId = parseInt(id as string);
  const initialLength = todos.length;
  todos = todos.filter(t => t.id !== todoId);
  if (todos.length < initialLength) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    case 'POST':
      handlePost(req, res);
      break;
    case 'PUT':
      handlePut(req, res);
      break;
    case 'DELETE':
      handleDelete(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}