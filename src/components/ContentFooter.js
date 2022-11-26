import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Input,
  Tabs,
  TabList,
  Tab,
  Text,
  Button,
  InputGroup,
  InputLeftElement,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure
} from "@chakra-ui/react";
import { SearchIcon, DeleteIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter, selectActiveFilter, selectTodos } from "../redux/todos/todosSlice";
import { deleteCompletedTodosAsync } from '../redux/todos/services';

const ContentFooter = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const itemsLeft = items.filter((item) => !item.completed).length;
  const activeFilter = useSelector(selectActiveFilter);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const tabList = ["All", "Active", "Completed"];

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  const handleDeleteCompleted = () => {
    dispatch(deleteCompletedTodosAsync());
    onClose();
  };

  return (
    <>
      <Box w="100%" mt="5">
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input variant="flushed" placeholder="Search Todo" />
        </InputGroup>
      </Box>
      <Flex
        w="100%"
        mt="3"
        justifyContent="space-between"
        flexDirection={["column", "row"]}
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="bold" color="gray.500" mb={["3", "0"]}>
          {itemsLeft} item{itemsLeft > 1 && "s"} left
        </Text>
        <Tabs
          variant="soft-rounded"
          colorScheme="teal"
          isFitted
          size="sm"
          w={["100%", "50%"]}
          mb={["3", "0"]}
          index={activeFilter === "all" ? 0 : activeFilter === "active" ? 1 : 2}
          onChange={(index) => {
            dispatch(changeFilter(index === 0 ? "all" : index === 1 ? "active" : "completed"));
          }}
        >
          <TabList>
            {tabList.map((tab) => (
              <Tab key={tab}
                _selected={{
                  color: "white",
                  bg: "linear-gradient(to left, #7928CA, #FF0080)",
                }}
              >{tab}</Tab>
            ))}
          </TabList>
        </Tabs>
        <Button
          colorScheme="red"
          size="sm"
          variant="outline"
          _hover={{ bg: "red.500", color: "white" }}
          rightIcon={<DeleteIcon />}
          onClick={onOpen}
        >
          Clear Completed
        </Button>
      </Flex>
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
                onClick={handleDeleteCompleted}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ContentFooter;
