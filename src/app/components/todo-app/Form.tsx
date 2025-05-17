import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useTodo } from "./TodoContext";

const FormInput = () => {
  const [todo, setTodo] = useState<string>("");
  const { addTodo } = useTodo();

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = todo.trim();
    if (!trimmed) return;
    addTodo({ todo: trimmed, completed: false });
    setTodo("");
  };

  return (
    <>
      <form
        onSubmit={add}
        className=" bg-white flex w-full items-center justify-between shadow-[2px_4px_21px_-10px_rgba(0,_0,_0,_0.20)] focus-within:shadow-[4px_8px_30px_-6px_rgba(0,_0,_0,_0.25)] transition-shadow duration-300 rounded-full py-2 pr-2 pl-5"
      >
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="New task for today"
          className="text-base text-gray-900 placeholder:text-gray-400 focus:outline-none w-full h-full"
        />
        <button
          type="submit"
          className=" flex items-center cursor-pointer text-[#F6E7D5] bg-[#4d8a1c] px-4 py-2 rounded-full hover:bg-[#397209] transition-bg duration-300"
        >
          <IoMdAdd size={24} />
          <span className="text-m text-nowrap">New Task</span>
        </button>
      </form>
    </>
  );
};

export default FormInput;
