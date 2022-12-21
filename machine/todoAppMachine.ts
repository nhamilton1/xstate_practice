import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMARgCcFRwGYA7ADZPT+94Csrp4ALAA0IACeiMFaFP6OtsEAHI7J7kGuWq4AvtnhQjgEJJwS9KSMQmxgAE7VqNUURgA2KgBm9QC2FAUixeK0ZRUycgpK5pq6+pYmsGZqpJY2CAC09u6xwV7p6Z7+-lqOXuFRCLY+FO7+iUlOSUmutu7BufkyhaKclZilkKwAwtUwCowJhyAB3KZIEAzOYWKFLM5JCieRwo1z+GIeRyBfzHOxBCjBYL+bxaNZJBy2WxJF4gHpFMQUAFA1TlUFgMGYZQyCgAZUIqDBUna1Q6mDIRgArspWAAxTri0hS5SYIi4cqQSHGUzjRZ2dzuCj2fZaG7ojEPex4hCBVwUMmuTKOA5E-aeXJ5ECkdBwSz0j5gaY6+Z6lYOJGbTzbIJ7A5HSKIZbBTwuLSXezBexJdyJfzuWn+vrUAZSSpB2a6+GJ42G26O6kZ2Np62bI3J8MUvw5+IFt69RlfH4QcuwhZV07J+22RypYKOezTtOua1rWxxfaPbwxE3uz2FxmlUvDTAAUVq9UgI8roCWqyuyP29i0yYXxKSYQTCFch3tSRRBopV17HsXsMHeItmRUKRwS5GQrxDccqWcY0tFNexzWCS1bGtR1DQ8HNiUSLxvFA4QGU4SDWUYGDuQwPkBSFNkRTFCVpXguEbzsJJYnuGN3HfHxPAcdwW1sO1swItYfG44Dng9IA */
  createMachine(
    {
      id: "Todo Machine",
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
        },
        events: {} as
          | {
              type: "Create new";
            }
          | {
              type: "Form input changed";
              value: string;
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
