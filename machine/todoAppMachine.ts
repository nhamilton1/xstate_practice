import { createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMAFgDMFAJz2AjAHZ7nx7dsAHC4uAKy2ADQgAJ6IAbYUISFOAGwhvo7u7o7JAQC+uZFCOAQknBL0pIxCbGAATrWotRRGADYqAGaNALYURSKl4rQVVTJyCkrmmrr6liawZmqkljYIDs5uXj5+gcFhkTEI7vZaFEEhjgGeR8Feyfb5BSCk6HCWfSVis6aTy4gAtMl9v9kvlCjJiqIykMpNUvvMfkhrIh7BFooh3Fp4rZPFc4gFkqkQjl7o93pDBKNMOVIHCFhZESt7MlPAkAvYAo4tMlbO4XJktJ4gQgAu4EqCQGSBtRoZVpCxMABReqNGmIuZ0pYM5HM1nsznc3n8wVow4eCiOUIXK72G6eO4PXJAA */
  createMachine({
    id: "Todo Machine",
    schema: {
      // events: {} as
      //   | { type: "Todos loaded"; todos: string[] }
      //   | { type: "Loading Todos Failed"; errorMessage: string },
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
    },
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    initial: "Loading Todos",
    states: {
      "Loading Todos": {
        invoke: {
          src: "loadTodos",

          onDone: {
            target: "Todos Loaded",
          },

          onError: "Loading Todos Errored",
        },
      },

      "Todos Loaded": {},
      "Loading Todos Errored": {},
    },
  });
