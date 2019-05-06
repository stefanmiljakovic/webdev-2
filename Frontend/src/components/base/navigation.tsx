import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {LINKS} from "../../config";
import {RootStateInterface} from "../../reducers/root";
import {connect} from "react-redux";
import {UserInterfaceTokened} from "../../reducers/models/users";
import {userLogout} from "../../actions/user-actions";

const styles = createStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    homeButton: {
        marginRight: 'auto'
    }
});

export interface Props extends WithStyles<typeof styles> {
    user: UserInterfaceTokened,
    logout: () => void;
}

class Navigation extends React.Component<Props, {}> {

    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Button color="inherit" className={classes.homeButton} component={LINKS.HomeLink}>
                                Home
                            </Button>
                            { this.props.user.token ? this.loggedInNav() : this.loggedOutNav()}
                        </Toolbar>
                    </AppBar>
                </div>
            </React.Fragment>
        );
    }

    loggedInNav = () => {
        return (
            <React.Fragment>
                <Button color={"inherit"} component={LINKS.UserLink(this.props.user.username)}>
                    {`Profile - ${this.props.user.username}`}
                </Button>
                <Button color={"inherit"} onClick={() => this.props.logout()}>Logout</Button>
            </React.Fragment>
        )
    };

    loggedOutNav = () => {
        return (
            <React.Fragment>
                <Button color="inherit" component={LINKS.LoginLink}>Login</Button>
                <Button color="inherit" component={LINKS.RegisterLink}>Register</Button>
            </React.Fragment>
        );
    };
}

const mapStateToProps = (state: RootStateInterface) => {
    return {
        user: state.users.activeUser
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: () => dispatch(userLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navigation));
