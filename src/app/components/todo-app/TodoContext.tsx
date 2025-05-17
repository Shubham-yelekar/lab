import { createContext, useContext } from "react";

const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Message",
      completed: false,
    },
  ],
  addTodo: (todo: any) => {},
  deleteTodo: (id: any) => {},
  updateTodo: (id: any, todo: any) => {},
  toggleTodo: (id: any) => {},
});

const useTodo = () => {
  return useContext(TodoContext);
};

const TodoProvider = TodoContext.Provider;

export { TodoContext, useTodo, TodoProvider };
