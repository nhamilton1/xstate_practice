import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMAFgDsFAKz2XLgIxbHWgJx+tp4AHPYANCAAnoh+FJ4AbAmOtgDMfsEBfv6eAL45EUI4BCScEvSkjEJsYABONag1FEYANioAZg0AthSFIiXitOWVMnIKSuaauvqWJrBmaqSWNggAtJ6+FE7xjik78R7+jvER0Qi2iRSOLg7BnunBKbaO9nkFMkWinFWYZZCsAMI1MAqMCYcgAd2mSBAs3mFmhy3OWgou3W9i0wXiKRcKWCJzsDwotlsWXsKScWhSCRS8VeIF6xTEPRGP0GfwAImBmmBlGAocZTBMloh7MFgpssX4XI4-PFglp4vsXPiEOtbK4XFonrZNU4aes6QzPpRAcDVBUwWBwZhlDIKABlQiocFSDo1TqYMhGACuylYADEup7SD7lJgiLgKpB+TDBQthaqtC5Nm4yVSEkFPGkVfLPJstFqtJ4XH4jrZQob3n0maaVFIITa7Y7na6g17fax7d6AEadMwx2FChGIbHxVwPRzrEJk9LhKKIaV5gveYmK9JZ4KVjAffoUWvmxgN20YB24bhSY+odjqSgKATM7fVzj7+tWxsn+1ni8yeSkXjjBZ9AHON4VAZYyWTYt0UeItFSRZV5wQGl7EuEIdmeRwMnseI-C3YRGWfIE6wtI8my-C1L1YWp6kaFp2i6B98ONPciIPS1rUvU9zwon8xjrdQgN0GYQMWYckJCVxAn2W5fFLHDjkQ5JnCpdJzn2exRQ8PCdyZTluTYoQqLqBomlaZQ3W6I1dz0nkpCEX9-34yY9CE6FB3jMSrnVNI-A0vwaTSNw8UQ7xnB8Tx0TJZ47iCbSn0oGyDJka9ODvQQqwIhKuVsi17L4iZBIMNyRITHUUgoeIFR8AIgkwgsFNONYswq8lvC8QJRScFw8nyEBSHQOBLCssRhLmIcwMQFYgnFLZ0JpA45JVKakwoYI3DuItRSpBwUjizLqEGOyRlGuFRIm1Zi2cO4HkeW53E1HwVScOJsOm4Igm2HVcN64avhZX4IBO8brDsbCKC1AI-M8EkfBSFU1Q1LUjnidEHtpH6MuYsojpYTAAFFjKBQHirGjzzrWa4Ks1bxsOh9xQhVNIwsxUtMIcdxPFyDHH32l8SLfS8gbJkGEGlFMNJSdN4kzbNEK21wi0pCKtXsdJdu5pjdz5w8BabJ0XQtCzg1DIXQJF6Hyo+hJ3snNNJZVSrkR1DIcW8XESS5t4eeY7X2PfVAuO-DBTbOkWvHFUI4N2NMkwdx4URRlxtn2Xz-M9+lMes7KkuDknToTfZnCcYIdnsOniQQxrOfFbEy8xPVfBpb6vc13Ts6DrBqIaSAQ4TK5yoyfwkyeEt0UceHkkR8tVehiHup6oA */
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

        "Deleting todo errored": {},
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
