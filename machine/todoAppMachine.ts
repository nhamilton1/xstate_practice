import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMAFgDsFAKz2XLgIxbHWgJx+tp4AHPYANCAAnoh+FJ4AbAmOtgDMfsEBfv6eAL45EUI4BCScEvSkjEJsYABONag1FEYANioAZg0AthSFIiXitOWVMnIKSuaauvqWJrBmaqSWNggAtJ6+FE7xjik78R7+jvER0Qi2iRSOLg7BnunBKbaO9nkFMkWinFWYZZCsAMI1MAqMCYcgAd2mSBAs3mFmhyyCzmuGSeWi0oRcWmuJzsDwotlsWXsKScWhSCRS8VeIF6xTEPRGP0GfwAImBmmBlGAocZTBMlogvM4jp4HAFgrddo5cQgAhQsuc-OsshlfC98rT3n0GYDgaoKmCwODMMoZBQAMqEVDgqQdGqdTBkIwAV2UrAAYl0naRXcpMERcBVILyYfyFoKEN4XJs3CSKQkgp40rLglpPJt0bZ0y4-EdbKEaXTPpQ9SopBDTearTa7d7nW7WBaXQAjTpmUOwgUIxApFzxVwPRzrEIk9LhKJC4cUdHeQnxeLpZPBIva+mcMsGxiVs0YS24bhSXeodjqSgKASMjAffoUTcV41VvcWg9HmTyUi8cYLfSd8Pw0BlhJGNPDcclswSeJzmxWUqXsS4Qh2Z5HAyexF1Xa8dQ3IFy0NHdq1fQ1j1YWp6kaFp2i6K9hHXUscK3I0TWPfdDyI98xnLdRf10GZ-0WHsEApYJXECfZbl8PNF2OScEGSZwKXSc59nsexgg8DCaJLCh2U5BihFPTgL0ENctJ0rkpCED8v04yY9B46EuwjATbBcFIKHiLQPMcAIkTTTzZTWZN3NJaM7huJwXA0m8GTMvSZBIuoGiaVplHtbpi1vWKLPYz9FBs7iDAcvjI2eeDvG2dwUgyTyUhSWCB18As-HcLFVLSPwoqwygsrY69SIaP4rFgZQQQoXA2m5GoAAoXPRABKVgMpijlzN6rB+qBCA-zmbtAKFFTLhc+wxQLFCHGk04njcwI+xO4J4j7FxHE62jtJWhjj0wDa-gtIwwEgTAXSMba4X4vaEFcmNgiuK6xz8R4J0ujEKFuewtFSJwHlJFI8k1Uh0DgSwlvIXidqc8GViCYStiQqkDkkgLsyhtwQg8sU3G8ldNWJgZJENKpSdByM1ieuJ0lqgtPBa9EZRkpw4jQqngiCbYXI67mTNvb5fggQXdusOw0JnIlmvsZUiR8OqZPWWxXCxJ4FzRrFPJerSymylhMAAUUSza9fJg3VlA239nTLQ0LFdxQlgvMZ3uvMzpUrxcg1zDXvvPDH2Pf2AMD0X3BU2rPETYuUzl-EsW8Ck0fFIdXdvDPtyz6trVtQ00p9P0c7BwOxTclWEmV4d41q2UPK0AkXAyVyq+V5V691eiHyYgjWMYbOirJ3Pli8YTQgXVJnlqmCZIe224P7I5czNikF84HrhgwbvI32ZxMZ2Y6HEJFwAuL4S+2OvdJwuxyToVTppTK703x9V9pAZ+AkdjU3cMXNw90vBBFlCrTMVdAF+SqrYXGOQgA */
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
          deleteTodo: {
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
            }
          | {
              type: "Delete";
              todo: string;
            }
          | {
              type: "Speed up";
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
            Delete: "Deleting Todo",
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

        "Deleting Todo": {
          invoke: {
            src: "deleteTodo",
            onError: [
              {
                target: "Deleting todo errored",
                actions: "assignErrorMessageToContext",
              },
            ],
            onDone: "Loading Todos",
          },
        },

        "Deleting todo errored": {
          after: {
            "2500": "Todos Loaded",
          },

          on: {
            "Speed up": "Todos Loaded",
          },
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
