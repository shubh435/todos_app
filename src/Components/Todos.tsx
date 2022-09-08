import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { Component } from "react";
import { Todo } from "../App";
interface Props {
  todos: Todo[];
  handleDelete: (id: number | string) => void;
  handleOpenAddModal: (id: number | string) => void;
}

export default class Todos extends Component<Props, any> {
  render() {
    return (
      <div>
        <TableContainer sx={{ border: "1px solid #ccc", mt: "20px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>SR. No.</TableCell>
                <TableCell align="left">Task Name</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="center" colSpan={2}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.todos &&
                this.props.todos.map((todo: Todo, i: number) => (
                  <TableRow
                    key={todo.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{++i}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {todo.taskName}
                    </TableCell>
                    <TableCell align="left">{todo.status}</TableCell>
                    <TableCell align="center">
                      <Button
                        color="success"
                        onClick={() => this.props.handleOpenAddModal(todo.id)}
                        variant="contained"
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="error"
                        onClick={() => this.props.handleDelete(todo.id)}
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
