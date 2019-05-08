import * as React from "react";
import {TextField, Button, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Model} from "../models/models";
import QuestionInterface = Model.QuestionInterface;
import Question, {LinkedQuestion} from "../components/question";
import {connect} from "react-redux";
import {RootStateInterface} from "../reducers/root";
import {loadQuestions, loadUserQuestions} from "../actions/question-actions";
import {LinkedComments} from "../components/comments";
import AnswerInterface = Model.AnswerInterface;
import Axios from "axios";
import {API_ROOT, CRUD_ROOT} from "../config";

interface Props {
    questions: QuestionInterface[]
    fetch: () => void;
    match: any;
    location: any;
}

interface State {
    question: QuestionInterface,
    answers: AnswerInterface[]
}

export default class QuestionView extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            question: null,
            answers: []
        };
        this.props.fetch();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if(prevProps.questions.length !== this.props.questions.length)
            this.currentQuestion();
    }

    componentDidMount(): void {
        this.currentQuestion();
    }

    currentQuestion = () => {
        if (this.props.questions.length === 0)
            return;

        const id = this.props.match.params.id;
        const question = this.props.questions.filter(value => {
            return value._id === id;
        });

        console.log(question);

        this.setState({
            ...this.state,
            question: question[0]
        });
        this.appendView(question[0]._id as string);
    };

    baseView = () => {
        if (this.state.question)
            return (
                <React.Fragment>
                    <Paper>
                        <LinkedQuestion model={this.state.question}/>
                    </Paper>
                </React.Fragment>
            );
    };

    commentView = () => {
        if (this.state.answers.length > 0)
            return (
                <Paper style={{marginTop: '1rem', padding: '5px'}}>
                    <LinkedComments model={this.state.answers}/>
                </Paper>
            );
    };

    render(): React.ReactNode {
        return (
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                {this.baseView()}

            </Grid>
        );
    }

    appendView = (id: string) => {
        Axios.post(`${API_ROOT}/question/view`, {
           id: id
        });
    }
}

const mapStateToProps = (state: RootStateInterface) => {
    return {
        questions: state.questions.allQuestions.questions
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetch: () => dispatch(loadQuestions())
});

export const LinkedQuestionView = connect(mapStateToProps, mapDispatchToProps)(QuestionView);