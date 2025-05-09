import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';

export type Todo = {
  id: string;
  text: string;
  complete: boolean;
}

type TodoStore = {
  todos: Todo[]
  addTodo: (text: string, id?: string) => void
  deleteTodo: (id: string) => Todo | undefined
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (text: string, id?: string) => set((state) => ({ todos: [...state.todos, {
        id: id ?? uuidv4(),
        text,
        complete: false,
      }]})),
      deleteTodo: (id: string) => {
        const todoToDelete = get().todos.find(todo => todo.id === id )
        set((state) => ({todos: state.todos.filter((todo) => todo.id !== id)}))
        return todoToDelete
      },
    }),
    {
      storage: createJSONStorage(() => localStorage),
      name: "todo-local-storage"
    },
  ),
)
