import { Button, Card, Grid } from "@mui/material";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import AddToDo from "./addToDo";
import ToDoList from "./toDoList";

const Todo = () => {
  const [toDoList, setToDoList] = useState<ToDoListProps["toDoListData"]>([]);

  const handleSubmit = useCallback((value: { [key: string]: string }) => {
    setToDoList((prevToDoDList) => [
      ...prevToDoDList,
      {
        id: (prevToDoDList.length + 1).toString(),
        value: value.toDoDescription,
        isDone: false,
        isEdit: false,
      },
    ]);
  }, []);

  return (
    <div>
      <Card sx={{ padding: "20px", height: "100%" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <AddToDo handleSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <ToDoList setToDoList={setToDoList} toDoListData={toDoList} />
          </Grid>
          <Grid xs={12} sx={{ display: "flex", justifyContent: "end" }}>
            {!!toDoList.length &&
              toDoList.length ===
                toDoList.filter(({ isDone }) => isDone).length && (
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={() => setToDoList([])}
                >
                  Clear All Task
                </Button>
              )}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Todo;

export type ToDoListProps = {
  toDoListData: Array<{
    id: string;
    value: string;
    isDone: boolean;
    isEdit: boolean;
  }>;
  setToDoList: Dispatch<
    SetStateAction<
      Array<{
        id: string;
        value: string;
        isDone: boolean;
        isEdit: boolean;
      }>
    >
  >;
};
