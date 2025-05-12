import { Control } from "./components/Control";
import { Input } from "./components/Input";
import { List } from "./components/List";

const App = () => (
  <div className="h-full flex flex-col">
    <List />
    <div className="mt-auto sticky bottom-0 left-0 w-full flex justify-center p-4 backdrop-blur-lg border-t-1 border-t-green-500">
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Control />
        <Input />
      </div>
    </div>
  </div>
);

export default App;
