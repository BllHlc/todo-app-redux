import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: "1",
        title: "Learn React",
        completed: false,
      },
      {
        id: "2",
        title: "Learn Redux",
        completed: true,
      },
      {
        id: "3",
        title: "Learn Redux Toolkit",
        completed: false,
      }
    ],
    activeFilter: "all",
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((todo) => !todo.completed);
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export const selectFiteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  } else {
    return state.todos.items.filter((item) =>
      item.completed === (state.todos.activeFilter === "completed" ? true : false)
    );
  }
};
export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { addTodo, toggleTodo, deleteTodo, changeFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
