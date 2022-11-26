import React from "react";
import { useEditableControls } from "@chakra-ui/react";
import { ButtonGroup, Flex, IconButton } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

const EditTodo = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="Submit edit"
        colorScheme="green"
        icon={<CheckIcon />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="Cancel edit"
        colorScheme="red"
        icon={<CloseIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="Edit todo"
        size="sm"
        colorScheme="facebook"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};

export default EditTodo;
