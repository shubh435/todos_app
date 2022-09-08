import "./App.css";
import React, { Component } from "react";
import { Container, SelectChangeEvent } from "@mui/material";
import Header from "./Components/Header";
import ModalCompo from "./Components/ModalCompo";
import Todos from "./Components/Todos";

interface State {
  openAddModal: boolean;
  taskName: string;
  status: string;
  todos: Todo[];
  editId: string | number;
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
  };

  handleOpenAddModal = () => this.setState({ openAddModal: true });
  handleCloseAddModal = () =>
    this.setState({
      openAddModal: false,
      taskName: "",
      status: "",
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
    });
  };

  handleDelete = (id: number | string) => {
    const newTodos = this.state.todos.filter((todo: Todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    this.setState({ todos: JSON.parse(localStorage.getItem("todos")!) });
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
          />

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
