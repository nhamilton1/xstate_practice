import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0ARgAsFewDYAHI4BMrra68A7AEAnPZaAKwANCAAnnb2FI4AzFqO7knhAV6BGQFJ9gC+BdFCOAQknBL0pIxCbByUCgIUpSIV4rTVtTJyCkrmmroa9gZIICawZmqkljYIDkkUSY5aXsGueauurmnu0XEIwc7h3l5Ojjsp-oXFIK3lYtSdUnWsYABO76jvFEYANioAGbfAC2LRkZVElWeNWkLHkpF4-Wm+n0lgmUwsYzmti8ngoEV8mUc4XsAS07gCjn2iC8SS8FGCdPcoXs7i8WlCSXcRRKELajzqmCqkFYAGF3mAVGBMOQAO5osYYgazWkrRJ44JaMnebmkmkINauCghJJBcJErwWoK8u78h6cIUiiCsAAiYD+YGUYEVxlMKuxiFJARNrnsXkcwWC7nc9jNAQNUcZW1CIQpwXJjlt9yhlAlUtUsPlmGUMgoAGVCKg5VJge8QZgyEYAK7KVgAMVBjdILeUmCIuBqkF943901VCDC4USJ2S+TcZzjwQN7m1iS0q214Qz-k82ftuYo+ZUUmLpYwFarNdhdYbTdbrHLzYARiCzCPlePAwgMsbwukAjJNlkmjalYiDQCCW1VYfFcaM4x5W4c3aI9JRPIswDlEsy3LXBuCkc9UHYdRGkRfhBAPFDj0LRgzxwvCCJkBEkRPdRUV0dExyxUA5mSad7BOLR6W1bYfAiA0kh2E02TyKkAhZC5gn3DBISotCaNlTDsIvXD8NhQi3k+b5fgBZRb3BFSBU4ajTy0wiKwY-SmL6VjBj0DilS4mZv3ydwKG3Hx-zJTkAjg1wDSyEN8mjWDZ3ccJwmU4QHUod1PQ0oRiM4JoKMslKKDSr0XmcsjkTYoYPL9SYAx42lwkWXxfBCJkyVXPwDQcOMKFcZYp3sJk0kcAJEqQyjHkKjKZEMr4fn+IFQQs5LDwm4qMGYxRXPY0YqsxbzaoQKlnDCDYSW5LUeqSCTjXJTUSXCVJ0ijJLVPGj0iqclSPhm0VyyMMBIEwZsjA-LyJ3q6dKXCHIQOCekwIODk-NjFY6SG9JliSZ6rNSt6NMIzAvu+UUrFgZRpQoXBAW9d4AAorQ3ABKVhkNe9LGM+ozJQgEHqq-fbZxNK1HHDPF5IjcLwMNPJGTpUlsncHqEoCIpblIdA4EsFnyE43nuOsOwknpAkLQiKlgwpKkOo5CGTla+m7vqrH8qqVbZB13aJ1xE5upWSNdTxFImQkvywjSZkjjyNIbj5PLDydTpIHdmr9Z-bICWEoawyOdlLcltxnHnODovJPxhqdw8XdhIUAFFOcTzzdb2lPcW2ChsiOCMd2Fo4JPWAkwgibwBMkoby7UgtbKwwik75lPMhnRw53sBdl6SZdJbSRZ7rCMlIqtbks1G2Px-Q2i7Jwq9ay7e9lBnvW5nDRYzjDDxAicQ3DYNXwtDb-9gnqsI3I1jRztMfR4NkMJT3onpRg08G4e2-KSJGFx-BmjnOJSWPUGQj2tK4bckZ8hj1Zu9boGA75NzmHgkMaNI7hlOFESWnU-IZGFgrIaZohJwSIZwFaH0sCEy5uQiceQ-KL1JAJNIeDwz2ANM-dcgDWFtSASrAoQA */
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

            onDone: [
              {
                target: "Todos Loaded",
                actions: "assignTodosToContext",
                cond: "Has Todos",
              },
              {
                target: "Creating new todo",
              },
            ],

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
      guards: {
        "Has Todos": (context, event) => event.data.length > 0,
      },
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
