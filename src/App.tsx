import React, { Component } from "react";
import { AlertColor, Container, SelectChangeEvent } from "@mui/material";
import Header from "./Components/Header";
import ModalCompo from "./Components/ModalCompo";
import Todos from "./Components/Todos";
import SnackbarComp from "./Components/UI/SnackbarComp";

interface State {
  openAddModal: boolean;
  taskName: string;
  status: string;
  todos: Todo[];
  editId: string | number;
  error: string;
  openSnackebar: boolean;
  message: string;
  type: AlertColor;
}
export interface Todo {
  id: number | string;
  taskName: string;
  status: string;
}
export default class App extends Component {
  state: State = {
    openAddModal: false,
    todos: JSON.parse(localStorage.getItem("todos")!) || [],
    taskName: "",
    status: "",
    editId: "",
    error: "",
    openSnackebar: false,
    type: "success",
    message: "",
  };

  handleOpenAddModal = () => this.setState({ openAddModal: true });
  handleCloseSnackbar = () =>
    this.setState({ openSnackebar: false, message: "" });
  handleCloseAddModal = () =>
    this.setState({
      openAddModal: false,
      taskName: "",
      status: "",
      message: "",
      editId: "",
    });
  handleonChangeTaskName = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ taskName: e.target.value });
  handleonChangeStatus = (e: SelectChangeEvent<string>) =>
    this.setState({ status: (e.target as any).value });

  handleAdd = async () => {
    await localStorage.setItem(
      "todos",
      JSON.stringify([
        ...this.state.todos,
        {
          id: Date.now(),
          taskName: this.state.taskName,
          status: this.state.status,
        },
      ])
    );

    this.setState({
      todos: JSON.parse(localStorage.getItem("todos")!),
      openAddModal: false,
      status: "",
      taskName: "",
      openSnackebar: true,
      type: "success",
      message: "Task added successfully",
    });
  };

  handleDelete = (id: number | string) => {
    const newTodos = this.state.todos.filter((todo: Todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    this.setState({
      todos: JSON.parse(localStorage.getItem("todos")!),
      openSnackebar: true,
      message: "Todos deleted",
      type: "error",
    });
  };

  handleEditAddModal = (id: number | string) => {
    this.setState({ openAddModal: true });

    const oldData: any = this.state.todos.find((todo: Todo) => todo.id === id);
    this.setState({
      taskName: oldData.taskName,
      status: oldData.status,
      editId: oldData.id,
    });
  };

  handleEditUpdate = (id: number | string) => {
    const newTask = this.state.todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.status = this.state.status;
        todo.taskName = this.state.taskName;
      }
      return { ...todo };
    });

    localStorage.setItem("todos", JSON.stringify(newTask));

    this.setState({
      todos: JSON.parse(localStorage.getItem("todos")!),
      taskName: "",
      status: "",
      editId: "",
      openAddModal: false,
      openSnackebar: true,
      message: "Todos updated !",
      type: "success",
    });
  };
  render() {
    return (
      <>
        <Container maxWidth="xl">
          <Header handleOpenAddModal={this.handleOpenAddModal} />
          <ModalCompo
            open={this.state.openAddModal}
            status={this.state.status}
            taskName={this.state.taskName}
            handleonChangeTaskName={this.handleonChangeTaskName}
            handleonChangeStatus={this.handleonChangeStatus}
            editId={this.state.editId}
            handleClose={this.handleCloseAddModal}
            handleAdd={this.handleAdd}
            handleEditUpdate={this.handleEditUpdate}
            error={this.state.error}
          />
          {this.state.message && (
            <SnackbarComp
              open={this.state.openSnackebar}
              handleCloseSnackbar={this.handleCloseSnackbar}
              message={this.state.message}
              type={this.state.type}
            />
          )}
          <Container maxWidth="md">
            <Todos
              todos={this.state.todos}
              handleDelete={this.handleDelete}
              handleOpenAddModal={this.handleEditAddModal}
            />
          </Container>
        </Container>
      </>
    );
  }
}
