import { useState } from "react";
import { Heading, Input } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/services";

const Header = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const addNewTodoLoading = useSelector((state) => state.todos.addNewTodoLoading);

  const addTodos = (e) => {
    e.preventDefault();
    title && dispatch(addTodoAsync(title));
    setTitle("");
  };

  return (
    <>
      <Heading
        as="h1"
        size={["2xl", "6xl"]}
        noOfLines={1}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Todos App
      </Heading>
      <form onSubmit={addTodos} style={{ width: "100%" }}>
        <Input
          disabled={addNewTodoLoading}
          variant="flushed"
          placeholder="Add Todo"
          mt="5"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </>
  );
};

export default Header;
