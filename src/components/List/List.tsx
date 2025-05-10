import { emptyTodoQuotes } from "../../constants";
import { useTodoStore } from "../../store";
import { Todo } from "../Todo";

// renders the list of todos
export const List = () => {
  const todos = useTodoStore((store) => store.todos);

  if (todos.length === 0) {
    return (
      <div className="w-40 mx-auto flex items-center justify-center flex-1 text-gray-500 text-center">
        {emptyTodoQuotes[Math.floor(Math.random() * emptyTodoQuotes.length)]}
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto max-w-72 py-4 flex-1">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
};
