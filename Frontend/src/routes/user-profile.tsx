import * as React from "react";
import {TextField, Button, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Model} from "../models/models";
import QuestionInterface = Model.QuestionInterface;
import Question, {LinkedQuestion} from "../components/question";
import {connect} from "react-redux";
import {RootStateInterface} from "../reducers/root";
import {loadQuestions, loadUserQuestions} from "../actions/question-actions";
import {UserInterfaceTokened} from "../reducers/models/users";
import UserInfo from "../components/user-info";

interface Props {
    questions: QuestionInterface[]
    fetch: (id: string) => void;
    match: any;
    location: any;
}

export default class UserProfile extends React.Component<Props, {}> {

    constructor(props) {
        super(props);
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.location !== prevProps.location) {
            this.props.fetch(this.props.match.params.id);
        }
    };

    componentWillMount = () => {
        this.props.fetch(this.props.match.params.id);
    };


    item = () => {
        const {questions} = this.props;

        return (
            <Grid item xs={10}>
                <UserInfo id={this.props.match.params.id} variant={"headline"}/>
                {questions.map(value => (
                    <div style={{margin: "20px 0"}} key={'q_' + value._id}>
                        <Paper>
                            <LinkedQuestion model={value}/>
                        </Paper>
                    </div>
                ))}
            </Grid>
        );
    };

    render(): React.ReactNode {
        return (
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                {this.item()}
            </Grid>
        );
    }
}

const mapStateToProps = (state: RootStateInterface) => {
    return {
        questions: state.questions.userQuestions.questions
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetch: (id: string) => dispatch(loadUserQuestions(id))
});

export const LinkedUserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfile);