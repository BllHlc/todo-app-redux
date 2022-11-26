import { createAsyncThunk } from "@reduxjs/toolkit";
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

export const updateTodoAsync = createAsyncThunk("todos/updateTodoAsync", async ({ id, data }) => {
  const res = await axios.put(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
  return res.data;
});

export const deleteCompletedTodosAsync = createAsyncThunk("todos/deleteCompletedTodosAsync", async () => {
  const res = await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
  return res.data;
});