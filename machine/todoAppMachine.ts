import { createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxM6rJgDa0SQBtAAwBdRKAAOnYgBdiqUuJAAPRACYhaigBYA7ADYArPrWGANCACeiABxCKhgL6OLHHARLlqfBk3SdWGjpfDi4AMVxibkFRJSlYWXlFJBVEfW0KNQBmGzUbAEZTC2sEfO0sh2cXEFJ0OCU3PCIyMDjpOQUlVQQAWkN7IV0NPXzDAE5DbX0xtX1ixD6KMeXl-qz9Av0sw3znV393Zq8g+lJGULaEjuTQbu01eYQCvZBGjxaKUMwTyEvEzpS3TUBh0+nyQkMuh2+V0uiyEMeeUMFHyJkGUPBQlGWRebyOlBOIX8XAAogAnMmoMm-FLxf43VK9LSDYa6UYTKYzLaItmZMajDRDcpYrLaKqOIA */
  createMachine(
    {
      id: "Todo Machine",
      schema: {
        events: {} as
          | { type: "Todos loaded"; todos: string[] }
          | { type: "Loading Todos Failed"; errorMessage: string },
      },
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      initial: "Loading Todos",
      states: {
        "Loading Todos": {
          on: {
            "Todos loaded": {
              target: "Todos Loaded",
              actions: "consoleLogTodos",
            },

            "Loading Todos Failed": "Loading Todos Errored",
          },
        },

        "Todos Loaded": {},
        "Loading Todos Errored": {},
      },
    },
    {
      actions: {
        consoleLogTodos: (context, event) => {
          alert(JSON.stringify(event.todos));
        },
      },
    }
  );
