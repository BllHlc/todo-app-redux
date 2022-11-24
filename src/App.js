import "./App.css";
import {
  Box,
  Flex,
  Heading,
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
  ButtonGroup,
  IconButton,
  useEditableControls,
  Tabs,
  TabList,
  Tab,
  Text,
  Button,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  CheckIcon,
  CloseIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";

function App() {
  const todos = [
    {
      title: "Learn React",
      completed: false,
    },
    {
      title: "Learn Redux",
      completed: true,
    },
    {
      title: "Learn Redux Toolkit",
      completed: false,
    },
    {
      title: "Learn React-Redux",
      completed: true,
    },
  ];

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <Box maxW="container.lg" mx="auto">
      <Flex alignItems="center" height="100vh" flexDirection="column" m="5">
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
        <Box w="100%">
          <Input variant="flushed" placeholder="Add Todo" mt="5" />
        </Box>

        <TableContainer w="100%">
          <Table variant="simple">
            {/* <TableCaption> Todos List</TableCaption> */}
            <Tbody role="rowgroup">
              {todos.map((todo, index) => (
                <Tr key={index} role="row">
                  <Td role="cell" width="10%">
                    <Checkbox
                      size="lg"
                      colorScheme="green"
                      defaultChecked={todo.completed}
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
                        textDecoration={
                          todo.completed ? "line-through" : "none"
                        }
                      />
                      <Input as={EditableInput} me="2" />
                      <EditableControls />
                    </Editable>
                  </Td>
                  <Td isNumeric role="cell" width="10%" pb="5">
                    <DeleteIcon color="red" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
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
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.500"
            mb={["3", "0"]}
          >
            {todos.length} items left
          </Text>
          <Tabs
            variant="soft-rounded"
            colorScheme="teal"
            isFitted
            size="sm"
            w={["100%", "50%"]}
            mb={["3", "0"]}
          >
            <TabList>
              <Tab
                _selected={{
                  color: "white",
                  bg: "linear-gradient(to left, #7928CA, #FF0080)",
                }}
              >
                All
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "linear-gradient(to left, #7928CA, #FF0080)",
                }}
              >
                Active
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "linear-gradient(to left, #7928CA, #FF0080)",
                }}
              >
                Completed
              </Tab>
            </TabList>
          </Tabs>
          <Button
            colorScheme="red"
            size="sm"
            variant="outline"
            _hover={{ bg: "red.500", color: "white" }}
          >
            Clear Completed
          </Button>
        </Flex>
        <Flex
          w="100%"
          mt="10"
          justifyContent="center"
          flexDirection={["column", "row"]}
          alignItems="center"
        >
          <Text fontSize="sm" color="gray.500" ml="3">
            Click to edit a todo
          </Text>
          <Text fontSize="sm" color="gray.500" ml="3">
            Created by{" "}
            <Link
              color="blue.500"
              href="https://www.linkedin.com/in/bilal-halici/"
              isExternal
            >
              Bilal Halici
            </Link>
          </Text>
          <Text fontSize="sm" color="gray.500" ml="3">
            Code on{" "}
            <Link color="blue.500" href="https://github.com/bllhlc" isExternal>
              Github
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default App;
