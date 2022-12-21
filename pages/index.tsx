import { useMachine } from "@xstate/react";
import { todosMachine } from "../machine/todoAppMachine";

const todos = new Set<string>(["Take bins out", "Do laundry"]);

export default function Home() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput);
      },
    },
  });
  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.matches("Todos Loaded") && (
          <button
            onClick={() =>
              send({
                type: "Create new",
              })
            }
          >
            Add Todo
          </button>
        )}
        {state.matches("Creating new todo.Showing form input") && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send({
                type: "Submit",
              });
            }}
          >
            <input
              onChange={(e) => {
                send({
                  type: "Form input changed",
                  value: e.target.value,
                });
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
}
