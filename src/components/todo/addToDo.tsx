import { Box, Button, TextField } from "@mui/material";
import React, { Fragment, FunctionComponent, memo, useRef } from "react";

const AddToDo: FunctionComponent<AddToDoProps> = memo(({ handleSubmit }) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const handleForm = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let result: any = {};
    for (const [key, value] of formData.entries()) {
      result[key] = value as string;
    }

    handleSubmit(result);
    if (!!inputFile.current) {
      console.log(inputFile.current);
      inputFile.current.value = "";
    }
  };

  return (
    <Box sx={{ marginBottom: "20px", width: "100%" }}>
      <form onSubmit={handleForm}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginBottom: "20px" }}
        >
          Add To Do
        </Button>
        <TextField
          fullWidth
          multiline
          rows={5}
          name="toDoDescription"
          placeholder="Add Your Todo Here..."
          InputProps={{
            inputRef: inputFile,
          }}
        />
      </form>
    </Box>
  );
});

export default AddToDo;

export type AddToDoProps = {
  handleSubmit: (formData: { [key: string]: string }) => void;
};
