import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
  const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
  return res.data;
});

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (title) => {
  const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, { title });
  return res.data;
});

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async ({ id, data }) => {
  const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
  return res.data;
});

export const deleteTodoAsync = createAsyncThunk("todos/deleteTodoAsync", async (id) => {
  await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
  return id;
});

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: "all",
    isLoading: false,
    error: null,
    addNewTodoLoading: false,
    addNewTodoError: null,
  },
  reducers: {
    changeFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((todo) => !todo.completed);
    },
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
    // Toggle Todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const index = state.items.findIndex((todo) => todo.id === action.payload.id);
      state.items[index] = action.payload;
      state.toggleTodoLoading = false;
    },
    // Delete Todo
    [deleteTodoAsync.fulfilled]: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
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

export const { changeFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
