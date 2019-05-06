import * as React from "react";
import {Model} from "../models/models";
import QuestionInterface = Model.QuestionInterface;
import {Card, CardContent, PropTypes, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {RootStateInterface} from "../reducers/root";
import {connect} from "react-redux";
import UserInterface = Model.UserInterface;

interface Props {
    model: QuestionInterface
    classes: any
    user: UserInterface
}

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Question extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        const {classes, model} = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h3">
                            {model.title}
                        </Typography>
                        <Typography variant="h6">
                            {model.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {this.adminActions()}
            </Card>
        );
    }

    adminActions = () => {
        if(this.props.user._id !== this.props.model.user)
            return;

        return (
            <CardActions>
                <Button size={"small"} color={"primary"}>
                    Delete
                </Button>
            </CardActions>
        )
    }

}

export default withStyles(styles)(Question);

const mapStateToProps = (state: RootStateInterface) => {
    return {
        user: state.users.activeUser
    }
};

export const LinkedQuestion = connect(mapStateToProps, null)(withStyles(styles)(Question));