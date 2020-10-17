import React from 'react';
import CreateStyles from "../util/Stylesheet";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";

import {RegisterRoutes} from "../util/RouteBuilder";


function Accountpage() {

    const Styles = CreateStyles();

    return (
        <div className={Styles.root}>
            <Topbar message="My Account"/>
            <Navbar/> {/* This is necessary for some styling reason I'm too backend to understand */}
            <main className={Styles.content}>
                <div className={Styles.toolbar}/>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Card className={Styles.card}>
                            <CardContent>
                                <Typography className={Styles.title} variant="h2">
                                    Account Info
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="User ID: " />
                                        <ListItemText primary=" 123456789 " />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Email: " />
                                        <ListItemText primary=" thisperson@companydomain.com " />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Change Email: " />
                                        <TextField id="outlined-account-new-email" label="New Email" variant="outlined" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Password: " />
                                        <TextField id="outlined-account-password" label="Password" variant="outlined" />
                                    </ListItem>
                                    <ListItem>
                                        <Button variant="contained" color="primary" size="medium">
                                            Submit
                                        </Button>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Card className={Styles.card}>
                            <CardContent>
                                <Typography className={Styles.title} variant="h2">
                                    Change Password
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText>To change the password you must</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>type in the original password.</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Original: " />
                                        <TextField id="outlined-account-password-original" label="Original Password" variant="outlined" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="New Password: " />
                                        <TextField id="outlined-account-password-new" label="New Password" variant="outlined" />
                                    </ListItem>
                                    <ListItem>
                                        <Button variant="contained" color="primary" size="medium">
                                            Submit
                                        </Button>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}

RegisterRoutes(Accountpage, "/account", "/Accountpage", "/AccountPage", "/accountpage");
export default Accountpage;