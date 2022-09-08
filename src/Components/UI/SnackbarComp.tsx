import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { Component } from "react";

interface Props {
  open: boolean;
  handleCloseSnackbar: () => void;
  message: string;
  type: AlertColor;
}

export default class SnackbarComp extends Component<Props, any> {
  render() {
    return (
      <Snackbar
        open={this.props.open}
        autoHideDuration={1000}
        onClose={this.props.handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={this.props.type}
          sx={{ width: "100%" }}
          onClose={this.props.handleCloseSnackbar}
        >
          {this.props.message}
        </Alert>
      </Snackbar>
    );
  }
}
