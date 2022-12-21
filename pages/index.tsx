import { useMachine } from "@xstate/react";
import { myMachine } from "../machine/myFirstMachine";
import { todosMachine } from "../machine/todoAppMachine";

export default function Home() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return ["Buy milk", "Buy eggs"];
      },
    },
  });
  return (
    <div>
      {JSON.stringify(state.value)}
      <button
        onClick={() =>
          send({
            type: "Todos loaded",
            todos: ["Buy milk"],
          })
        }
      >
        Todos loaded
      </button>
      <button
        onClick={() =>
          send({
            type: "Loading Todos Failed",
            errorMessage: "Something went wrong",
          })
        }
      >
        Todos Failed
      </button>
    </div>
  );
}
