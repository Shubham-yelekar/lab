import { createContext, useContext } from "react";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, todo: Todo) => void;
  toggleTodo: (id: number) => void;
};

const TodoContext = createContext<TodoContextType>({
  todos: [
    {
      id: 1,
      todo: "Message",
      completed: false,
    },
  ],
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  toggleTodo: () => {},
});

const useTodo = () => {
  return useContext(TodoContext);
};

const TodoProvider = TodoContext.Provider;

export { TodoContext, useTodo, TodoProvider };
