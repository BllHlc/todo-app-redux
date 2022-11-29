import { createSlice } from "@reduxjs/toolkit";
import { getTodosAsync, addTodoAsync, toggleTodoAsync, deleteTodoAsync, updateTodoAsync, deleteCompletedTodosAsync } from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: localStorage.getItem("activeFilter") || "all",
    isLoading: false,
    error: null,
    addNewTodoLoading: false,
    addNewTodoError: null,
  },
  reducers: {
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setTodos: (state, action) => {
      state.items = state.items.filter((item) => item.title.toLowerCase().includes(action.payload.toLowerCase()));
    }
  },
  extraReducers: {
    // Get Todos
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;

    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // Add Todo
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodoLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodoLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodoLoading = false;
      state.addNewTodoError = action.error.message;
    },
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const index = state.items.findIndex((todo) => todo.id === action.payload.id);
      state.items[index] = action.payload;
      state.toggleTodoLoading = false;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    [updateTodoAsync.fulfilled]: (state, action) => {
      const index = state.items.findIndex((todo) => todo.id === action.payload.id);
      state.items[index] = action.payload;
    },
    [deleteCompletedTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    }
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

export const { changeFilter, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
