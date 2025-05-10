import { useTodoStore } from "../../store";
import { Todo } from "../Todo";

// renders the list of todos
export const List = () => {
  const todos = useTodoStore((store) => store.todos);

  if (todos.length === 0) {
    return (
      <div className="w-40 mx-auto flex items-center justify-center h-screen text-gray-500 text-center">
        You can do whatever you set your mind to, man
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto max-w-2xs pt-4 pb-44">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
};
