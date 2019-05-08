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
import {Link} from "react-router-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
import {LINKS} from "../config";
import {deleteQuestion} from "../actions/question-actions";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AnswerInterface = Model.AnswerInterface;
import UserInfo from "./user-info";

interface Props extends OwnProps{
    classes: any
    user: UserInterface,
    selfDelete: (id: string) => void;
    match?: any;
    location?: any;
}

interface OwnProps {
    model: AnswerInterface[]
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

class Comments extends React.Component<Props, {}> {

    render(): React.ReactNode {
        const {classes, model} = this.props;
        return (
            <Grid container className={classes.card} style={{width: '465px', margin: '1rem 0'}}>
                {model.map(value => {return this.item(value)})}
            </Grid>
        );
    }

    item = (item: AnswerInterface) => {
        return (
            <Grid item>
                <Grid container style={{width: '100%'}}>
                    <Grid item xl={9}>
                        <UserInfo id={item.user as string} variant={"h5"}/>
                        <Typography variant={"body2"}>
                            {item.content}
                        </Typography>
                        <Typography variant={"body2"}>
                            Created at: {item.createdAt}
                        </Typography>
                    </Grid>
                    <Grid item xl={3} direction={"column"}>
                        <Button variant={"text"}>
                            Upvote
                        </Button>
                        <Button variant={"text"}>
                            Downvote
                        </Button>
                    </Grid>
                </Grid>
                <Grid container style={{padding: '5px'}}>
                    <LinkedComments model={item.childAnswers} />
                </Grid>
            </Grid>
        )
    }

}

const mapStateToProps = (state: RootStateInterface) => {
    return {
        user: state.users.activeUser,
    }
};

const mapDispatchToProps = (dispatch, ownProps: OwnProps) => ({
    selfDelete: (id: string) => dispatch(deleteQuestion(id))
});

export const LinkedComments = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Comments));