import { useState } from "react";
import { Heading, Input } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todos/todosSlice";
import { nanoid } from "@reduxjs/toolkit";

const Header = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();
    title && dispatch(addTodo({ id: nanoid(), title, completed: false }));
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
      <form onSubmit={handelSubmit} style={{ width: "100%" }}>
        <Input
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
