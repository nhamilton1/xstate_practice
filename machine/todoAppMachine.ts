import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMAFgDsFAKz2XLgIxbHWgJx+tp4AHPYANCAAnoh+FJ4AbAmOtgDMfsEBfv6eAL45EUI4BCScEvSkjEJsYABONag1FEYANioAZg0AthSFIiXitOWVMnIKSuaauvqWJrBmaqSWNggAtJ6+FE7xjik78R7+jvER0Qi2iRSOLg7BnunBKbaO9nkFMkWinFWYZZCsAMI1MAqMCYcgAd2mSBAs3mFmhy3OwQo8T8qJSbi0uz8LgxJzsKXim3c8XiWnWwSCtlswVeIF6xTEFEBwNUFTBYHBmGUMgoAGVCKhwVIOjVOpgyEYAK7KVgAMS6EtI0uUmCIuAqkChxlMEyWiBCKTiLjRGUctxp+0c+IQJuR1Mp5xSIVsLi08TpDM+lBZKikEO5vL5uG4Uh5GHY6koCgEPXefSZvrZjAD4dQ-JDYZk8lIvHGC302phuoW+oQ8WpFB8jme8WCFZNxyiBqcFFsWi010eoVR60cnvjjM4Sf9nMDGH5guF7NF4slMtYfKlACNOmYi7C9QjEPYUvY28EzSlQn4nBim6dCc5KVkz7eMcEXAOMB9+sygX72amg5n2WnWLU9SNC07RdHGL4JsOH7JhyXJphmoZ-tmYx+uoha6DMJbwqAyxpESth+I4fiePYDxktcJE2tc+4keaXi7F4PgenSpDoHAlhev0mFzFuOGICsQTIlsOx7AchEXvx5oUCkx7OoedbOvEGLPsIQ4DJI7JVNxcKLNuqyeC4zh3A83YkQcPg2q2JEViElJJK6fgqa+TLfL8EDabx1h2PYRJaARp72MRBE+CkNrrLYrhuk8pL2J2HbMW8EFqdQgxSN8ACidQNJAHmlnpazXCibreD5ngOC4oQ2mkzhaPWhHmg47ieLk+T0oO3rvqyo5wTIuXYV5CCeBixqmoRFr1oZNo0lo0nBbujgGZSC0vK1nGJtB3XjumApCiKirzsofW6XxZwdhQgQkQ4fiEm6j62FVhFVnVNaUvYTUtYlqkdSOX5jvBwaIYwaZHWWjaRbZWixQ8wRYpZBFxIEJqpDDzXXHkeRAA */
  createMachine(
    {
      id: "Todo Machine",
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          };
        },
        events: {} as
          | {
              type: "Create new";
            }
          | {
              type: "Form input changed";
              value: string;
            }
          | {
              type: "Submit";
            },
      },
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: "",
      },
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      initial: "Loading Todos",
      states: {
        "Loading Todos": {
          invoke: {
            src: "loadTodos",

            onDone: {
              target: "Todos Loaded",
              actions: "assignTodosToContext",
            },

            onError: [
              {
                target: "Loading Todos Errored",
                actions: "assignErrorMessageToContext",
              },
            ],
          },
        },

        "Todos Loaded": {
          on: {
            "Create new": "Creating new todo",
          },
        },
        "Loading Todos Errored": {},
        "Creating new todo": {
          states: {
            "Showing form input": {
              on: {
                "Form input changed": {
                  actions: "assignFormInputToContext",
                },

                Submit: "Saving todo",
              },
            },

            "Saving todo": {
              invoke: {
                src: "saveTodo",
                onDone: "#Todo Machine.Loading Todos",
                onError: [
                  {
                    target: "Showing form input",
                    actions: "assignErrorMessageToContext",
                  },
                ],
              },
            },
          },

          initial: "Showing form input",
        },
      },
    },
    {
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
          };
        }),
        assignErrorMessageToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          };
        }),
        assignFormInputToContext: assign((context, event) => {
          return {
            createNewTodoFormInput: event.value,
          };
        }),
      },
    }
  );
