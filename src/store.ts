import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type Todo = {
  id: string;
  text: string;
  complete: boolean;
};

export type Action =
  | { type: "delete"; payload: Todo }
  | { type: "clear"; payload: Todo[] };

type TodoStore = {
  todos: Todo[];
  lastAction: Action | undefined;
  addTodo: (text: string, id?: string) => void;
  deleteTodo: (id: string) => Todo | undefined;
  clearTodos: () => Todo[];
  toggleComplete: (id: string) => void;
  undoLastAction: () => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      lastAction: undefined,
      addTodo: (text: string, id?: string) =>
        set((state) => ({
          lastAction: undefined,
          todos: [
            ...state.todos,
            {
              id: id ?? uuidv4(),
              text,
              complete: false,
            },
          ],
        })),
      deleteTodo: (id: string) => {
        const todoToDelete = get().todos.find((todo) => todo.id === id);
        if (!todoToDelete) return;
        set((state) => ({
          lastAction: { type: "delete", payload: todoToDelete },
          todos: state.todos.filter((todo) => todo.id !== id),
        }));

        return todoToDelete;
      },
      clearTodos: () => {
        const todos = get().todos;
        set(() => ({
          lastAction: { type: "clear", payload: todos },
          todos: [],
        }));
        return todos;
      },
      toggleComplete: (id: string) =>
        set((state) => ({
          lastAction: undefined,
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, complete: !todo.complete } : todo
          ),
        })),
      undoLastAction: () => {
        const lastAction = get().lastAction;

        if (!lastAction) return;

        const { type, payload } = lastAction;

        if (type === "delete") {
          return set((state) => ({
            lastAction: undefined,
            todos: [...state.todos, payload],
          }));
        } else {
          return set(() => ({
            lastAction: undefined,
            todos: payload,
          }));
        }
      },
    }),
    {
      storage: createJSONStorage(() => localStorage),
      name: "todo-local-storage",
    }
  )
);
