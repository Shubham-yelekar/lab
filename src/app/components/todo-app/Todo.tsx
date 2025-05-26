"use client";

import React, { useEffect, useState } from "react";

import TaskCard from "./TaskCard";
import FormInput from "./Form";
import TaskList from "./TaskList";
import "./styles.css";
import { TodoProvider } from "./TodoContext";

interface TodoType {
  id: number;
  todo: string;
  completed: boolean;
}

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);

  const addTodo = (todo: any) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id: number, todo: TodoType) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const todos = localStorage.getItem("todos");

    if (todos && todos.length > 0) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodo }}
    >
      <div className=" w-full p-4 md:w-[500px] m-auto ">
        <FormInput />
        <h2 className="text-slate-400 my-5">
          <span className="font-bold text-slate-600 ">Task for</span> ●{" "}
          {formattedDate}
        </h2>
        <TaskList />
      </div>
    </TodoProvider>
  );
};

export default Todo;
