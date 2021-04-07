import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import {
    List,
    ListItem, 
    ListItemText,
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Divider,
    Drawer,
    Hidden,
    SwipeableDrawer,
    Button
    } from "@material-ui/core";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.Styles = props.Styles;
    }

    render() {
        return (
            <React.Fragment>
                {this.renderDrawer()}
                {this.renderTopbar()}
            </React.Fragment>
        )
    }

    renderDrawer() {
        return (
            <nav className={this.Styles.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <SwipeableDrawer
                        variant="temporary"
                        anchor="left"
                        open={this.state.open}
                        onClose={() => this.setState({open: false})}
                        onOpen={() => this.setState({open: true})}
                        Styles={{
                            paper: this.Styles.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {this.renderDrawerContents()}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: this.Styles.drawerPaper,
                        }}
                        variant="permanent"
                    >
                    {this.renderDrawerContents()}
                    </Drawer>
                </Hidden>
            </nav>
        );
    }

    renderDrawerContents() {
        return (
            <React.Fragment>
                <div className={this.Styles.toolbar} />
                <Divider />
                <List>
                    <ListItem>
                        <Link to = "/home" >Home</Link>
                    </ListItem>
                    <ListItem>
                        <Link to = "/factory" >Create Simulation</Link>
                    </ListItem>
                    <ListItem>
                        <Link to = "/player" >Join Simulation</Link>
                    </ListItem>
                    <ListItem>
                        <Link to = "/loginsignup" >Login/SignUp</Link>
                    </ListItem>
                    <ListItem>
                        <Link to = "/account" >Your Account</Link>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="My Simulations" />
                    </ListItem>
                    <ListItem>
                        <Link to = "/about" >About</Link>
                    </ListItem>
                </List>
            </React.Fragment>
        )
    }

    renderTopbar() {
        return (
            <AppBar position="fixed" className={this.Styles.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => this.setState({open: true})}
                        className={this.Styles.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>{this.props.TopbarMessage}</Typography>
                    {this.props.children}
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navigation;