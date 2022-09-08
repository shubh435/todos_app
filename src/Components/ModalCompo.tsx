import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
interface Props {
  open: boolean;
  status: string;
  taskName: string;
  handleonChangeTaskName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleonChangeStatus: (e: SelectChangeEvent<string>) => void;
  editId: string | number;
  handleClose: () => void;
  handleAdd: () => void;
  handleEditUpdate: (id: number | string) => void;
}
interface State {}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 400, sm: 400 },
  bgcolor: "#fff",
  border: "1px solid #ccc",

  boxShadow: 24,
  p: 4,
};

export default class ModalCompo extends Component<Props, State> {
  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ positon: "relative", top: 0, right: 0, width: "100%" }}>
            <Button
              sx={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                borderRadius: "50%",
                minWidth: "30px",
                minHeight: "30px",
                textAlign: "center",
              }}
              onClick={this.props.handleClose}
              color="error"
              variant="contained"
            >
              <CloseIcon style={{ fontSize: "25px" }} />
            </Button>
          </Box>

          <Box>
            <FormControl sx={{ m: 1, width: "90%" }}>
              <label
                style={{
                  textAlign: "left",
                  fontSize: "18px",
                  fontWeight: "bold",
                  lineHeight: "2",
                }}
                htmlFor="taskName"
              >
                Enter your tasks
              </label>
              <TextField
                placeholder="Enter  your task here"
                id="taskName"
                required
                value={this.props.taskName}
                onChange={this.props.handleonChangeTaskName}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "90%" }}>
              <label
                style={{
                  textAlign: "left",
                  fontSize: "18px",
                  fontWeight: "bold",
                  lineHeight: "2",
                }}
                htmlFor="status"
              >
                Select your status
              </label>

              <Select
                id="status"
                value={this.props.status}
                onChange={this.props.handleonChangeStatus}
                placeholder="select status"
                displayEmpty
                required
              >
                <MenuItem value={"Not Completed"}>Not Completed</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mt: "20px",
              }}
            >
              {this.props.editId ? (
                <Button
                  color="success"
                  variant="contained"
                  sx={{ width: "40%" }}
                  onClick={() => this.props.handleEditUpdate(this.props.editId)}
                >
                  update
                </Button>
              ) : (
                <Button
                  color="success"
                  variant="contained"
                  sx={{ width: "40%" }}
                  onClick={this.props.handleAdd}
                >
                  add
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  }
}
