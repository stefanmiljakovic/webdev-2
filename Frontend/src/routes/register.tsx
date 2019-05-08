import * as React from "react";
import {TextField, Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {userRegister, userRegisterRefresh} from "../actions/user-register-actions";
import {connect} from "react-redux";
import {RootStateInterface} from "../reducers/root";
import {MessageInterface, UserInterfaceTokened} from "../reducers/models/users";
import Typography from "@material-ui/core/Typography";

interface Props {
    register: (username: string, email: string, password: string) => void;
    refresh: () => void;
    userRegister: MessageInterface;
    user: UserInterfaceTokened;
}

export default class Register extends React.Component<Props, {}> {

    register = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        this.props.refresh();
        const current = e.currentTarget;
        const parentForm = current.closest('form');

        let username = (parentForm.querySelectorAll('input#username')[0] as HTMLInputElement).value;
        let email = (parentForm.querySelectorAll('input#email')[0] as HTMLInputElement).value;
        let password = (parentForm.querySelectorAll('input#password')[0] as HTMLInputElement).value;

        this.props.register(username, email, password);
    };

    render(): React.ReactNode {
        return (
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                <Typography variant={'h3'} color={"primary"}>
                    Register
                </Typography>
                <Grid item xs={6}>
                    {this.props.user.token ? this.loggedInMessage() : this.registerForm()}
                </Grid>
            </Grid>
        );
    }

    loggedInMessage = () => {
        return (
            <p>You are already logged in</p>
        );
    };

    registerForm = () => {
        return (
            <React.Fragment>
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
                    <Button
                        style={{marginLeft: 'auto', display: 'block'}}
                        variant="contained" color="primary" onClick={this.register}>
                        Register
                    </Button>
                </form>
            </React.Fragment>
        );
    };

    componentWillMount = () => {
        this.props.refresh();
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    register: (username, email, password) => dispatch(userRegister(username, email, password)),
    refresh: () => dispatch(userRegisterRefresh())
});

const mapStateToProps = (state: RootStateInterface) => {
    return {
        userRegister: state.users.registerUser,
        user: state.users.activeUser
    }
};

export const LinkedRegister = connect(mapStateToProps, mapDispatchToProps)(Register);