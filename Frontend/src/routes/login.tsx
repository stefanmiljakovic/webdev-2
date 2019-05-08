import * as React from "react";
import {TextField, Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {userLogin, userLoginRefresh} from '../actions/user-actions';
import {RootStateInterface} from "../reducers/root";
import {Model} from "../models/models";
import UserInterface = Model.UserInterface;
import {activeUserDefault, UserInterfaceTokened} from "../reducers/models/users";
import Typography from "@material-ui/core/Typography";

interface Props {
    loginAction: (username, password) => Promise<any>;
    refresh: () => void;
    user: UserInterfaceTokened
}

export default class Login extends React.Component<Props, {}> {

    login(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        let current = e.currentTarget;
        let parentForm = current.closest('form');

        let username = (parentForm.querySelectorAll('input#username')[0] as HTMLInputElement).value;
        let password = (parentForm.querySelectorAll('input#password')[0] as HTMLInputElement).value;

        this.props.loginAction(username, password);
    };

    render(): React.ReactNode {
        console.log(this.props.user);
        return (
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                <Typography variant={'h3'} color={"primary"}>
                    Login
                </Typography>
                <Grid item xs={6}>
                    {this.props.user.token ? <p>You are logged in</p> : this.loginForm()}
                </Grid>
            </Grid>
        );
    }

    loginForm = () => {
        return (
            <form>
                <TextField
                    fullWidth
                    id="username"
                    label="Username Or Email"
                    placeholder="Enter Data"
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
                    variant="contained" color="primary" type="button" onClick={this.login.bind(this)}>
                    Login
                </Button>
            </form>
        );
    };

    message = () => {
        if(this.props.user.username !== activeUserDefault.username)
            return (
                <p>{this.props.user.message} - {this.props.user.username}</p>
            );
        return (
            <p>{this.props.user.message}</p>
        );
    };

    componentWillMount = () => {
        this.props.refresh();
    }
}

const mapStateToProps = (state: RootStateInterface) => {
    return {
        user: state.users.activeUser
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    loginAction: (username, password) => dispatch(userLogin(username, password)),
    refresh: () => dispatch(userLoginRefresh())
});

export const LinkedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
