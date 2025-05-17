import React, { useMemo } from "react";
import { useTodo } from "./TodoContext";
import TaskCard from "./TaskCard";
import { motion, AnimatePresence } from "framer-motion";
const TaskList = () => {
  const { todos } = useTodo();

  const completedTask = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos]
  );

  const incompletedTask = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );

  return (
    <>
      <div className="flex flex-col gap-4 mb-4 ">
        {incompletedTask.length === 0 ? (
          <motion.p
            key="no-task"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No task
          </motion.p>
        ) : (
          incompletedTask.map((todo) => (
            <AnimatePresence key={todo.id}>
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <TaskCard key={todo.id} task={todo} />
              </motion.div>
            </AnimatePresence>
          ))
        )}
      </div>
      <div className="flex flex-col gap-4 mt-4 pt-4  border-t-2 border-sky-100">
        {completedTask.length > 0 &&
          completedTask.map((todo) => (
            <AnimatePresence key={todo.id}>
              <motion.div
                key={todo.id}
                initial={{ opacity: 1, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <TaskCard key={todo.id} task={todo} />
              </motion.div>
            </AnimatePresence>
          ))}
      </div>
    </>
  );
};

export default TaskList;
