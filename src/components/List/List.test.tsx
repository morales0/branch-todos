/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "vitest-browser-react";
import { emptyTodoQuotes } from "../../constants";
import { List } from "./List";

// Mutable impl function
let mockUseTodoStoreImpl: any = null;

vi.mock("../../store", async () => {
  const actual = await vi.importActual<typeof import("../../store")>(
    "../../store"
  );
  return {
    ...actual,
    useTodoStore: (selector: any) => selector(mockUseTodoStoreImpl),
  };
});

describe("List", () => {
  test("should show a quote when there are no todos", async () => {
    mockUseTodoStoreImpl = {
      todos: [],
    };

    const { getByText } = renderList();

    const quoteFound = emptyTodoQuotes.some((quote) => {
      try {
        getByText(quote);
        return true;
      } catch {
        return false;
      }
    });

    expect(quoteFound).toBe(true);
  });

  test("should render todos when they exist", async () => {
    mockUseTodoStoreImpl = {
      todos: [{ id: "1", text: "One todo", complete: true }],
    };

    const { getByText } = renderList();

    expect(getByText("One todo")).toBeInTheDocument();
  });
});

const renderList = () => render(<List />);
