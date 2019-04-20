import * as React from "react";
import {TextField, Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {userLogin} from '../actions/user-actions';

interface Props {
    loginAction: (email, username, password) => Promise<any>;
}

export default class Login extends React.Component<Props, {}> {

    login(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        let current = e.currentTarget;
        let parentForm = current.closest('form');

        let email = (parentForm.querySelectorAll('input#email')[0] as HTMLInputElement).value;
        let username = (parentForm.querySelectorAll('input#username')[0] as HTMLInputElement).value;
        let password = (parentForm.querySelectorAll('input#password')[0] as HTMLInputElement).value;

        this.props.loginAction(email, username, password);
    };

    render(): React.ReactNode {
        return (
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                <Grid item xs={6}>
                    <form>
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
                        <Button fullWidth variant="contained" color="primary" type="button" onClick={this.login.bind(this)}>
                            Login
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    loginAction: (username, email, password) => dispatch(userLogin(username, email, password))
});

export const LinkedLogin = connect(mapDispatchToProps)(Login);
