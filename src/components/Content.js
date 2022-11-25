import React from "react";
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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, selectFiteredTodos } from "../redux/todos/todosSlice";
import EditTodo from "./EditTodo";
import ContentFooter from "./ContentFooter";

const Content = () => {
  const [selectedTodo, setSelectedTodo] = React.useState(null);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const items = useSelector(selectFiteredTodos);
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    onClose();
  };

  return (
    <>
      <TableContainer w="100%">
        <Table variant="simple">
          {/* <TableCaption> Todos List</TableCaption> */}
          <Tbody role="rowgroup">
            {items.map((todo) => (
              <Tr key={todo.id} role="row">
                <Td role="cell" width="10%">
                  <Checkbox
                    size="lg"
                    colorScheme="green"
                    defaultChecked={todo.completed}
                    onChange={() => dispatch(toggleTodo(todo.id))}
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
          </Tbody>
        </Table>
        <ContentFooter />
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
