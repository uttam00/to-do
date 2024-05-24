import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Fragment, FunctionComponent, memo, useState } from "react";
import { ToDoListProps } from ".";

const ToDoList: FunctionComponent<ToDoListProps> = memo(
  ({ toDoListData, setToDoList }) => {
    const [editedTaskDetail, setEditedTaskDetail] = useState("");

    const onDeleteTask = (removedId: string) => {
      let removeItemIndex = toDoListData.findIndex((e) => e.id === removedId);
      toDoListData.splice(removeItemIndex, 1);
      setToDoList([...toDoListData]);
    };

    const onEditClick = (isEditTrue: boolean, editedTaskId?: string) => {
      setToDoList(
        toDoListData.flatMap((data) => {
          return {
            ...data,
            isEdit:
              data.id === editedTaskId && isEditTrue
                ? false
                : data.id === editedTaskId,
          };
        })
      );

      setEditedTaskDetail(
        toDoListData.find(({ id }) => id === editedTaskId)?.value ?? ""
      );
    };

    const onEditSave = (editedTaskId: string) => {
      setToDoList(
        toDoListData.flatMap((data) => {
          return {
            ...data,
            isEdit: false,
            value: data.id === editedTaskId ? editedTaskDetail : data.value,
          };
        })
      );
      setEditedTaskDetail("");
    };

    const onDoneTask = (editedTaskId: string) => {
      setToDoList(
        toDoListData.flatMap((data) => {
          return {
            ...data,
            isDone: data.isDone ? data.isDone : editedTaskId === data.id,
          };
        })
      );
    };

    const renderTextOrField = (
      isDone: boolean,
      isEdit: boolean,
      value: string
    ) => {
      if (isDone) {
        return <Typography variant="subtitle1">{value}</Typography>;
      }

      if (isEdit) {
        return (
          <TextField
            name="editTask"
            size="small"
            sx={{
              width: "100%",
              marginRight: "20px",
            }}
            InputProps={{
              inputProps: {
                style: {
                  padding: "4px 3px",
                },
              },
            }}
            value={editedTaskDetail}
            onChange={(e) => setEditedTaskDetail(e.target.value)}
          />
        );
      }

      return <Typography variant="subtitle1">{value}</Typography>;
    };

    const renderButtons = (isEdit: boolean, id: string) => {
      if (isEdit) {
        return (
          <Fragment>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                if (id) {
                  onEditSave(id);
                }
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => {
                onEditClick(isEdit, id);
              }}
            >
              Cancel
            </Button>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                if (id) {
                  onEditClick(isEdit, id);
                }
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => onDoneTask(id)}
            >
              Done
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => onDeleteTask(id)}
            >
              Delete
            </Button>
          </Fragment>
        );
      }
    };

    return (
      <Fragment>
        {!toDoListData.length ? (
          <Typography variant="h6" sx={{ marginTop: "30px" }}>
            Nothing To Do...
          </Typography>
        ) : (
          <Grid
            container
            sx={{
              marginTop: "30px",
            }}
          >
            {toDoListData.map(({ id, value, isEdit, isDone }) => {
              return (
                <Grid
                  item
                  xs={12}
                  key={id}
                  sx={{
                    margin: "10px 0px",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    border: "1px solid grey",
                    borderRadius: "10px",
                  }}
                >
                  {renderTextOrField(isDone, isEdit, value)}
                  {!isDone && (
                    <Stack direction="row" spacing={2}>
                      {renderButtons(isEdit, id)}
                    </Stack>
                  )}
                </Grid>
              );
            })}
          </Grid>
        )}
      </Fragment>
    );
  }
);

export default ToDoList;
