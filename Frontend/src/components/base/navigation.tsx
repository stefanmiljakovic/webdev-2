import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {LINKS} from "../../config";

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

export interface Props extends WithStyles<typeof styles> {}

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
                            <Button color="inherit" component={LINKS.LoginLink}>Login</Button>
                            <Button color="inherit" component={LINKS.RegisterLink}>Register</Button>
                        </Toolbar>
                    </AppBar>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Navigation);
