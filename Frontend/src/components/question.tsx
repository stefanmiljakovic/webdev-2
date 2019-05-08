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
import {API_ROOT, LINKS} from "../config";
import {deleteQuestion} from "../actions/question-actions";
import Grid from "@material-ui/core/Grid";
import UserInfo from "./user-info";
import Axios from "axios";

interface Props {
    model: QuestionInterface
    classes: any
    user: UserInterface,
    selfDelete: (id: string) => void;
}

interface State {
    views: number
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

class Question extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            views: 0
        };
    }

    componentDidMount(): void {
        Axios.get(`${API_ROOT}/question/view?question=${this.props.model._id}`).then(value => {
            this.setState({
                ...this.state,
                views: value.data.results
            });
        })
    }


    render(): React.ReactNode {
        const {classes, model} = this.props;
        return (
            <Card className={classes.card} style={{width: '375px'}}>
                <ButtonBase component={LINKS.QuestionLink(model._id)} style={{width: '100%'}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h4">
                                {model.title}
                            </Typography>
                            <Typography variant="h6">
                                {model.description}
                            </Typography>
                            {this.tags()}
                            <UserInfo id={model.user as string}/>
                            {this.creation()}
                        </CardContent>
                    </CardActionArea>
                </ButtonBase>
                <CardActions>
                    <Button size={"small"} color={"primary"} component={LINKS.UserLink(model.user)}>
                        View Profile
                    </Button>
                    {this.adminActions()}
                    <Typography variant={"body2"} style={{marginLeft: 'auto', marginRight: '12px'}}>
                        Views: {this.state.views}
                    </Typography>
                </CardActions>
            </Card>
        );
    }

    tags = () => {
        const {model} = this.props;
        if(model.tags.length === 0)
            return;
        return (
            <Typography variant="body2">
                Tags: | {model.tags.join(' | ')} |
            </Typography>
        );
    };

    creation = () => {
        const {model} = this.props;
        const created = new Date(model.createdAt as string);
        const updated = new Date(model.updatedAt as string);
        return (
            <Grid style={{marginTop: '1.5rem'}} container justify={"space-between"}>
                <Grid item>
                    Created at: <br />
                    {created.toDateString()}
                </Grid>
                <Grid item>
                    Updated at: <br />
                    {updated.toDateString()}
                </Grid>
            </Grid>
        )
    }

    adminActions = () => {
        if (this.props.user._id !== this.props.model.user)
            return;

        return (
            <Button size={"small"} color={"primary"}
                    onClick={() => this.props.selfDelete(this.props.model._id as string)}>
                Delete
            </Button>
        )
    };

}

export default withStyles(styles)(Question);

const mapStateToProps = (state: RootStateInterface) => {
    return {
        user: state.users.activeUser
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    selfDelete: (id: string) => dispatch(deleteQuestion(id))
});

export const LinkedQuestion = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Question));