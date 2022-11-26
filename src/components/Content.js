import { useEffect, useState, useRef } from "react";
import {
  Input,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { selectFiteredTodos, getTodosAsync, toggleTodoAsync, deleteTodoAsync } from "../redux/todos/todosSlice";
import EditTodo from "./EditTodo";
import React from "react";

const Content = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const items = useSelector(selectFiteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);
  const newTodoLoading = useSelector((state) => state.todos.addNewTodoLoading);
  const newTodoError = useSelector((state) => state.todos.addNewTodoError);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodoAsync(id));
    onClose();
  };

  const handleToggle = async (id, completed) => {
    dispatch(toggleTodoAsync({ id, data: { completed } }));
  };

  if (isLoading) {
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        mt="14"
      />
    );
  }

  if (error) {
    return (
      <Alert status="error" mt="2" >
        <AlertIcon />
        Error: {error}
      </Alert>
    );
  }

  return (
    <>
      <TableContainer w="100%" overflowY="auto">
        <Table variant="simple">
          <Tbody role="rowgroup">
            {items.map((todo) => (
              <Tr key={todo.id} role="row">
                <Td role="cell" width="10%">
                  <Checkbox
                    size="lg"
                    colorScheme="green"
                    defaultChecked={todo.completed}
                    onChange={() => handleToggle(todo.id, !todo.completed)}
                  />
                </Td>
                <Td role="cell" width="80%">
                  <Editable
                    defaultValue={todo.title}
                    fontSize="2xl"
                    isPreviewFocusable={false}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <EditablePreview
                      me="2"
                      textDecoration={todo.completed ? "line-through" : "none"}
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      width="100%"
                      maxWidth={["60vw", "60vw", "40vw", "40vw"]}
                    />
                    <Input as={EditableInput} me="2" maxH="32px" />
                    <EditTodo />
                  </Editable>
                </Td>
                <Td isNumeric role="cell" width="10%" pb="5">
                  <IconButton
                    size="sm"
                    colorScheme="red"
                    aria-label="Delete Todo"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      setSelectedTodo(todo.id);
                      onOpen();
                    }}
                  />
                </Td>
              </Tr>
            ))}
            <tr>
              <td colSpan="12"
                style={{ textAlign: "center" }}>
                {newTodoLoading && (
                  <Spinner
                    mt="2"
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='md'
                  />
                )}
                {newTodoError && (
                  <Alert status="error" mt="2" >
                    <AlertIcon />
                    Error: {newTodoError}
                  </Alert>
                )}
              </td>
            </tr>
          </Tbody>
        </Table>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Customer
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(selectedTodo)}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </TableContainer>
    </>
  );
};

export default Content;
