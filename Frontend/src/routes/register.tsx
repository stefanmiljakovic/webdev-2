import * as React from "react";
import {TextField, Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


export default class Register extends React.Component<{}, {}> {

    login: () => {};

    render(): React.ReactNode {
        return (
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="email"
                        label="E-mail"
                        placeholder="Enter E-mail"
                        name="e-mail"
                        margin="normal"
                        type="e-mail"
                    />
                    <TextField
                        fullWidth
                        id="username"
                        label="Username"
                        placeholder="Enter Username"
                        name="username"
                        margin="normal"
                        type="text"
                    />
                    <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        placeholder="Enter Password"
                        name="username"
                        margin="normal"
                        type="password"
                    />
                    <Button fullWidth variant="contained" color="primary" onClick={() => this.login()}>
                        Login
                    </Button>
                </Grid>
            </Grid>
        );
    }
}