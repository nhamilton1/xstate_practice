// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]": {
      type: "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Todo Machine.Loading Todos:invocation[0]": {
      type: "done.invoke.Todo Machine.Loading Todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Todo Machine.Creating new todo.Saving todo:invocation[0]": {
      type: "error.platform.Todo Machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
    };
    "error.platform.Todo Machine.Loading Todos:invocation[0]": {
      type: "error.platform.Todo Machine.Loading Todos:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.Todo Machine.Loading Todos:invocation[0]";
    saveTodo: "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: "loadTodos" | "saveTodo";
  };
  eventsCausingActions: {
    assignErrorMessageToContext:
      | "error.platform.Todo Machine.Creating new todo.Saving todo:invocation[0]"
      | "error.platform.Todo Machine.Loading Todos:invocation[0]";
    assignFormInputToContext: "Form input changed";
    assignTodosToContext: "done.invoke.Todo Machine.Loading Todos:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    loadTodos:
      | "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]"
      | "xstate.init";
    saveTodo: "Submit";
  };
  matchesStates:
    | "Creating new todo"
    | "Creating new todo.Saving todo"
    | "Creating new todo.Showing form input"
    | "Loading Todos"
    | "Loading Todos Errored"
    | "Todos Loaded"
    | { "Creating new todo"?: "Saving todo" | "Showing form input" };
  tags: never;
}
