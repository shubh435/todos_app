import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
interface Props {
  handleOpenAddModal: () => void;
}
export default class Header extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{ flexGrow: 1 }}
            >
              TODOS APPLICATION
            </Typography>
            <Button color="inherit" onClick={this.props.handleOpenAddModal}>
              <AddIcon />
            </Button>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}
